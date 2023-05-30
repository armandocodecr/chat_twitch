"use client";
import { ReactNode } from "react";
import { getEmotes } from "../helpers/parseMessage";
import { useChatMessages } from "../hooks";
import { ContentMessages } from "./ContentMessages";

export default function Chat() {

  const { chat, badges } = useChatMessages()

  return (
    <section className="w-[70%] bg-transparent h-auto flex flex-col items-start p-6 gap-8 absolute bottom-0 left-0">
      {chat.map((message) => {
        const messageContent: ReactNode[] = []
        let currentIndex = 0
        getEmotes(message.emotes).forEach(emote => {
          messageContent.push(<span>{message.message.slice(currentIndex, emote.begin)}</span>
          )
          messageContent.push(<img className="h-[28px] px-1" alt="emote_twitch" src={`https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/1.0`} />)
          currentIndex = emote.end + 1
        })
        messageContent.push(message.message.slice(currentIndex))
        return (
          <ContentMessages 
            key={message.id} 
            id={message.id} 
            messageContent={messageContent} 
            username={ message.username } 
            badges={badges} 
            image={message.image} 
            color={message.color} 
          />
        );
      })}
    </section>
  );
}
