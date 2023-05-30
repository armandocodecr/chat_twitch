import { ReactNode } from "react";


export interface ChatContent {
    id: string | undefined,
    username: string;
    color: string;
    message: string;
    emotes: { [emoteid: string]: string[] } | undefined;
    badges?: string[]
    image?: string
}

export interface IMessageData {
    username: string,
    id: string | undefined
    color: string,
    image?: string,
    badges?: string[],
    messageContent: ReactNode[]
}   