'use client';
import { useState } from 'react';
import DraggableWindow from './DraggableWindow';

export default function UnderConstructionNotice() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <DraggableWindow
      title="Notice"
      onClose={() => setIsVisible(false)}
      className="construction-notice"
    >
      <div className="p-4 bg-black border border-green-500 text-green-500 text-sm">
        🚧 This site is still under construction, but you can still enjoy! 🚧
      </div>
    </DraggableWindow>
  );
}
