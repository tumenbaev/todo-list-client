import fetch from 'isomorphic-unfetch'
import { Item } from '../types'

type Payload = Partial<Item>
type Method = 'get' | 'post' | 'put' | 'delete'

function request (method: Method, data?: Payload) {
  if (method === 'get') {
    return fetch('http://localhost:4000/items')
  }
  return fetch('http://localhost:4000/items', {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export function getItems (): Promise<Item[]> {
  return request('get')
    .then(response => response.json()) as unknown as Promise<Item[]>
}

export function postItem (item: Payload): Promise<Item> {
  return request('post', item)
    .then(response => response.json()) as unknown as Promise<Item>
}

export function putItem (item: Payload): Promise<string> {
  return request('put', item)
    .then(response => response.text()) as unknown as Promise<string>
}

export function deleteItem (item: Payload): Promise<void> {
  return request('delete', item) as unknown as Promise<void>
}
