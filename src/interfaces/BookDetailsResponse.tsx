import { AuthorBookDetailsResponse } from './AuthorBookDetailsResponse'

export interface BookDetailsResponse {
Id : number,
Title : string,
Description : string,
ISBN : string,
Quantity : number,
Available : number,
Cover? : string,
PublishDate : string,
Authors: AuthorBookDetailsResponse[]

}
