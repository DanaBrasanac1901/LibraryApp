import { Book } from './Book'

export interface GetAllBooksResponse {
 Items: Book[],
 TotalCount: number
}
