import { useState, useEffect } from "react";
import tmi from 'tmi.js';

import { myBadges, badgesGlobal } from "../data/badges";
import { getUserImage } from "../services/getUserImage";
import { ChatContent } from "../interfaces/Chat";

export const useChatMessages = () => {

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

  return { chat, badges }

}