import { NextFunctionComponent } from 'next'
import { useEffect, useReducer, useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout'
import ListItem from '../components/Item'
import { Item, ItemData } from '../types'
import itemsReducer from '../reducers/itemsReducer'
import Dispatch from '../utils/dispatch'

interface Props {
  items: Item[]
}

const Index: NextFunctionComponent<Props> = props => {
  const [activeId, setActiveId] = useState('')
  const [state, dispatch] = useReducer(itemsReducer, { items: props.items })
  useEffect(() => {
    console.info(state)
  })

  const handleSubmit = () => {
    setActiveId('')
  }

  return (
    <Layout>
      <Dispatch.Provider value={dispatch}>
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
              onSubmit={handleSubmit}
            />
          ))}
        </ul>
      </Dispatch.Provider>
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
