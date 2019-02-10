export interface ItemData {
  id: string,
  content: string,
  done: string
}

export type Item = ItemData & {
  active: boolean
}

export interface Action {
  type: string
  id?: string
  content?: string
}

export interface State {
  items: Item[]
}
