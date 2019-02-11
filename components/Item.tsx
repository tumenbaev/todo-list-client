import ItemNormal from './ItemNormal'
import ItemActive from './ItemActive'

interface Props {
  activeId: string
  title: string
  id: string
  onEdit (id: string): void
  onSubmit (id: string, value: string): void
}

function Item ({ title, id, onEdit, onSubmit, activeId }: Props) {
  return activeId === id ? (
    <ItemActive
      title={title}
      id={id}
      onSubmit={onSubmit}
    />
  ) : (
    <ItemNormal
      title={title}
      id={id}
      onEdit={onEdit}
    />
  )
}

export default Item
