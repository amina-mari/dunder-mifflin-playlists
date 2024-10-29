import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify'

const generateRandomString = (myLength) => {
    const chars =
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
      { length: myLength },
      (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );
  
    const randomString = randomArray.join("");
    return randomString;
  };

let state = generateRandomString(16);

export const authOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_ID,
            clientSecret: process.env.SPOTIFY_SECRET,
            authorization: {
                params: {
                    response_type: 'code',
                    client_id: process.env.SPOTIFY_ID,
                    scope: "user-read-private user-read-email",
                    redirect_uri: "http://localhost:3000/api/auth/callback/spotify",
                    state: state
                }
            }
        })
    ]
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };