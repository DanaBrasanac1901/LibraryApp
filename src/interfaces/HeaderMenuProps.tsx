import { Dispatch, ReactNode, SetStateAction } from 'react'

export interface HeaderMenuProps {
    children?: ReactNode
    isAuthenticated:boolean,
    setIsAuthenticated:Dispatch<SetStateAction<boolean>>
  }
