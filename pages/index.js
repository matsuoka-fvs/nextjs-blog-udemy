import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Layout, { siteTitle } from '../components/Layout';

import Link from 'next/link';
import utilstyle from "../styles/utils.module.css";
import { getPostsData } from "../lib/post";

//SSGの場合
export async function getStaticProps(){
  const allPostsData = getPostsData(); 
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  }
}

// //SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {

//     }
//   }
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilstyle.headingMd}>
        <p>私はジュニアエンジニアです/FVSのエンジニアとして活動しています/好きなフォントはFuturaです</p>
      </section>
      <section>
        <h2>🗒エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({id, title, date, thumbnail}) => (
             <article key={id}>
              <Link href={`/posts/${id}`}> 
                <img src={`${thumbnail}`} className={styles.thumbnailImage}/>
              </Link>
              <Link href={`/posts/${id}`}>
                <a className={utilstyle.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilstyle.lightText}>
                {date}
              </small>
            </article>
          ))}
         
        </div>
      </section>
      
    </Layout>

  )
}