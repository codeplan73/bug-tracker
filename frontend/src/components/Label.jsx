import React from 'react'

const Label = ({label}) => {
  return (
    <div>
        <label htmlFor={label}>{label}</label>
    </div>
  )
}

export default Label