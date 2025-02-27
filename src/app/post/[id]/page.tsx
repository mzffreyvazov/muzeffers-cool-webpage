'use client';

import { useState } from 'react';
import Link from 'next/link';
import { posts } from '@/data/posts';

export default function Post({ params }: { params: { id: string } }) {
  const post = posts.find(p => p.id === parseInt(params.id));

  if (!post) {
    return (
      <main className="min-h-screen p-4">
        <div className="max-w-[800px] mx-auto">
          <div className="main-window">
            <div className="window-title text-xs py-1">
              <span>Post Not Found</span>
            </div>
            <div className="window-content p-[10px]">
              <Link href="/posts" className="text-xs text-[#000080] hover:underline">← Back to all posts</Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-[800px] mx-auto">
        {/* Left Sidebar */}
        <div className="main-window mb-[10px]">
          <div className="window-title text-xs py-1">
            <span>Categories</span>
          </div>
          <div className="window-content p-[10px]">
            <div>
              <h3 className="mt-0 mb-2 text-sm">Topics</h3>
              <ul className="list-none p-0 m-0">
                {['All Posts', 'UI Design', 'CSS', 'JavaScript', 'HTML', 'Retro'].map(topic => (
                  <li key={topic}>
                    <Link 
                      href="#" 
                      className="text-sm text-[#000080] hover:underline block py-0.5"
                    >
                      {topic}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="mt-0 mb-2 text-sm">Archives</h3>
              <ul className="list-none p-0 m-0">
                {['February 1984', 'January 1984', 'December 1983'].map(month => (
                  <li key={month}>
                    <Link 
                      href="#" 
                      className="text-sm text-[#000080] hover:underline block py-0.5"
                    >
                      {month}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="mt-0 mb-2 text-sm">Related Posts</h3>
              {posts.filter(p => p.id !== parseInt(params.id)).slice(0, 2).map(relatedPost => (
                <div key={relatedPost.id} className="mb-2">
                  <Link 
                    href={`/post/${relatedPost.id}`} 
                    className="text-sm text-[#000080] hover:underline block"
                  >
                    {relatedPost.title}
                  </Link>
                  <div className="text-xs text-[#666]">{relatedPost.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Window */}
        <div className="main-window">
          <div className="window-title text-xs py-1">
            <span>{post.title}</span>
          </div>
          <div className="window-content p-[10px]">
            {/* Navigation Menu */}
            <div className="flex space-x-4 mb-4">
              <Link href="/" className="text-sm text-black no-underline hover:bg-[#000080] hover:text-white px-2">
                Home
              </Link>
              <Link href="/blog" className="text-sm text-black no-underline hover:bg-[#000080] hover:text-white px-2">
                Blog
              </Link>
              <Link href="/github" className="text-sm text-black no-underline hover:bg-[#000080] hover:text-white px-2">
                GitHub
              </Link>
              <Link href="/cv" className="text-sm text-black no-underline hover:bg-[#000080] hover:text-white px-2">
                CV
              </Link>
            </div>

            {/* Breadcrumb */}
            <div className="text-[10px] mb-4">
              <Link href="/" className="text-[#000080] hover:underline">Home</Link>
              {' > '}
              <Link href="/blog" className="text-[#000080] hover:underline">Blog</Link>
              {' > '}
              <Link href="/posts" className="text-[#000080] hover:underline">All Posts</Link>
              {' > '}
              <span>The Revival of Retro UI</span>
            </div>

            {/* Post Title and Meta */}
            <h1 className="text-xl mb-2">{post.title}</h1>
            <div className="text-xs text-[#666] mb-4">{post.date}</div>
            
            <div className="mb-6">
              <span className="bg-[#000080] text-white px-2 py-[1px] text-[10px] mr-2">UI Design</span>
              <span className="bg-[#000080] text-white px-2 py-[1px] text-[10px]">Retro</span>
            </div>

            {/* Post Content */}
            <div className="post-content space-y-4 mb-8">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-[15px] leading-relaxed text-[#222] font-['Segoe_UI',system-ui,sans-serif]">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4 border-t border-[#808080]">
              <Link 
                href={`/post/${post.id - 1}`} 
                className={`inline-block bg-[#c0c0c0] border-t-[2px] border-l-[2px] border-[#fff] border-b-[2px] border-r-[2px] border-[#000] px-2 py-[1px] text-[10px] no-underline text-black hover:bg-[#d0d0d0] ${post.id <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                ← Previous Post
              </Link>
              <Link 
                href={`/post/${post.id + 1}`}
                className={`inline-block bg-[#c0c0c0] border-t-[2px] border-l-[2px] border-[#fff] border-b-[2px] border-r-[2px] border-[#000] px-2 py-[1px] text-[10px] no-underline text-black hover:bg-[#d0d0d0] ${post.id >= posts.length ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Next Post →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-5 right-5 w-[30px] h-[30px] bg-[#c0c0c0] border-t-[2px] border-l-[2px] border-[#fff] border-b-[2px] border-r-[2px] border-[#000] flex items-center justify-center text-xs font-bold"
      >
        ↑
      </button>
    </main>
  );
}
