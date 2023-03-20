import { useState } from 'react'

import { ModalDialogProps } from '../../interfaces/ModalDialogProps'
import './modalDialog.css'

export function ModalDialog({ children, setShowDialog }: ModalDialogProps) {
  const [ submitClickEvent, submitOnClick ] = useState(false)

  const closeDialog = () => {
    setShowDialog(false)
  }

  return (
    <div className='modal-dialog-overlay'>
      <div className='modal-dialog-body'>
        {children({ submitClickEvent })}
        <div className='modal-dialog-buttons'>
          <button className='modal-dialog-button' onClick={() => submitOnClick((previousState) => !previousState)}>Submit</button>
          <button className='modal-dialog-button' onClick={closeDialog}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
