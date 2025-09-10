import {Link} from 'react-router'
import {Container} from './container'
import {GradientBackground} from './gradient'
import {Subheading} from './text'

export function LayoutWrapper({children}: {children: React.ReactNode}) {
  return (
    <>
      <GradientBackground />
      <main className="overflow-hidden relative">
        <Container>
          <div className="py-8 mix-blend-multiply border-b border-gray-100">
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
