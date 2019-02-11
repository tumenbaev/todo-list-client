import { useContext } from 'react'
import css from 'styled-jsx/css'
import DispatchContext from '../utils/dispatch'

interface Props {
  title: string
  id: string
  onEdit (id: string): void
}

function Item ({ title, id, onEdit }: Props) {
  const dispatch = useContext(DispatchContext)

  const handleDelete = () => {
    dispatch({
      type: 'delete',
      id
    })
  }

  console.info('render normal')
  return (
    <li className='collection-item'>
      <label>
        <input type='checkbox' />
        <span>{title}</span>
      </label>
      <a onClick={handleDelete} className='secondary-content'>
        <i className='material-icons'>delete</i>
      </a>
      <a onClick={() => onEdit(id)} className='secondary-content'>
        <i className='material-icons'>edit</i>
      </a>
      <style jsx>{style}</style>
    </li>
  )
}

const style = css`
  li {
    list-style: none;
    margin: 5px 0;
  }

  a:hover {
    opacity: 0.6;
  }
`

export default Item
