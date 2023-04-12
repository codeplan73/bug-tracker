import React, { useState, useEffect } from 'react'
import image from './../assets/bug.png'
import {Input, Button, Header} from './../components'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {login, reset} from '../features/auth/authSlice'  

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, loading, error, success, message} = useSelector(state => state.auth)

  useEffect(() => {
    if(error){
      toast.error(message)
    }

    if(success || user){
      navigate('/dashboard')
    } 

    dispatch(reset)
  }, [error, success, user, message, navigate, dispatch])

  const handleSubmit =e=> {
    e.preventDefault()
    if(!email || !password){
      toast.error('Please all field required')
    }

    const user = {
      email, password
    }

    dispatch(login(user))
    setEmail('')
    setPassword('')
  }

  if(loading){
    return <h2>Loading...</h2>
  }

  return (
    <div className="bg-slate-100 flex flex-col mx-auto justify-center items-center h-full md:h-screen lg:h-screen pt-32 md:pt-0">
       <Header />
      <div className='shadow-2xl p-4 rounded bg-white w-3/4 w-90 md:w-6/12 lg:w-4/12'>
      <img src={image} className="h-1/4 w-1/4 mx-auto rounded" alt="" />
        <form onSubmit={handleSubmit} className="w-full" autoComplete='off'>
            <Input type="email" value={email} label='email' onChange={e=> setEmail(e.target.value)}/>
            
            <Input type="password" autocomplete="off" value={password} label='password' onChange={e=> setPassword(e.target.value)}/>
            <Button btn="Login"/>
        </form>
      </div>
    </div>
  )
}

export default Login
