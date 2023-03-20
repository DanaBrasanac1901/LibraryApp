export interface bookData{
    Title: string;
    Description: string;
    ISBN: string;
    Quantity: number;
    PublishDate: string;
    AuthorIds: string[];
    Cover: Blob;
}

export interface CreateBookProps {
    setBookData: React.Dispatch<React.SetStateAction<bookData>>,
    bookData: bookData
}

export interface BookFormProps{
    submitClickEvent: boolean
}
