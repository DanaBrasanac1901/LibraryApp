import { Dispatch, SetStateAction } from 'react'

export interface LoginPageProps {
    setIsAuthenticated:Dispatch<SetStateAction<boolean>>
}
