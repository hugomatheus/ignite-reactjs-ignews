import Head from 'next/head';
import Image from 'next/image';
import styles from './home.module.scss';
import imgAvatar from '../../../ignews/public/images/avatar.svg'; 
import { SubscribeButton } from '../components/SubscribeButton';

export default function Home() {
  return (
      <>
        <Head>
          <title>Home | ig.news</title>
        </Head>
        <main className={styles.contentContainer}>
          <section className={styles.hero}>
            <span>👏 Hey, welcome</span>
            <h1>News about the <span>React</span> world.</h1>
            <p>
              Get access to all the publications <br/>
              <span>for $9.90 month</span>
            </p>
            <SubscribeButton />
          </section>
          <Image src={imgAvatar} alt=""  />
        </main>
      </>
    )
}
