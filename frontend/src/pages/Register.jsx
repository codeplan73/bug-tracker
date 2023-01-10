import React, { useState, useEffect } from 'react' 
import {Input, Button} from './../components'
import { toast } from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {register, reset} from '../features/auth/authSlice'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  // const [formData]

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, loading, error, success, message} = useSelector(state => state.auth)

  useEffect(() => {
    if(error){
      toast.error(message)
    }

    if(success || user){
      navigate('/login')
    }

    dispatch(reset)
    setName('')
    setEmail('')
    setPassword('')
    setPassword2('')
  }, [error, success, user, navigate, dispatch, message])

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!name || !email || !password || !password2){
      toast.info('All fields required')
    }
    if(password !== password2){
      toast.error('Password does not match')
    }
   
    // const user= {
    //   name, email, password
    // }

    dispatch(register({name, email, password}))

    // setName('')
    // setEmail('')
    // setPassword('')
    // setPassword2('')
  }
  if(loading){
    return (<h4>Loading....</h4>)
  }
  return (
    <div className="bg-slate-100 flex flex-col mx-auto justify-center items-center h-full md:h-screen lg:h-screen pt-32 md:pt-0 scroll-auto">
    <div className='shadow-2xl p-4 rounded bg-white w-3/4 w-90 md:w-6/12 lg:w-4/12'>
      <h4 className='text-2xl font-semibold text-teal-900 text-center mb-2'>Register  Account with us</h4>
      <hr/>
      <form onSubmit={handleSubmit} className="w-full" autoComplete='off'>
          <Input type="text" value={name} label='fullname' onChange={e=> setName(e.target.value)}/>
          <Input type="email" value={email} label='email' onChange={e=> setEmail(e.target.value)}/>
          <Input type="password" value={password} label='password' onChange={e=> setPassword(e.target.value)}/>
          <Input type="password" value={password2} label='confirm Password' onChange={e=> setPassword2(e.target.value)}/>
          <Button btn="Login"/>
      </form>
    </div>
  </div>
  )
}

export default Register