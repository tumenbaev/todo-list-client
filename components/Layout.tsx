import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Layout = (props: Props) => (
  <div>
    <nav>
      <div className='nav-wrapper'>
        <a href='#' className='brand-logo'>Todo List</a>
      </div>
    </nav>
    <div className='container'>
      {props.children}
    </div>
  </div>
)

export default Layout
