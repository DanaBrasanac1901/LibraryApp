import { Dispatch, SetStateAction } from 'react'

export interface HeaderMenuProps {
    isAuthenticated:boolean,
    setIsAuthenticated:Dispatch<SetStateAction<boolean>>
  }
