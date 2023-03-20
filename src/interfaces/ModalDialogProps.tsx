import { Dispatch } from 'react'

import { BookFormProps } from './BookFormProps'

export interface ModalDialogProps {
    setShowDialog: Dispatch<React.SetStateAction<boolean>>,
    children: (props: BookFormProps) => JSX.Element
  }
