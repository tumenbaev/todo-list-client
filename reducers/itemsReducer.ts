import itemReducer from './itemReducer'
import { Action, State } from '../types'

function itemsReducer (state: State, action: Action): State {
  const { items } = state
  switch (action.type) {
    case 'edit' :
      return {
        items: items.map(item => (
          item.id === action.id ? itemReducer(item, action) : item)
        )
      }
    default:
      return state
  }
}

export default itemsReducer
