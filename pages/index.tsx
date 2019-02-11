import { NextFunctionComponent } from 'next'
import { useEffect, useReducer, useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout'
import ListItem from '../components/Item'
import { Item } from '../types'
import itemsReducer from '../reducers/itemsReducer'
import Dispatch from '../utils/dispatch'
import InputGroup from '../components/InputGroup'
import { putItem } from '../utils/request'

interface Props {
  items: Item[]
}

const Index: NextFunctionComponent<Props> = props => {
  const [activeId, setActiveId] = useState('')
  const [newValue, setNewValue] = useState('')
  const [state, dispatch] = useReducer(itemsReducer, { items: props.items })
  useEffect(() => {
    console.info(state)
  })

  const handleSubmit = () => {
    setActiveId('')
  }

  const handleAdd = (value: string) => {
    putItem({
      content: value,
      done: false
    }).then(id => {
      dispatch({
        type: 'add',
        content: value,
        id
      })
      setNewValue('')
    })
  }

  return (
    <Layout>
      <Dispatch.Provider value={dispatch}>
        <form action=''>
          <div className='input-field'>
            <InputGroup
              value={newValue}
              setValue={setNewValue}
              onSubmit={handleAdd}
              placeholder='New item'
            />
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
      <style jsx>{`
        .input-field {
          display: flex;
          align-items: center;
        }
        `}</style>
    </Layout>
  )
}

Index.getInitialProps = async (): Promise<Props> => {
  const res = await fetch('http://localhost:4000/items')
  const items = await res.json()

  console.log(`Show data fetched. Count: ${items.length}`)

  return { items }
}

export default Index
