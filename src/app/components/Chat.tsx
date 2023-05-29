"use client";
import { useState, useEffect, ReactNode } from "react";
import tmi from "tmi.js";
import { getEmotes } from "../helpers/parseMessage";
import { JavaScriptIcon } from "../static/icons";
import { badgesGlobal, myBadges } from "../data/badges";
import { getUserImage } from "../services/getUserImage";

interface ChatContent {
  id: string | undefined,
  username: string;
  color: string;
  message: string;
  emotes: { [emoteid: string]: string[] } | undefined;
  badges?: string[]
  image?: string
}

export default function Chat() {
  const [chat, setChat] = useState<ChatContent[]>([]);
  const [badges, setBadges] = useState<string[]>([])

  useEffect(() => {
    const client = new tmi.Client({
      options: { debug: true },
      channels: ["armandocodecr"],
    });

    client.connect();

    client.on("message", async(_, tags, message, self) => {
      if (self) return;

      const { set_id, versions } = myBadges
      const { data } = badgesGlobal

      setBadges([])

      if(tags.badges){
        Object.entries(tags.badges).forEach(([badge, id]) => {
          if(set_id === badge){
            versions.forEach(level => {
              if(id === level.id) setBadges(prev => [...prev, level.image_url_4x])
            })
          }
          data.forEach(badgeGlobal => {
            if(badge === badgeGlobal.set_id){
              badgeGlobal.versions.forEach(level => {
                if(id === level.id) setBadges(prev => [...prev, level.image_url_4x])
              })
            }
          })
        })
      }

      const messageContent: ChatContent = {
        id: tags.id,
        username: `@${tags.username}` || "",
        color: `${tags.color ?? "#F5F5DC"}`,
        message,
        emotes: tags.emotes,
        badges
      };

      const userImage: string = await getUserImage(messageContent.username.substring(1))

      messageContent.image = userImage

      setChat((prev) => {
        if (prev.length >= 5) {
          return [...prev.slice(1), messageContent];
        } else {
          return [...prev, messageContent];
        }
      });

      return
    });

    return () => {
      client.disconnect();
    };
  }, []);

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
          <div 
            key={message.id}
            className="bg-[#242426]/40 bg-gradient-to-br from-zinc-950 to-zinc-800 w-[100%] h-fit rounded-2xl p-4 relative fade-in-out"
            style={{ border: `3px solid ${message.color}` }}
          >
            { message.image && (
              <img 
                className="absolute -top-5 right-0 h-[50px] rounded-full overflow-hidden" alt="perfil_image_twitch" 
                src={message.image} 
                style={{ border: `3px solid ${message.color}` }}
              />
            ) }
            <p
              className="flex font-semibold"
            >
              <span 
                className="absolute flex items-center capitalize text-lg top-[-20px] px-5 py-2 -left-5 font-bold tracking-tight bg-gray-400 
                rounded-tl-full rounded-tr-full rounded-br-full rounded-bl-none overflow-hidden bg-gradient-to-br from-[#333] to-[#111]" 
                style={{ color: message.color, border: `3px solid ${message.color}` }}>
                { badges && badges.map(badge => <img className="h-[24px] px-1" alt="badge_twitch" src={badge} />) }
                { message.username.substring(1) }
              </span>

              <JavaScriptIcon />

              <span 
                className="flex text-[#E3E6E8] font-semibold tracking-tight pt-5 flex-wrap break-all"
              >
               {messageContent}
              </span>
            </p>
          </div>
        );
      })}
    </section>
  );
}
