'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import DraggableWindow from '@/components/DraggableWindow';

const MusicPlayer = dynamic(() => import('@/components/MusicPlayer'), {
  ssr: false
});

const Piano = dynamic(() => import('@/components/Piano'), {
  ssr: false
});

const Ladies = dynamic(() => import('@/components/Ladies'), {
  ssr: false
});

const MessageWall = dynamic(() => import('@/components/MessageWall'), {
  ssr: false
});

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [showGifsPopup, setShowGifsPopup] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [showPiano, setShowPiano] = useState(false);
  const [showLadies, setShowLadies] = useState(false);
  const [showMessageWall, setShowMessageWall] = useState(false);
  
  const popupRef = useRef<HTMLDivElement>(null);
  const questionMarkRef = useRef<HTMLSpanElement>(null);
  const gifsRef = useRef<HTMLDivElement>(null);
  const gifsPopupRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((showPopup && 
          popupRef.current && 
          questionMarkRef.current &&
          !popupRef.current.contains(event.target as Node) &&
          !questionMarkRef.current.contains(event.target as Node)) ||
          (showGifsPopup &&
          gifsPopupRef.current &&
          gifsRef.current &&
          !gifsPopupRef.current.contains(event.target as Node) &&
          !gifsRef.current.contains(event.target as Node))) {
        setShowPopup(false);
        setShowGifsPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup, showGifsPopup]);

  // Get current date and format it
  const now = new Date();
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  
  const dayName = days[now.getDay()];
  const day = now.getDate();
  const month = now.getMonth();
  
  // Get time in 12-hour format
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const hours12 = hours % 12 || 12;
  const timeString = `${hours12}:${minutes.toString().padStart(2, '0')}${ampm}`;

  return (
    <main className="min-h-screen">
      <DraggableWindow className="main-window">
        <div className="window-title">
          <button className="close-button" aria-label="Close">×</button>
        </div>

        <div className="content-area">
          <div className="author-info">
            <h1>Muzeffer Eyvazov</h1>
            <p>Professional Stalker</p>
          </div>

          <div className="post-list">
            <div className="section-title">Latest Posts</div>
            <ul className="divide-y divide-black">
              {['The Revival of Retro UI', 'Mastering CSS Grid', 'JavaScript: Then and Now'].map((post, index) => (
                <li key={index} className="post-item">
                  <Link href={`/post/${index + 1}`} className="block">
                    {post}
                  </Link>
                </li>
              ))}
              <li className="post-item">
                <Link href="/posts" className="block text-blue-600 hover:underline">
                  View All Posts →
                </Link>
              </li>
            </ul>
          </div>

          <div className="links-section">
            <div className="section-title">Links</div>
            <ul className="divide-y divide-black">
              <li className="link-item">
                <Link href="https://github.com/yourusername" className="block">
                  GitHub Profile
                </Link>
              </li>
              <li className="link-item">
                <Link href="https://linkedin.com/in/yourusername" className="block">
                  LinkedIn Profile
                </Link>
              </li>
              <li className="link-item">
                <Link href="/cv.pdf" className="block">
                  Download CV
                </Link>
              </li>
            </ul>
          </div>

          <div className="visitor-counter">
            <span>Visitor Count:</span>
            <div className="counter-display">
              000,042
            </div>
          </div>
        </div>

        <div className="poolsuite-footer">
          <div className="flex justify-center w-full">
            <div className="flex">
              <button 
                onClick={() => setShowMusicPlayer(!showMusicPlayer)}
                className="poolsuite-link"
              >
                <Image
                  src="/icons/icon_favorite.png"
                  alt="Music"
                  width={20}
                  height={20}
                  className="poolsuite-icon"
                />
                <span>Music?</span>
              </button>
              <button 
                onClick={() => setShowPiano(!showPiano)}
                className="poolsuite-link"
              >
                <Image
                  src="/icons/piano.png"
                  alt="Piano"
                  width={20}
                  height={20}
                  className="poolsuite-icon"
                />
                <span>Piano</span>
              </button>
              <button 
                onClick={() => setShowLadies(!showLadies)}
                className="poolsuite-link"
              >
                <Image
                  src="/icons/heart.png"
                  alt="Heart"
                  width={20}
                  height={20}
                  className="poolsuite-icon"
                />
                <span>Only Ladies!!!</span>
              </button>
              <button 
                onClick={() => setShowMessageWall(!showMessageWall)}
                className="poolsuite-link"
              >
                <Image
                  src="/icons/stickywall.png"
                  alt="Message Wall"
                  width={20}
                  height={20}
                  className="poolsuite-icon"
                />
                <span>Message Wall</span>
              </button>
            </div>
          </div>
        </div>
      </DraggableWindow>
      
      <MusicPlayer 
        isOpen={showMusicPlayer} 
        onClose={() => setShowMusicPlayer(false)} 
      />
      <Piano
        isOpen={showPiano}
        onClose={() => setShowPiano(false)}
      />
      <Ladies
        isOpen={showLadies}
        onClose={() => setShowLadies(false)}
      />
      <MessageWall
        isOpen={showMessageWall}
        onClose={() => setShowMessageWall(false)}
      />
    </main>
  );
}
