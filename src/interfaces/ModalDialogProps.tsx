import { Dispatch } from 'react'

export interface ModalDialogProps {
    setShowDialog: Dispatch<React.SetStateAction<boolean>>,
    children: React.ReactElement,
    onSubmit: () => void
  }
