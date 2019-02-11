import ItemNormal from './ItemNormal'
import ItemActive from './ItemActive'
import { Item } from '../types'

interface Props {
  activeId: string
  item: Item,
  onEdit (id: string): void
  onSubmit (id: string, value: string): void
}

function ListItem ({ item, onEdit, onSubmit, activeId }: Props) {
  return activeId === item.id ? (
    <ItemActive
      item={item}
      onSubmit={onSubmit}
    />
  ) : (
    <ItemNormal
      item={item}
      onEdit={onEdit}
    />
  )
}

export default ListItem
