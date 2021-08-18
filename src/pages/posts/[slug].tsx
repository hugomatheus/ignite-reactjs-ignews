import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import { getPrismicClient } from "../../services/prismic";
import { RichText } from "prismic-dom";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import Head from "next/head";

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function Post({ post }: PostProps) {
  return (
    <>
    <Head>
      <title>{post.title} | Ignews</title>
    </Head>
    <main>
      <article>
        <h1>{post.title}</h1>
        <time>{post.updatedAt}</time>
        <div dangerouslySetInnerHTML={{__html: post.content}} />
      </article>
    </main>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const session = await getSession({req:context.req});
  const {slug} = context.query;

  const prismic = getPrismicClient(context.req);
  const response = await prismic.getByUID('post', String(slug), {});
  const post = {
    slug,
    title: response?.data.title ? RichText.asText(response?.data.title) : '',
    content: response?.data.content ? RichText.asHtml(response?.data.content) : '',
    updatedAt: response?.data.last_publication_date ? format(new Date(response.data.last_publication_date), "dd 'de' MMMM 'de' yyyy", {locale: ptBR}) : '',
  }
  
  return {
    props: {
      post,
    }
  }

}