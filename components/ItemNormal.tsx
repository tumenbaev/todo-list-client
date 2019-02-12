import { useContext, useState, ChangeEvent, memo } from 'react'
import css from 'styled-jsx/css'
import DispatchContext from '../utils/dispatch'
import { deleteItem, postItem } from '../utils/request'
import { Item } from '../types'

interface Props {
  item: Item,
  onEdit (id: string): void
}

function ItemNormal ({ item, onEdit }: Props) {
  console.info('render normal')
  const dispatch = useContext(DispatchContext)
  const { id, content, done } = item
  const [checked, setChecked] = useState(done)

  const handleDelete = () => {
    deleteItem(id).then(() => {
      dispatch({
        type: 'delete',
        id
      })
    }).catch(console.error)
  }
  const handleChecked = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    const newItem = {
      ...item,
      done: checked
    }
    setChecked(checked)

    postItem(newItem)
      .then(updatedItem => {
        dispatch({
          type: 'edit',
          ...updatedItem
        })
      }).catch(error => {
        setChecked(!checked)
        console.error(error)
      })
  }

  return (
    <li className='collection-item'>
      <label>
        <input
          type='checkbox'
          checked={checked}
          onChange={handleChecked}
        />
        <span className={checked ? 'done' : ''}>{content}</span>
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

  .done {
    text-decoration: line-through;
  }
`

export default memo(ItemNormal)
