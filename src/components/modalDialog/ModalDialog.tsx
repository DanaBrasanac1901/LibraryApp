import { ModalDialogProps } from '../../interfaces/ModalDialogProps'
import './modalDialog.css'

export function ModalDialog({ children, setShowDialog, onSubmit }: ModalDialogProps) {

  const closeDialog = () => {
    setShowDialog(false)
  }

  return (
    <div className='modal-dialog-overlay'>
      <div className='modal-dialog-body'>
        {children}
        <div className='modal-dialog-buttons'>
          <button className='modal-dialog-button' onClick={() =>{void onSubmit()} }>Submit</button>
          <button className='modal-dialog-button' onClick={closeDialog}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
