import { NextFunctionComponent } from 'next'
import { useEffect, useReducer, useState } from 'react'
import fetch from 'isomorphic-unfetch'
import css from 'styled-jsx/css'
import Layout from '../components/Layout'
import Item from '../components/Item'

interface ItemData {
  id: string,
  content: string,
  done: string
}

type Item = ItemData & {
  active: boolean
}

interface Props {
  items: Item[]
}

interface Action {
  type: string
  id?: string
  content?: string
}

interface State {
  items: Item[]
}

function itemReducer (item: Item, action: Action): Item {
  switch (action.type) {
    case 'edit':
      return action.content ? {
        ...item,
        content: action.content
      } : item
    default:
      return item
  }
}

function itemsReducer (state: State, action: Action): State {
  const { items } = state
  switch (action.type) {
    case 'edit' :
      return {
        items: items.map(item => (
          item.id === action.id ? itemReducer(item, action) : item)
        )
      }
    default:
      return state
  }
}

// const App: FunctionComponent<{}>

const Index: NextFunctionComponent<Props> = props => {
  // const [items, setItems] = useState(props.items)
  const [activeId, setActiveId] = useState('')
  const [state, dispatch] = useReducer(itemsReducer, { items: props.items })
  useEffect(() => {
    console.info(state)
  })

  const handleSubmit = (id: string, value: string) => {
    setActiveId('')
    dispatch({
      type: 'edit',
      id,
      content: value
    })
  }

  const handleDelete = () => {
    // todo
  }

  return (
    <Layout>
      <form action=''>
        <div className='input-field'>
          <input placeholder='New item' id='newItem' type='text' />
        </div>
      </form>
      <ul className='collection'>
        <li className='collection-item'>
          <input placeholder='Placeholder' type='text' />
        </li>
        {state.items.map((item: Item) => (
          <Item
            key={item.id}
            id={item.id}
            activeId={activeId}
            title={item.content}
            onEdit={setActiveId}
            onDelete={handleDelete}
            onSubmit={handleSubmit}
          />
        ))}
      </ul>
      <style jsx>{style}</style>
    </Layout>
  )
}

const getItems = (items: ItemData[]): Item[] => (
  items.map(item => ({
    ...item,
    active: false
  }))
)

Index.getInitialProps = async (): Promise<Props> => {
  const res = await fetch('http://localhost:4000/items')
  const itemsData = await res.json()

  console.log(`Show data fetched. Count: ${itemsData.length}`)

  return { items: getItems(itemsData) }
}

const style = css`
  h1, a {
    font - family: "Arial";
  }

  ul {
    padding: 0;
  }
  `

export default Index
