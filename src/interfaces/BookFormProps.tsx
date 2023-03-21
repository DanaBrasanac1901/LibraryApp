import { BookDetailsResponse } from "./BookDetailsResponse";

export interface BookData{
    Title: string;
    Description: string;
    ISBN: string;
    Quantity: number;
    PublishDate: string;
    AuthorIds: string[];
    Cover: Blob;
}

export interface BookFormProps{
    submitClickEvent: boolean,
    bookData? : BookDetailsResponse
}
