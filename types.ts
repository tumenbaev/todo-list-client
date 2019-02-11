export interface Item {
  id: string,
  content: string,
  done: boolean
}

export interface Action {
  type: string
  id?: string
  content?: string,
  done?: boolean
}

export interface State {
  items: Item[]
}
