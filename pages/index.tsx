import fetch from 'isomorphic-unfetch'
import css from 'styled-jsx/css'
import Layout from '../components/Layout'
import ItemLink from '../components/ItemLink'
import { Component } from 'react'

interface Item {
  id: string,
  content: string,
  done: string
}

interface Props {
  items: Item[]
}

class Index extends Component<Props> {
  static async getInitialProps () {
    const res = await fetch('http://localhost:4000/items')
    const items = await res.json()

    console.log(`Show data fetched. Count: ${items.length}`)

    return { items }
  }

  render () {
    const { items } = this.props
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
          {items.map((item) => (
            <ItemLink
              key={item.id}
              id={item.id}
              title={item.content}
            />
          ))}
        </ul>
        <style jsx>{style}</style>
      </Layout>
    )
  }
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
