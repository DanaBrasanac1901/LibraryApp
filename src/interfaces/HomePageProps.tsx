import { Dispatch } from "react";

export interface HomePageProps {
    showCreateBookDialog : boolean,
    setShowCreateBookDialog: Dispatch<React.SetStateAction<boolean>>
  }