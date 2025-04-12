import { NextAuthOptions } from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"

export const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "1.0A",
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 43200,
  },

  jwt: {
    maxAge: 12 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.oauth_token as string
        token.accessSecret = account.oauth_token_secret
      }
      return token
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.accessToken
      session.accessSecret = token.accessSecret
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}
