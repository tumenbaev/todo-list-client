import { useContext } from 'react'
import css from 'styled-jsx/css'
import DispatchContext from '../utils/dispatch'
import { deleteItem } from '../utils/request'
import { Item } from '../types'

interface Props {
  item: Item,
  onEdit (id: string): void
}

function ItemNormal ({ item, onEdit }: Props) {
  const dispatch = useContext(DispatchContext)
  const { id, content } = item

  const handleDelete = () => {
    deleteItem(id).then(() => {
      dispatch({
        type: 'delete',
        id
      })
    }).catch(console.error)
  }

  console.info('render normal')
  return (
    <li className='collection-item'>
      <label>
        <input type='checkbox' />
        <span>{content}</span>
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

export default ItemNormal
