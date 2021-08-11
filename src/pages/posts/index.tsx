import { GetStaticProps } from 'next';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { format } from 'date-fns';

import Head from 'next/head';

import styles from './styles.module.scss';
import { ptBR } from 'date-fns/locale';

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostsProps {
 posts: Post[];
}

export default function Posts({posts}: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <a key={post.id} href="#">
             <time>{post.updatedAt}</time>
             <strong>{post.title}</strong>
             <p>
              {post.excerpt}
             </p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'post')
  ], {
    fetch: ['post.title', 'post.content'],
    pageSize: 100
  });
  // console.log(JSON.stringify(response, null, 2));

  const posts = response.results.map(post => {
    return {
      id: post.id,
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find((content: { type: string; }) => content.type === 'paragraph')?.text ?? '',
      updatedAt: post.last_publication_date ? format(new Date(post.last_publication_date), "dd 'de' MMMM 'de' yyyy", {locale: ptBR}) : '',
      // updatedAt: post.last_publication_date ? new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
      //   day: '2-digit',
      //   month: 'long',
      //   year: 'numeric'
      // }) : ''
    };
  });
  return { 
    props: {posts}
  }
}