import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { getBlogPosts } from '../../utils/blog-utils';
import styles from '../../styles/Blog.module.css';

export default function BlogPage() {
  const posts = getBlogPosts();
  
  return (
    <div className={styles.blogContainer}>
      <Head>
        <title>Blog | My Website</title>
        <meta name="description" content="Read our latest blog posts" />
      </Head>
      
      <h1 className={styles.blogTitle}>Blog</h1>
      
      <div className={styles.blogGrid}>
        {posts.map(post => (
          <article key={post.slug} className={styles.blogCard}>
            {post.coverImage && (
              <div className={styles.blogImageContainer}>
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className={styles.blogImage}
                />
              </div>
            )}
            <div className={styles.blogCardContent}>
              <h2 className={styles.blogCardTitle}>{post.title}</h2>
              <p className={styles.blogDate}>{post.date}</p>
              <p className={styles.blogExcerpt}>{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className={styles.readMoreLink}>
                Read More
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
