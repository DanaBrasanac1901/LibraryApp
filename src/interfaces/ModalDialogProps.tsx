import { Dispatch } from 'react'

import { BookDetailsResponse } from './BookDetailsResponse'
import { DialogContentProps } from './DialogContentProps'

export interface ModalDialogProps {
    setShowDialog: Dispatch<React.SetStateAction<boolean>>,
    children: (props: DialogContentProps) => JSX.Element,
    bookDetails? : BookDetailsResponse,
    rentId? : number
  }
