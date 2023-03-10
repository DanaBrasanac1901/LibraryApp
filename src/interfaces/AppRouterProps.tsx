import { Dispatch, SetStateAction } from 'react'

export interface AppRouterProps{
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}
