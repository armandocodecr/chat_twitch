
interface IParams{
    Authorization: string;
    "Client-Id": string;
    [key: string]: string;
}

export const getUserImage = ( username: string ): Promise<string> => {

    const url = `https://api.twitch.tv/helix/users?login=${username}`

    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer wev7pbp5la2l815c5obo8atvk8h125',
            "Client-Id": 'd90ayphabs6vkwrns8h21i7td47jum'
        }
    })
        .then(response => response.json())
        .then(res => String(res.data[0].profile_image_url))
        .catch(error => {
          // Manejar el error
          console.error('Error:', error);
          throw error
        });

}

