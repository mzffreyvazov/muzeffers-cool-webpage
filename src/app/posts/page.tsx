'use client';

import { useState } from 'react';
import Link from 'next/link';
import { posts } from '@/data/posts';
import DraggableWindow from '@/components/DraggableWindow';

export default function Posts() {
  const [sortOrder, setSortOrder] = useState('newest');
  
  return (
    <main className="min-h-screen p-4">
      {/* Use noDefaultTitle to avoid duplicate title bars */}
      <DraggableWindow 
        className="posts-window"
        noDefaultTitle={true}
      >
        <div className="content-area">
          <div className="max-w-[800px] mx-auto flex gap-[10px]">
            {/* Sidebar Window */}
            <div className="w-[200px] flex-shrink-0">
              <div className="main-window">
                <div className="window-title text-xs py-1">
                  <span>Categories</span>
                </div>
                <div className="window-content p-[10px] space-y-4">
                  <div className="search-box mb-[15px]">
                    <div className="flex">
                      <input 
                        type="text" 
                        placeholder="Search..." 
                        className="flex-grow border-[2px] border-[#808080] inset bg-white p-[2px] text-xs"
                      />
                      <button className="ml-1 px-2 py-[2px] bg-[#c0c0c0] border-t-[2px] border-l-[2px] border-[#fff] border-b-[2px] border-r-[2px] border-[#000] text-xs">
                        Go
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-[#808080] pt-4">
                    <h3 className="mt-0 mb-2 text-xs font-bold">Topics</h3>
                    <ul className="list-none p-0 m-0 space-y-0.5">
                      {['All Posts', 'UI Design', 'CSS', 'JavaScript', 'HTML', 'Retro'].map(topic => (
                        <li key={topic}>
                          <Link 
                            href="#" 
                            className={`block p-1 text-xs no-underline hover:bg-[#000080] hover:text-white
                              ${topic === 'All Posts' ? 'bg-[#000080] text-white' : 'text-black'}`}
                          >
                            {topic}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-[#808080] pt-4">
                    <h3 className="mt-0 mb-2 text-xs font-bold">Archives</h3>
                    <ul className="list-none p-0 m-0 space-y-0.5">
                      {['February 1984', 'January 1984', 'December 1983'].map(month => (
                        <li key={month}>
                          <Link 
                            href="#" 
                            className="block p-1 text-xs no-underline text-black hover:bg-[#000080] hover:text-white"
                          >
                            {month}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Window */}
            <div className="flex-grow">
              <div className="main-window">
                <div className="window-title text-xs py-1">
                  <span>All Blog Posts</span>
                </div>
                <div className="window-content p-[10px] space-y-4">
                  <div className="menu-bar py-[2px] border-b border-[#808080]">
                    <Link href="/" className="inline-block px-2 py-[2px] mr-[10px] text-xs no-underline text-black hover:bg-[#000080] hover:text-white">
                      Home
                    </Link>
                    <Link href="/posts" className="inline-block px-2 py-[2px] mr-[10px] text-xs no-underline text-black hover:bg-[#000080] hover:text-white">
                      Blog
                    </Link>
                    <Link href="https://github.com/yourusername" className="inline-block px-2 py-[2px] mr-[10px] text-xs no-underline text-black hover:bg-[#000080] hover:text-white">
                      GitHub
                    </Link>
                    <Link href="/cv.pdf" className="inline-block px-2 py-[2px] text-xs no-underline text-black hover:bg-[#000080] hover:text-white">
                      CV
                    </Link>
                  </div>

                  <div className="text-[10px]">
                    <Link href="/" className="text-[#000080] no-underline hover:underline">Home</Link>
                    {' > '}
                    <Link href="/posts" className="text-[#000080] no-underline hover:underline">Blog</Link>
                    {' > All Posts'}
                  </div>

                  <div className="border-t border-[#808080] pt-4">
                    <h1 className="mt-0 mb-4 text-sm font-bold">All Blog Posts</h1>

                    <div className="flex justify-between items-center mb-[15px] text-xs">
                      <span>Showing {posts.length} posts</span>
                      <div>
                        <label htmlFor="sort">Sort by:</label>
                        <select 
                          id="sort" 
                          value={sortOrder}
                          onChange={(e) => setSortOrder(e.target.value)}
                          className="ml-[5px] border-[2px] border-[#808080] inset bg-white p-[1px] text-xs"
                        >
                          <option value="newest">Newest First</option>
                          <option value="oldest">Oldest First</option>
                          <option value="az">A-Z</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {posts.map(post => (
                        <article key={post.id} className="pb-4 border-b border-[#808080] last:border-none">
                          <h2 className="mt-0 mb-1 text-sm font-bold">{post.title}</h2>
                          <div className="text-[#808080] my-1 text-xs">{post.date}</div>
                          <div className="my-2 text-xs leading-relaxed">{post.excerpt}</div>
                          <Link 
                            href={`/post/${post.id}`}
                            className="inline-block bg-[#c0c0c0] border-t-[2px] border-l-[2px] border-[#fff] border-b-[2px] border-r-[2px] border-[#000] px-2 py-[2px] text-xs no-underline text-black hover:bg-[#d0d0d0]"
                          >
                            Read More →
                          </Link>
                        </article>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-[#808080]">
                    <button className="bg-[#c0c0c0] border-t-[2px] border-l-[2px] border-[#fff] border-b-[2px] border-r-[2px] border-[#000] px-3 py-[2px] text-xs">
                      ← Previous
                    </button>
                    <div className="flex items-center text-xs">Page 1 of 1</div>
                    <button className="bg-[#c0c0c0] border-t-[2px] border-l-[2px] border-[#fff] border-b-[2px] border-r-[2px] border-[#000] px-3 py-[2px] text-xs">
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DraggableWindow>

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-5 right-5 w-[30px] h-[30px] bg-[#c0c0c0] border-t-[2px] border-l-[2px] border-[#fff] border-b-[2px] border-r-[2px] border-[#000] flex items-center justify-center text-xs font-bold"
      >
        ↑
      </button>
    </main>
  );
}
