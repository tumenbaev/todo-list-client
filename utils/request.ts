import fetch from 'isomorphic-unfetch'
import { Item } from '../types'

type Payload = Partial<Item>
type Method = 'get' | 'post' | 'put' | 'delete'

function request (method: Method, data?: Payload | string) {
  const url = 'http://localhost:4000/items'
  if (method === 'get') {
    return fetch(url)
  }
  if (typeof data === 'string') {
    return fetch(`${url}/${data}`, { method })
  }
  return fetch(url, {
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

export function deleteItem (id: string): Promise<void> {
  return request('delete', id) as unknown as Promise<void>
}
