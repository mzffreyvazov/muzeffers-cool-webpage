'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function TerminalHeader() {
  const [currentTime, setCurrentTime] = useState<string>('')
  const [currentDate, setCurrentDate] = useState<string>('')
  const [showPopup, setShowPopup] = useState(false);
  const [showGifsPopup, setShowGifsPopup] = useState(false);
  
  const popupRef = useRef<HTMLDivElement>(null);
  const questionMarkRef = useRef<HTMLSpanElement>(null);
  const gifsRef = useRef<HTMLDivElement>(null);
  const gifsPopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update time and date initially and every minute
    const updateDateTime = () => {
      const now = new Date();
      const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
      
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';
      const hours12 = hours % 12 || 12;
      
      setCurrentTime(`${hours12}:${minutes.toString().padStart(2, '0')}${ampm}`);
      setCurrentDate(`${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]} 1984`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="terminal-header">
      <div className="terminal-label">muzeffer's cool webpage</div>
      <div>mzffreyazov2005@gmail.com</div>
      <div 
        ref={gifsRef}
        className="welcome-gif"
        onClick={() => setShowGifsPopup(!showGifsPopup)}
      >
        <Image
          src="/welcome4.gif"
          alt="Welcome"
          width={120}
          height={48}
          priority
        />
        <Image
          src="/welcome.gif"
          alt="Welcome"
          width={120}
          height={48}
          priority
        />
        <Image
          src="/welcome2.gif"
          alt="Welcome"
          width={120}
          height={48}
          priority
        />
        <Image
          src="/welcome3.gif"
          alt="Welcome"
          width={120}
          height={48}
          priority
        />
        <Image
          src="/welcome6.gif"
          alt="Welcome"
          width={220}
          height={48}
          priority
        />
        {showGifsPopup && (
          <div ref={gifsPopupRef} className="gifs-popup">
            pretty cool, isn't it?
          </div>
        )}
      </div>
      <div>{currentTime}</div>
      <div>
        {currentDate}{' '}
        <span 
          ref={questionMarkRef}
          className="question-mark" 
          onClick={() => setShowPopup(!showPopup)}
        >
          ?
        </span>
        {showPopup && (
          <div ref={popupRef} className="popup">
            yeah, i'm stuck in those years... good old times..
          </div>
        )}
      </div>
    </div>
  );
}
