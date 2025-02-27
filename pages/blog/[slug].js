import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getBlogPostBySlug, getBlogPosts } from '../../utils/blog-utils';
import styles from '../../styles/BlogPost.module.css';

export default function BlogPost({ post }) {
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className={styles.blogPostContainer}>
      <Head>
        <title>{post.title} | My Website</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <article className={styles.blogPost}>
        {post.coverImage && (
          <div className={styles.coverImageContainer}>
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className={styles.coverImage} 
            />
          </div>
        )}
        
        <div className={styles.postHeader}>
          <h1 className={styles.postTitle}>{post.title}</h1>
          <p className={styles.postDate}>{post.date}</p>
        </div>
        
        <div className={styles.postContent} 
             dangerouslySetInnerHTML={{ __html: post.content }} />
        
        <div className={styles.backToBlogs}>
          <Link href="/blog" className={styles.backLink}>
            ← Back to all posts
          </Link>
        </div>
      </article>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const post = getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: { post }
  };
}

export async function getStaticPaths() {
  const posts = getBlogPosts();
  
  return {
    paths: posts.map(post => ({
      params: { slug: post.slug }
    })),
    fallback: false
  };
}
