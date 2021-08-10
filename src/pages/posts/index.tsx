import { GetStaticProps } from 'next';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';

import Head from 'next/head';

import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer imperdiet tempor dolor. Praesent condimentum mauris eu diam egestas tristique. Etiam ornare efficitur velit, ac malesuada lorem fringilla aliquet. Duis commodo odio vitae lacus porta maximus eget sit amet ligula. Maecenas in sapien nibh. Proin finibus velit ac est sodales maximus non rutrum dolor. In tempus purus sed mauris consequat maximus. Praesent ac augue ante. Quisque efficitur rutrum gravida. Suspendisse ut tellus nunc. Quisque quis odio in augue congue semper. Maecenas et enim sapien. Morbi eu lacinia risus. Nulla egestas diam ut tellus tristique, a accumsan lorem posuere. Suspendisse maximus nisl eu tellus laoreet, ut gravida tortor pharetra.
              Suspendisse a ex orci. Aliquam efficitur odio erat, vitae iaculis justo pulvinar ac. Donec feugiat, arcu id tempor dapibus, quam elit hendrerit purus, nec efficitur nisi nisl nec lorem. Sed interdum maximus est, non feugiat libero laoreet vitae. Vivamus sit amet vulputate nisi. Nam purus tortor, hendrerit non condimentum sed, iaculis ac est. Sed viverra mauris porttitor dolor imperdiet tincidunt vel sit amet tortor. Quisque porta neque sed augue rhoncus, nec interdum diam posuere. Sed sed lacinia lacus, nec vestibulum justo. Aenean euismod nunc lectus, ac finibus felis sollicitudin eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer vel ante sapien.
            </p>
          </a>
          <a href="">
            <time>12 de março de 2021</time>
            <strong>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer imperdiet tempor dolor. Praesent condimentum mauris eu diam egestas tristique. Etiam ornare efficitur velit, ac malesuada lorem fringilla aliquet. Duis commodo odio vitae lacus porta maximus eget sit amet ligula. Maecenas in sapien nibh. Proin finibus velit ac est sodales maximus non rutrum dolor. In tempus purus sed mauris consequat maximus. Praesent ac augue ante. Quisque efficitur rutrum gravida. Suspendisse ut tellus nunc. Quisque quis odio in augue congue semper. Maecenas et enim sapien. Morbi eu lacinia risus. Nulla egestas diam ut tellus tristique, a accumsan lorem posuere. Suspendisse maximus nisl eu tellus laoreet, ut gravida tortor pharetra.
              Suspendisse a ex orci. Aliquam efficitur odio erat, vitae iaculis justo pulvinar ac. Donec feugiat, arcu id tempor dapibus, quam elit hendrerit purus, nec efficitur nisi nisl nec lorem. Sed interdum maximus est, non feugiat libero laoreet vitae. Vivamus sit amet vulputate nisi. Nam purus tortor, hendrerit non condimentum sed, iaculis ac est. Sed viverra mauris porttitor dolor imperdiet tincidunt vel sit amet tortor. Quisque porta neque sed augue rhoncus, nec interdum diam posuere. Sed sed lacinia lacus, nec vestibulum justo. Aenean euismod nunc lectus, ac finibus felis sollicitudin eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer vel ante sapien.
            </p>
          </a>
          <a href="">
            <time>12 de março de 2021</time>
            <strong>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer imperdiet tempor dolor. Praesent condimentum mauris eu diam egestas tristique. Etiam ornare efficitur velit, ac malesuada lorem fringilla aliquet. Duis commodo odio vitae lacus porta maximus eget sit amet ligula. Maecenas in sapien nibh. Proin finibus velit ac est sodales maximus non rutrum dolor. In tempus purus sed mauris consequat maximus. Praesent ac augue ante. Quisque efficitur rutrum gravida. Suspendisse ut tellus nunc. Quisque quis odio in augue congue semper. Maecenas et enim sapien. Morbi eu lacinia risus. Nulla egestas diam ut tellus tristique, a accumsan lorem posuere. Suspendisse maximus nisl eu tellus laoreet, ut gravida tortor pharetra.
              Suspendisse a ex orci. Aliquam efficitur odio erat, vitae iaculis justo pulvinar ac. Donec feugiat, arcu id tempor dapibus, quam elit hendrerit purus, nec efficitur nisi nisl nec lorem. Sed interdum maximus est, non feugiat libero laoreet vitae. Vivamus sit amet vulputate nisi. Nam purus tortor, hendrerit non condimentum sed, iaculis ac est. Sed viverra mauris porttitor dolor imperdiet tincidunt vel sit amet tortor. Quisque porta neque sed augue rhoncus, nec interdum diam posuere. Sed sed lacinia lacus, nec vestibulum justo. Aenean euismod nunc lectus, ac finibus felis sollicitudin eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer vel ante sapien.
            </p>
          </a>
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
  return { 
    props: {}
  }
}