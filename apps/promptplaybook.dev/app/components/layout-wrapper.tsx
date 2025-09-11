import {Link} from 'react-router'
import {Container} from './container'
import {GradientBackground} from './gradient'
import {Subheading} from '@repo/frontend'

export function LayoutWrapper({children}: {children: React.ReactNode}) {
  return (
    <>
      <main className="relative overflow-hidden">
        <GradientBackground />
        <Container>
          <div className="border-b border-blue-100 py-8 mix-blend-multiply">
            <Subheading>
              <Link to="/">Prompt Playbook</Link>
            </Subheading>
          </div>
        </Container>
        {children}
      </main>
    </>
  )
}
