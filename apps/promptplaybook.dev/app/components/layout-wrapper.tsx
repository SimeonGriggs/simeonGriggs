import {Link} from 'react-router'
import {Container} from './container'
import {GradientBackground} from './gradient'
import {Subheading} from './text'

export function LayoutWrapper({children}: {children: React.ReactNode}) {
  return (
    <>
      <GradientBackground />
      <main className="relative overflow-hidden">
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
