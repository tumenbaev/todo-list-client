import { useState } from 'react'
import css from 'styled-jsx/css'

interface Props {
  title: string
  id: string
  onSubmit (id: string, value: string): void
}

function ItemLink ({ title, id, onSubmit }: Props) {
  const [value, setValue] = useState(title)
  const handleSubmit = (id: string) => {
    onSubmit(id, value)
  }

  return (
    <li className='collection-item'>
      <input
        placeholder='Item content'
        type='text'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <a onClick={() => handleSubmit(id)} className='secondary-content'>
        <i className='material-icons'>check_circle</i>
      </a>
      <style jsx>{style}</style>
    </li>
  )
}

const style = css`
  li {
    display: flex;
    list-style: none;
    margin: 5px 0;
    align-items: center;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    opacity: 0.6;
  }

  input {
    margin-right: 20px !important;
    margin-bottom: 0 !important;
  }
`

export default ItemLink
