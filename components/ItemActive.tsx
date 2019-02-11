import { useState, useContext } from 'react'
import css from 'styled-jsx/css'
import DispatchContext from '../utils/dispatch'

interface Props {
  title: string
  id: string
  onSubmit (id: string, value: string): void
}

function ItemLink ({ title, id, onSubmit }: Props) {
  const [value, setValue] = useState(title)
  const dispatch = useContext(DispatchContext)

  const handleSubmit = (id: string) => {
    dispatch({
      type: 'edit',
      id,
      content: value
    })

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
    align-items: center;
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
