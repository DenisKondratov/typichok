const Button = ({ onClick = null, children = null }) => {
  return <button className='btn btn-primary' onClick={onClick}>
    {children}
  </button>
}

export default Button