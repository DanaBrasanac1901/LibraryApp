import { Dispatch, SetStateAction } from 'react'

import { BookDetailsResponse } from './BookDetailsResponse'

export interface BookData{
    Title: string;
    Description: string;
    ISBN: string;
    Quantity: number;
    PublishDate: string;
    AuthorIds: string[];
    Cover : Blob | null;
}

export interface DialogContentProps{
    submitClickEvent: boolean,
    isModalFirstRender : boolean,
    setIsModalReadyToClose : Dispatch<SetStateAction<boolean>>,
    bookDetails? : BookDetailsResponse,
    fetchBookDetails? : () => void,
    rentId? : number
}
