import { User } from './User'

export interface BookHistoryResponse {
    Id : number,
    User : User,
    RentDate : string,
    IsReturned : boolean  
}