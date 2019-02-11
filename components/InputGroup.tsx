interface Props {
  value?: string
  placeholder: string
  onSubmit (value: string): void
  setValue (value: string): void
}
function InputGroup ({ value = '', setValue, onSubmit, placeholder }: Props) {
  return (
    <>
      <input
        placeholder={placeholder}
        type='text'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <a onClick={() => onSubmit(value)} className='secondary-content'>
        <i className='material-icons'>check_circle</i>
      </a>
    </>
  )
}

export default InputGroup
