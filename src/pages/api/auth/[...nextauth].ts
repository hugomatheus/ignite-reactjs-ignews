import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { faunadb } from '../../../services/faunadb';
import { query as q } from 'faunadb';
import { session } from 'next-auth/client';

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
    async session(session) {
     try {
      if(session.user?.email) {
        const userActiveSubscription = await faunadb.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_user_ref'),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index('user_email'), 
                      q.Casefold(session.user.email)
                    )
                  )
                )
              ),
              q.Match(
                q.Index('subscription_status'),
                "active"
              )
              ])
          )
        ) 
        return {...session, activeSubscription: userActiveSubscription};
      }
      return {...session, activeSubscription: null};
     } catch (error) {
       return {...session, activeSubscription: null};
     }    
    },
    async signIn(user, account, profile) {
      
      if(!user.email){
        return false;
      }

      try {
        await faunadb.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_email'), q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              {data: {email: user.email}}
            ),
            q.Get(
              q.Match(
                q.Index('user_email'), q.Casefold(user.email)
              )
            )
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