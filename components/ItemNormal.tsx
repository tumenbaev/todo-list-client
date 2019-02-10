import css from 'styled-jsx/css'

interface Props {
  title: string
  id: string
  onEdit (id: string): void
  onDelete (id: string): void
}

function Item ({ title, id, onEdit, onDelete }: Props) {
  return (
    <li className='collection-item'>
      <label>
        <input type='checkbox' />
        <span>{title}</span>
      </label>
      <a onClick={() => onDelete(id)} className='secondary-content'>
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

  a {
    text-decoration: none;
  }

  a:hover {
    opacity: 0.6;
  }
`

export default Item
