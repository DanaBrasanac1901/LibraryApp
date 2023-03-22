import { Dispatch, SetStateAction } from 'react'

export interface BookHistoryProps{
    fetchBookDetails : () => void,
    newBookRented : boolean
}
