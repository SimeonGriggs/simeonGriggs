import {documentEventHandler} from '@sanity/functions'
import toMarkdown from '@sanity/block-content-to-markdown'
import {Octokit} from '@octokit/rest'
import {type PortableTextBlock} from '@portabletext/types'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const REPO_OWNER = 'SimeonGriggs'
const REPO_NAME = 'tints.dev'
const BRANCH_NAME = 'update-readme'

type Projection = {
  content: PortableTextBlock[]
  _rev: string
  _updatedAt: string
}

export const handler = documentEventHandler<Projection>(async ({event}) => {
  const blockContent =
    'content' in event.data && Array.isArray(event.data.content) ? event.data.content : []
  const {_rev, _updatedAt} = event.data

  if (blockContent.length === 0) {
    console.log(`No content to update`)
    return
  }

  const markdownContent = toMarkdown(blockContent)

  if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) {
    throw new Error('Missing required GitHub configuration')
  }

  const octokit = new Octokit({
    auth: GITHUB_TOKEN,
  })

  try {
    // Get the default branch
    const {data: repo} = await octokit.repos.get({
      owner: REPO_OWNER,
      repo: REPO_NAME,
    })
    const defaultBranch = repo.default_branch

    // Check if branch exists and delete it if it does
    try {
      await octokit.git.getRef({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        ref: `heads/${BRANCH_NAME}`,
      })
      // If we get here, the branch exists, so delete it
      await octokit.git.deleteRef({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        ref: `heads/${BRANCH_NAME}`,
      })
    } catch (error) {
      // Branch doesn't exist, which is fine
      if (error.status !== 404) {
        throw error
      }
    }

    // Create a new branch
    const {data: ref} = await octokit.git.getRef({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      ref: `heads/${defaultBranch}`,
    })

    await octokit.git.createRef({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      ref: `refs/heads/${BRANCH_NAME}`,
      sha: ref.object.sha,
    })

    // Update README.md
    const {data: readmeFile} = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: 'README.md',
    })

    if ('sha' in readmeFile) {
      await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: 'README.md',
        message: 'Update README.md',
        content: Buffer.from(markdownContent).toString('base64'),
        sha: readmeFile.sha,
        branch: BRANCH_NAME,
      })

      // Create pull request
      try {
        // Check for existing PRs (both open and closed)
        const {data: existingPRs} = await octokit.pulls.list({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          state: 'all',
          head: `${REPO_OWNER}:${BRANCH_NAME}`,
        })

        // If there's an existing PR, we'll update the existing branch instead of creating a new PR
        if (existingPRs.length > 0) {
          console.log(`Found existing PR #${existingPRs[0].number} (${existingPRs[0].state})`)
          // If the PR was closed, we'll create a new one
          if (existingPRs[0].state === 'closed') {
            await octokit.pulls.create({
              owner: REPO_OWNER,
              repo: REPO_NAME,
              title: 'Update README.md',
              body: `Automated update of README.md content.\n\n Revision: ${_rev}\nUpdated at: ${_updatedAt}`,
              head: BRANCH_NAME,
              base: defaultBranch,
            })
          } else {
            console.log('Using existing open PR')
          }
        } else {
          // No existing PR, create a new one
          await octokit.pulls.create({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            title: 'Update README.md',
            body: `Automated update of README.md content from revision ${_rev} at ${_updatedAt}`,
            head: BRANCH_NAME,
            base: defaultBranch,
          })
        }
      } catch (error) {
        // If PR creation fails for other reasons
        if (error.status !== 422) {
          throw error
        }
        console.log('Error creating pull request:', error.message)
      }
    }
  } catch (error) {
    console.error('Error creating pull request:', error)
    throw error
  }
})
