import { useState } from 'react'
import './createAuthorForm.css'

export function CreateAuthorForm () {
  const [ requestDataAuthor, setrequestDataAuthor ] = useState({
    'FirstName': '',
    'LastName': ''
  })

  const createAuthor = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    console.log(requestDataAuthor)
  }

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setrequestDataAuthor({ ...requestDataAuthor, [name]: value })
  }

  return(
    <form className='create-author-form' onSubmit={e=> void createAuthor(e)}>
      <label>First name</label>
      <input type='text' name='FirstName' onChange={(e)=>inputChangeHandler(e)}/>
      <label>Last name</label>
      <input type='text' name='LastName' onChange={(e)=>inputChangeHandler(e)}/>
      <button className='create-author-button' type='submit'>Add</button>
    </form>
  )
}
