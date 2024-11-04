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
                    scope: "user-top-read user-library-read",
                    redirect_uri: "https://dunder-mifflin-playlists.vercel.app/api/auth/callback/spotify",
                    state: state
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            if(account){
                token.access_token = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                token
            };
        },
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };