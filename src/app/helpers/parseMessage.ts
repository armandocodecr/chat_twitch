type IEmotes = { [emoteid: string]: string[] } | undefined;
type EmotesArray = { id: string; begin: number; end: number }[];

export const getEmotes = (emotes: IEmotes) => {
  const emotesRender: EmotesArray = [];

  if (!emotes) return emotesRender;

  Object.entries(emotes).forEach(([id, positions]) => {
    positions.forEach((position) => {
      const [begin, end] = position.split("-");
      emotesRender.push({
        id: id,
        begin: Number(begin),
        end: Number(end),
      });
    });
  });

  return emotesRender.sort(( a, b ) => a.begin - b.begin)
};
