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
  console.info('render active')
  const dispatch = useContext(DispatchContext)
  const [value, setValue] = useState(item.content)

  const handleSubmit = (value: string) => {
    const newItem = {
      ...item,
      content: value
    }

    dispatch({
      type: 'edit',
      ...newItem
    })
    onSubmit(item.id, value)
    postItem(newItem).catch(error => {
      dispatch({
        type: 'edit',
        ...item
      })
      console.error(error)
    })
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
