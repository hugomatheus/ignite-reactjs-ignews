import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { faunadb } from '../../../services/faunadb';
import { query as q } from 'faunadb';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'read:user'
    }),
  ],
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  callbacks: {
    async signIn(user, account, profile) {
      try {
        await faunadb.query(
          q.Create(
            q.Collection('users'),
            {data: {email: user.email}}
          )
        );
        return true;
      } catch (error) {
        return false;
      }
    },
    // async redirect(url, baseUrl) {
    //   return baseUrl
    // },
    // async session(session, user) {
    //   return session
    // },
    // async jwt(token, user, account, profile, isNewUser) {
    //   return token
    // }
  }
})