
export const getUserImage = ( username: string ): Promise<string> => {

    const url = `https://api.twitch.tv/helix/users?login=${username}`

    const auth: string = String(process.env.NEXT_PUBLIC_CLIENT_AUTHORIZATION_TWITCH)
    const client_id: string = String(process.env.NEXT_PUBLIC_CLIENT_ID_TWITCH)

    console.log({ auth, client_id })

    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${auth}`,
            "Client-Id": client_id
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

