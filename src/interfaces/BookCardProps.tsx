import { Author } from './Author'

export interface BookCardProps{
    Title: string,
    Isbn: string,
    Cover?: string,
    Authors: Author[]
}
