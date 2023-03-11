import { Dispatch } from "react"

export interface SideMenuProps{
isAuthenticated : boolean
setShowCreateBookDialog : Dispatch<React.SetStateAction<boolean>>
}
