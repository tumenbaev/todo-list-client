import { Action, Item } from '../types'

function itemReducer (item: Item, action: Action): Item {
  switch (action.type) {
    case 'edit':
      return action.content ? {
        ...item,
        content: action.content,
        done: Boolean(action.done)
      } : item
    default:
      return item
  }
}

export default itemReducer
