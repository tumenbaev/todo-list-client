import itemReducer from './itemReducer'
import { Action, State } from '../types'
import without from 'ramda/src/without'
import find from 'ramda/src/find'
import propEq from 'ramda/src/propEq'

function itemsReducer (state: State, action: Action): State {
  const { id, content } = action
  const { items } = state
  switch (action.type) {
    case 'add':
      return (!id || !content) ? state : {
        items: [
          ...state.items,
          {
            id,
            content,
            done: false
          }
        ]
      }
    case 'edit' :
      return {
        items: items.map(item => (
          item.id === action.id ? itemReducer(item, action) : item)
        )
      }
    case 'delete':
      const itemToDelete = find(propEq('id', action.id), items)

      return itemToDelete ? {
        items: without([itemToDelete], items)
      } : state
    default:
      return state
  }
}

export default itemsReducer
