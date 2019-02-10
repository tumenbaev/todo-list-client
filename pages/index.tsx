import { NextFunctionComponent } from 'next'
import { useEffect, useReducer, useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout'
import ListItem from '../components/Item'
import { Item, ItemData } from '../types'
import itemsReducer from '../reducers/itemsReducer'

interface Props {
  items: Item[]
}

const Index: NextFunctionComponent<Props> = props => {
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

  const handleDelete = (id: string) => {
    dispatch({
      type: 'delete',
      id
    })
  }

  return (
    <Layout>
      <form action=''>
        <div className='input-field'>
          <input placeholder='New item' id='newItem' type='text' />
        </div>
      </form>
      <ul className='collection'>
        {state.items.map((item: Item) => (
          <ListItem
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

export default Index
