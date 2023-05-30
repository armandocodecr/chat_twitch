import { JavaScriptIcon } from "../static/icons"
import { IMessageData } from "../interfaces/Chat"

export const ContentMessages = ({ username, id, color, image, badges, messageContent }: IMessageData) => {
    return (
        <div 
            className="bg-[#242426]/40 bg-gradient-to-br from-zinc-950 to-zinc-800 w-[100%] h-fit rounded-2xl p-4 relative fade-in-out"
            style={{ border: `3px solid ${color}` }}
          >
            { image && (
              <img 
                className="absolute -top-5 right-0 h-[50px] rounded-full overflow-hidden" alt="perfil_image_twitch" 
                src={image} 
                style={{ border: `3px solid ${color}` }}
              />
            ) }
            <p
              className="flex font-semibold"
            >
              <span 
                className="absolute flex items-center capitalize text-lg top-[-20px] px-5 py-2 -left-5 font-bold tracking-tight bg-gray-400 
                rounded-tl-full rounded-tr-full rounded-br-full rounded-bl-none overflow-hidden bg-gradient-to-br from-[#333] to-[#111]" 
                style={{ color: color, border: `3px solid ${color}` }}>
                { badges && badges.map(badge => <img key={badge+id} className="h-[24px] px-1" alt="badge_twitch" src={badge} />) }
                { username.substring(1) }
              </span>

              <JavaScriptIcon />

              <span 
                className="flex text-[#E3E6E8] font-semibold tracking-tight pt-5 flex-wrap break-all"
              >
               {messageContent}
              </span>
            </p>
          </div>
    )
}