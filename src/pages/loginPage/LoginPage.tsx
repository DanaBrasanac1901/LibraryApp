import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { LoginCredentials } from '../../interfaces/LogInCredentials'
import { LoginPageProps } from '../../interfaces/LoginPageProps'
import { logIn } from '../../services/loginService'
import { getSessionStorageData, setSessionStorage } from '../../services/SessionStorageService'
import './loginPage.css'

export function LoginPage({ setIsAuthenticated }: LoginPageProps) {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    const data: LoginCredentials = {
      email: email,
      password: password
    }
    try{
      setSessionStorage(await logIn(data))
      if(getSessionStorageData() === null) throw Error
      setIsAuthenticated(true)
      navigate('/')
    }
    catch(error){
      error
    }
  }
  return (
    <div className='login-page'>
      <form onSubmit={e=> void handleSubmit(e)} className='login-page-content'>
        <div className='login-page-label'>
          <label>Email:</label>
        </div>
        <input
          type = 'email'
          className='login-page-input'
          value={email}
          onChange = {(event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value)}}
          required
        />
        <div className='login-page-label'>
          <label>Password:</label>
        </div>
        <input type='password'
          value={password}
          className='login-page-input'
          onChange = {(event: React.ChangeEvent<HTMLInputElement>) => {setPassword(event.target.value)}}
          required
        />
        <button type='submit' className='login-page-button'>
          Log in
        </button>
      </form>
    </div>
  )
}
