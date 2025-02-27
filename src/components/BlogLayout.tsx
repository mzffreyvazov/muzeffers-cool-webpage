'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

interface BlogLayoutProps {
  children: React.ReactNode;
  totalPosts?: number;
  currentPage?: number;
  totalPages?: number;
}

export default function BlogLayout({ 
  children,
  totalPosts = 6,
  currentPage = 1,
  totalPages = 3
}: BlogLayoutProps) {
  const [sortOrder, setSortOrder] = useState('newest');
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex gap-4 p-4 max-w-7xl mx-auto">
      {/* Sidebar Window */}
      <div 
        ref={sidebarRef}
        className="w-[200px] flex-shrink-0 window"
      >
        <div className="window-title">
          <span>Categories</span>
          <button className="close-button">×</button>
        </div>
        <div className="window-content p-4">
          <div className="search-box flex mb-4">
            <input 
              type="text" 
              placeholder="Search..." 
              className="flex-grow border-2 border-gray-600 bg-white p-1"
            />
            <button className="retro-button ml-2 px-2">Go</button>
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-2">Topics</h3>
            <ul className="space-y-1">
              {['All Posts', 'UI Design', 'CSS', 'JavaScript', 'HTML', 'Retro'].map(topic => (
                <li key={topic}>
                  <Link 
                    href="#" 
                    className={`block p-1 hover:bg-[#000080] hover:text-white
                      ${topic === 'All Posts' ? 'bg-[#000080] text-white' : ''}`}
                  >
                    {topic}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">Archives</h3>
            <ul className="space-y-1">
              {['February 1984', 'January 1984', 'December 1983'].map(month => (
                <li key={month}>
                  <Link href="#" className="block p-1 hover:bg-[#000080] hover:text-white">
                    {month}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content Window */}
      <div 
        ref={mainRef}
        className="flex-grow window"
      >
        <div className="window-title">
          <span>All Blog Posts</span>
          <button className="close-button">×</button>
        </div>
        <div className="window-content p-4">
          <div className="menu-bar border-b border-gray-600 pb-2 mb-4">
            <Link href="/" className="mr-4 hover:bg-[#000080] hover:text-white px-2">Home</Link>
            <Link href="/posts" className="mr-4 hover:bg-[#000080] hover:text-white px-2">Blog</Link>
            <Link href="https://github.com/yourusername" className="mr-4 hover:bg-[#000080] hover:text-white px-2">GitHub</Link>
            <Link href="/cv.pdf" className="hover:bg-[#000080] hover:text-white px-2">CV</Link>
          </div>

          <div className="breadcrumb text-sm mb-4">
            <Link href="/" className="text-[#000080] hover:underline">Home</Link>
            {' > '}
            <Link href="/posts" className="text-[#000080] hover:underline">Blog</Link>
            {' > All Posts'}
          </div>

          <div className="filters flex justify-between items-center mb-4">
            <span>Showing {totalPosts} posts</span>
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2">Sort by:</label>
              <select 
                id="sort" 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border-2 border-gray-600 bg-white p-1"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="az">A-Z</option>
              </select>
            </div>
          </div>

          {children}

          <div className="pagination flex justify-between items-center mt-6">
            <button 
              className="retro-button px-4"
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button 
              className="retro-button px-4"
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 w-8 h-8 retro-button flex items-center justify-center"
      >
        ↑
      </button>
    </div>
  );
}
