import { useContext, useState } from 'react'
import css from 'styled-jsx/css'
import DispatchContext from '../utils/dispatch'
import InputGroup from './InputGroup'
import { Item } from '../types'
import { postItem } from '../utils/request'

interface Props {
  item: Item
  onSubmit (id: string, value: string): void
}

function ItemActive ({ item, onSubmit }: Props) {
  const dispatch = useContext(DispatchContext)
  const [value, setValue] = useState(item.content)

  const handleSubmit = (value: string) => {
    const newItem = {
      ...item,
      content: value
    }
    postItem(newItem).then(updatedItem => {
      dispatch({
        type: 'edit',
        ...updatedItem
      })
      onSubmit(item.id, value)
    }).catch(console.error)
  }

  return (
    <li className='collection-item'>
      <InputGroup
        value={value}
        setValue={setValue}
        placeholder='Item content'
        onSubmit={handleSubmit}
      />
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

export default ItemActive
