import {Dialog, DialogBackdrop, DialogTitle} from '@headlessui/react'
import {XCircleIcon} from '@heroicons/react/24/outline'
import {useEffect} from 'react'
import {useFetcher, useRouteLoaderData} from 'react-router'

import type {loader as pageLoader} from '~/routes/_website.$slug'

import Button from '../Button'
import Label from '../Label'

const inputClasses = `border bg-white dark:bg-blue-800 border-blue-500 dark:border-white focus:border-blue-600 focus:outline-none focus:bg-blue-50 dark:focus:bg-blue-900 p-2 w-full`

type CommentFormProps = {
  _key: string
  closeDialog: () => void
}

export default function CommentForm(props: CommentFormProps) {
  const {_key, closeDialog} = props
  const pageData = useRouteLoaderData<typeof pageLoader>(
    'routes/_website.$slug',
  )
  const {_id} = pageData?.initial.data || {}
  const fetcher = useFetcher()

  useEffect(() => {
    const isDone = fetcher.state === 'idle' && fetcher.data != null

    if (isDone) {
      closeDialog()
    }
  }, [closeDialog, fetcher])

  return (
    <Dialog
      open
      onClose={() => closeDialog()}
      className="fixed inset-0 z-30 overflow-y-auto"
    >
      <div className="z-50 flex min-h-screen items-center justify-center">
        <DialogBackdrop className="fixed inset-0 bg-blue-500/90 dark:bg-blue-900/90" />

        <div className="relative z-20 mx-auto max-w-sm rounded bg-white p-6 shadow dark:bg-blue-800 md:p-12">
          <button
            type="button"
            onClick={() => closeDialog()}
            className="float-right rounded-full p-2 text-blue-500 focus:bg-white focus:text-blue-500 dark:text-white dark:focus:bg-blue-500"
            title="Close"
          >
            <XCircleIcon className="h-auto w-8" />
            <span className="sr-only">Close</span>
          </button>
          <p className="mb-4">
            If you found this post confusing, helpful, neither or both, let me
            know!
          </p>
          <fetcher.Form method="post" className="grid grid-cols-1 gap-4">
            <input className="sr-only" type="hidden" name="_id" value={_id} />
            <input className="sr-only" type="hidden" name="_key" value={_key} />
            <input
              className="sr-only"
              type="text"
              name="validation"
              tabIndex={-1}
              defaultValue=""
            />
            <div className="grid grid-cols-1 gap-2">
              <DialogTitle>
                <Label>Comment</Label>
              </DialogTitle>
              <textarea
                required
                rows={2}
                name="content"
                title="Your Comment"
                minLength={10}
                maxLength={1000}
                className={inputClasses}
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label>Name</Label>
              <input
                required
                type="text"
                name="name"
                title="Your Name"
                className={inputClasses}
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label>Email</Label>
              <input
                required
                type="email"
                title="Email Address"
                name="email"
                className={inputClasses}
              />
            </div>
            <Button disabled={fetcher.state !== 'idle'} type="submit">
              Post Comment
            </Button>
          </fetcher.Form>
        </div>
      </div>
    </Dialog>
  )
}
