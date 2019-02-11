import { useContext } from 'react'
import css from 'styled-jsx/css'
import DispatchContext from '../utils/dispatch'
import InputGroup from './InputGroup'

interface Props {
  title: string
  id: string
  onSubmit (id: string, value: string): void
}

function ItemLink ({ title, id, onSubmit }: Props) {
  const dispatch = useContext(DispatchContext)

  const handleSubmit = (id: string, value: string) => {
    dispatch({
      type: 'edit',
      id,
      content: value
    })

    onSubmit(id, value)
  }

  return (
    <li className='collection-item'>
      <InputGroup
        value={title}
        onSubmit={value => handleSubmit(id, value)}
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

export default ItemLink
