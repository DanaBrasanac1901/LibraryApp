import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'

import { ModalDialogProps } from '../../interfaces/ModalDialogProps'
import './modalDialog.css'

export function ModalDialog({ children, setShowDialog, bookDetails, rentId }: ModalDialogProps) {
  const [ submitClickEvent, submitOnClick ] = useState(false)
  const [ isModalFirstRender, setIsModalFirstRender ] = useState(true)
  const [ isModalReadyToClose, setIsModalReadyToClose ] = useState(false)

  useEffect( () => {
    if(isModalReadyToClose) closeDialog()
  }, [ isModalReadyToClose ])

  const closeDialog = () => {
    setShowDialog(false)
  }
  const onSubmitClickHandler = () =>{
    setIsModalFirstRender(false)
    submitOnClick((previousState) => !previousState)
  }

  return (
    <div className='modal-dialog-overlay'>
      <div className='modal-dialog-body'>
        {children({ submitClickEvent, isModalFirstRender, setIsModalReadyToClose, bookDetails, rentId })}
        <div className='modal-dialog-buttons'>
          <button className='modal-dialog-button' onClick={onSubmitClickHandler}>Confirm</button>
          <button className='modal-dialog-button' onClick={closeDialog}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
