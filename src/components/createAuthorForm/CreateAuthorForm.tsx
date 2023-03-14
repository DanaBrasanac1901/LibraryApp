import { useState } from 'react'

import { CreateAuthorBody } from '../../interfaces/CreateAuthorBody'
import { createAuthor } from '../../services/AuthorService'
import './createAuthorForm.css'

export function CreateAuthorForm () {
  const [ requestDataAuthor, setrequestDataAuthor ] = useState({
    'FirstName': '',
    'LastName': ''
  })

  const handleCreateAuthorSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    const author : CreateAuthorBody = {
      FirstName: requestDataAuthor.FirstName,
      LastName: requestDataAuthor.LastName
    }
    try{
      await createAuthor(author)
    }catch(err){
      err
    }

  }

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setrequestDataAuthor({ ...requestDataAuthor, [name]: value })
  }

  return(
    <form className='create-author-form' onSubmit={e=> void handleCreateAuthorSubmit(e)}>
      <label>First name</label>
      <input type='text' name='FirstName' onChange={(e)=>inputChangeHandler(e)}/>
      <label>Last name</label>
      <input type='text' name='LastName' onChange={(e)=>inputChangeHandler(e)}/>
      <button className='create-author-button' type='submit'>Add</button>
    </form>
  )
}
