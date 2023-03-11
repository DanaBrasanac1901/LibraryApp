import { Dispatch } from "react"

export interface CreateBookDialogProps {
    showCreateBookDialog : boolean,
    setShowCreateBookDialog: Dispatch<React.SetStateAction<boolean>>
  }

