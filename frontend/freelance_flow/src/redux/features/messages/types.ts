import type { BaseResponse, User } from "../commonTypes/commonTypes";

// -------- SLICE TYPES ------------
export interface MessagesState {
    messages: Message[];
    messagesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    messagesError: string | null;


}



// ------ API TYPES ---------------

export interface Message {
    id: number;
    content: string
    name: string;
    messageStatus: "sent" | "delivered" | "seen";
    createdAt: string;
    sender: User;
    receiver: User;

}




export interface MessageResponse extends BaseResponse {

    messages: Message[]
}

