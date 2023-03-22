import { useState } from 'react'

import { CreateAuthorBody } from '../../interfaces/CreateAuthorBody'
import { CreateAuthorFormProps } from '../../interfaces/CreateAuthorFormProps'
import { createAuthor } from '../../services/AuthorService'
import './createAuthorForm.css'

export function CreateAuthorForm ({ fetchAuthors }: CreateAuthorFormProps) {
  const [ authorData, setAuthorData ] = useState({
    'FirstName': '',
    'LastName': ''
  })

  const handleCreateAuthorSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    const author : CreateAuthorBody = {
      FirstName: authorData.FirstName,
      LastName: authorData.LastName
    }
    try{
      await createAuthor(author)
      fetchAuthors()
    }catch(err){
      console.log(err)
    }

  }

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setAuthorData({ ...authorData, [name]: value })
  }

  return(
    <form className='create-author-form' onSubmit={e=> void handleCreateAuthorSubmit(e)}>
      <label>First name</label>
      <input type='text' name='FirstName' required onChange={(e)=>inputChangeHandler(e)}/>
      <label>Last name</label>
      <input type='text' name='LastName' required onChange={(e)=>inputChangeHandler(e)}/>
      <button className='create-author-button' type='submit'>Add</button>
    </form>
  )
}
