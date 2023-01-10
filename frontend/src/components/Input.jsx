import React from 'react'

const Input = ({type,value, label, onChange}) => {
    const cap = label.charAt(0)
    const firstCap = cap.toUpperCase()
    const otherLabel = label.slice(1)

    label = firstCap+otherLabel
    
  return (
    <div className='flex flex-col gap-1 p-2 my-2'>
        <label className='text-gray-800 font-mono' htmlFor={label}>{label}</label>
        <input type={type} className='font-normal p-2 rounded-md font-mono text-gray-900 border-slate-300 ' value={value} autoComplete="off"  placeholder={`Enter ${label}`} onChange={onChange}/>
    </div>
  )
}

export default Input