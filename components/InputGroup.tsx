import { useState } from 'react'

interface Props {
  value?: string
  onSubmit (value: string): void
}
function InputGroup ({ value = '', onSubmit }: Props) {
  const [newValue, setNewValue] = useState(value)

  return (
    <>
      <input
        placeholder='Item content'
        type='text'
        value={newValue}
        onChange={e => setNewValue(e.target.value)}
      />
      <a onClick={() => onSubmit(newValue)} className='secondary-content'>
        <i className='material-icons'>check_circle</i>
      </a>
    </>
  )
}

export default InputGroup
