import { CreateBookDialogProps } from '../../interfaces/CreateBookDialogProps'
import './createBookDialog.css'

export function CreateBookDialog({ showCreateBookDialog, setShowCreateBookDialog }: CreateBookDialogProps) {
  const createBook = () => {
    console.log('dana')
  }
  const closeDialog = () => {
    setShowCreateBookDialog(false)
  }
  if(!showCreateBookDialog) return null
  else return (
    <div className='create-book-modal'>
      <form onSubmit={createBook}>
        <label>Name</label>
        <input type='text'/>
        <label>Authors</label>
        <label>Quantity</label>
        <div className='create-book-dialog-buttons'>
          <button onClick={createBook}>Submit</button>
          <button onClick={closeDialog}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
