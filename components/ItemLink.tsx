import css from 'styled-jsx/css'

interface Props {
  title: string,
  id: string
}

function ItemLink ({ title }: Props) {
  return <li className='collection-item'>
    <label>
      <input type='checkbox' />
      <span>{title}</span>
    </label>
    <a className='secondary-content'>
      <i className='material-icons'>delete</i>
    </a>
    <a className='secondary-content'>
      <i className='material-icons'>edit</i>
    </a>
    <style jsx>{style}</style>
  </li>
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

export default ItemLink
