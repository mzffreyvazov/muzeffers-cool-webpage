'use client'
import { useRef, useState, useEffect } from 'react'
import { Heart, Share2, ChevronDown } from 'lucide-react'
import { loginUrl } from '@/lib/spotify'
import { AudioVisualizer } from './AudioVisualizer'
/// <reference types="spotify-web-playback-sdk" />

declare global {
  interface Window {
    Spotify: typeof Spotify;
  }
}

interface MusicPlayerProps {
  isOpen: boolean
  onClose: () => void
}

interface PlaylistType {
  id: string;
  name: string;
  uri: string;
}

interface SpotifyPlayer {
  _options: { 
    name: string;
    getOAuthToken: (cb: (token: string) => void) => void;
  };
  connect: () => Promise<boolean>;
  disconnect: () => void;
  addListener: (event: string, callback: (data: any) => void) => void;
  removeListener: (event: string, callback: (data: any) => void) => void;
  getCurrentState: () => Promise<any>;
  setVolume: (volume: number) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  togglePlay: () => Promise<void>;
  seek: (position_ms: number) => Promise<void>;
  previousTrack: () => Promise<void>;
  nextTrack: () => Promise<void>;
}

interface SpotifyTrackWindow {
  current_track: {
    name: string;
    artists: { name: string }[];
    uri: string;
  };
}

interface SpotifyPlaylistOwner {
  id: string;
}

interface SpotifyEventData {
  message: string;
  device_id?: string;
}

interface SpotifyAPIPlaylistResponse {
  items: {
    id: string;
    name: string;
    uri: string;
    owner: {
      id: string;
    };
  }[];
}

export default function MusicPlayer({ isOpen, onClose }: MusicPlayerProps) {
  const [position, setPosition] = useState({ x: 300, y: 200 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const playerRef = useRef<HTMLDivElement>(null)

  const [token, setToken] = useState<string | null>(null)
  const [player, setPlayer] = useState<SpotifyPlayer | null>(null)
  const [deviceId, setDeviceId] = useState<string>('')
  const [isPaused, setIsPaused] = useState(true)
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrackWindow['current_track'] | null>(null)
  const [volume, setVolume] = useState(50)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playlists, setPlaylists] = useState<PlaylistType[]>([])
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('liked') // 'liked' for liked songs
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false)

  const fetchPlaylists = async () => {
    const storedToken = localStorage.getItem('spotify_token')
    if (!storedToken) return

    try {
      // First fetch user profile to get user ID
      const userResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      })

      if (!userResponse.ok) throw new Error('Failed to fetch user profile')
      const userData = await userResponse.json()
      const userId = userData.id

      // Then fetch playlists
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const data = (await response.json()) as SpotifyAPIPlaylistResponse
      
      // Filter playlists to only include those owned by the user
      const userPlaylists = data.items
        .filter((playlist) => playlist.owner.id === userId)
        .map((item) => ({
          id: item.id,
          name: item.name,
          uri: item.uri
        }))

      setPlaylists(userPlaylists)
    } catch (error: unknown) {
      const err = error as Error
      console.error('Error fetching playlists:', err)
    }
  }

  const playRandomTrack = async () => {
    if (!deviceId) {
      console.error('No device ID available');
      return;
    }

    const token = localStorage.getItem('spotify_token');
    if (!token) return;

    try {
      // Set this device as active
      await fetch('https://api.spotify.com/v1/me/player', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_ids: [deviceId],
        })
      });

      let tracksEndpoint;
      if (selectedPlaylist === 'liked') {
        tracksEndpoint = `https://api.spotify.com/v1/me/tracks?limit=50&offset=${Math.floor(Math.random() * 50)}`;
      } else {
        tracksEndpoint = `https://api.spotify.com/v1/playlists/${selectedPlaylist}/tracks?limit=50&offset=${Math.floor(Math.random() * 50)}`;
      }

      const response = await fetch(tracksEndpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to fetch tracks');

      const data = await response.json();
      if (!data?.items?.length) throw new Error('No tracks found');

      // Get random track (handle both playlist and liked songs formats)
      const randomTrack = data.items[Math.floor(Math.random() * data.items.length)];
      const trackUri = selectedPlaylist === 'liked' ? randomTrack.track.uri : randomTrack.track.uri;

      // Play the selected track
      const playResponse = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: [trackUri]
        })
      });

      if (!playResponse.ok && playResponse.status !== 204) {
        const errorData = await playResponse.json();
        throw new Error(`Play failed: ${errorData?.error?.message || playResponse.status}`);
      }

      // Set the audio reference to the current track
      audioRef.current = new Audio(randomTrack.preview_url); // Assuming you have a preview URL
      audioRef.current.play();

    } catch (error: unknown) {
      const err = error as Error
      console.error('Detailed error:', err);
      
      if (err.message.includes('401')) {
        alert('Session expired. Please reconnect to Spotify.');
        localStorage.removeItem('spotify_token');
        setToken(null);
      } else {
        alert(`Playback error: ${err.message}. Please try again.`);
      }
    }
  }

  const handleNextTrack = async () => {
    if (!deviceId) return
    await playRandomTrack()
  }

  const initializePlayer = async () => {
    const token = localStorage.getItem('spotify_token')
    if (!token) return

    try {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(token) }
      }) as unknown as SpotifyPlayer;  // Type assertion here

      // Error handling
      player.addListener('initialization_error', (data: SpotifyEventData) => {
        console.error('Failed to initialize:', data.message)
      })
      player.addListener('authentication_error', (data: SpotifyEventData) => {
        console.error('Failed to authenticate:', data.message)
        localStorage.removeItem('spotify_token')
        setToken(null)
      })
      player.addListener('account_error', (data: SpotifyEventData) => {
        console.error('Failed to validate Spotify account:', data.message)
      })

      // Ready handling
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
        setDeviceId(device_id)
      })

      // Playback status updates
      player.addListener('player_state_changed', state => {
        if (state) {
          setCurrentTrack(state.track_window.current_track)
          setIsPaused(state.paused)
        }
      })

      const connected = await player.connect()
      if (connected) {
        console.log('Successfully connected to Spotify')
        setPlayer(player)
      }
    } catch (error) {
      console.error('Failed to initialize player:', error)
    }
  }

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token'))?.split('=')[1]
      if (token) {
        setToken(token)
        window.location.hash = ''
        localStorage.setItem('spotify_token', token)
      }
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('spotify_token')
    if (token) {
      fetchPlaylists()
      if (window.Spotify) {
        initializePlayer()
      } else {
        window.onSpotifyWebPlaybackSDKReady = initializePlayer
      }
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    // Add global event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]); // Add dependencies

  useEffect(() => {
    // Debug log for player state
    console.log('Player state:', {
      isPlaying: !isPaused,
      currentTrack: currentTrack?.name,
      deviceId,
      playerInitialized: !!player
    })
  }, [isPaused, currentTrack, deviceId, player])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleLogin = () => {
    window.location.href = loginUrl
  }

  const handlePlayPause = async () => {
    if (!player) {
      console.error('Player not initialized')
      return
    }
    
    try {
      if (isPaused) {
        if (!currentTrack) {
          await playRandomTrack()
        } else {
          await player.resume()
        }
      } else {
        await player.pause()
      }
    } catch (error) {
      console.error('Error toggling playback:', error)
    }
  }

  const handleVolumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value)
    setVolume(newVolume)
    
    if (player) {
      try {
        await player.setVolume(newVolume / 100)
      } catch (error) {
        console.error('Error setting volume:', error)
      }
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (playerRef.current && e.target instanceof Element) {
      const titleBar = e.target.closest('.player-title');
      if (titleBar && !e.target.closest('.close-button')) {
        setIsDragging(true);
        const rect = playerRef.current.getBoundingClientRect();
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
        e.preventDefault(); // Prevent text selection while dragging
      }
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={playerRef}
      className="music-player"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        userSelect: 'none' // Prevent text selection while dragging
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="player-title">
        <div className="text-[10px]">muzefferin spotifyi</div>
        <button className="close-button text-xs" onClick={onClose}>×</button>
      </div>

      {!localStorage.getItem('spotify_token') ? (
        <div className="flex justify-center p-2">
          <button 
            onClick={handleLogin}
            className="border border-black px-2 py-1 text-[10px] hover:bg-[var(--button-hover)]"
          >
            Connect to Spotify
          </button>
        </div>
      ) : (
        <>
          <div className="playlist-selector relative border-b border-black">
            <button 
              className="w-full px-2 py-1 text-[10px] flex items-center justify-between"
              onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
            >
              <span>
                {selectedPlaylist === 'liked' 
                  ? 'Liked Songs' 
                  : playlists.find(p => p.id === selectedPlaylist)?.name || 'Select Playlist'}
              </span>
              <ChevronDown className="w-3 h-3" />
            </button>
            
            {showPlaylistMenu && (
              <div className="absolute top-full left-0 w-full bg-[var(--window-bg)] border border-black z-10">
                <button 
                  className="w-full px-2 py-1 text-[10px] text-left hover:bg-[var(--button-hover)] border-b border-black"
                  onClick={() => {
                    setSelectedPlaylist('liked')
                    setShowPlaylistMenu(false)
                  }}
                >
                  Liked Songs
                </button>
                {playlists.map(playlist => (
                  <button 
                    key={playlist.id}
                    className="w-full px-2 py-1 text-[10px] text-left hover:bg-[var(--button-hover)]"
                    onClick={() => {
                      setSelectedPlaylist(playlist.id)
                      setShowPlaylistMenu(false)
                    }}
                  >
                    {playlist.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <AudioVisualizer 
              isPlaying={!isPaused} 
            />
          </div>
          
          <div className="track-info">
            {currentTrack ? (
              <>
                <div className="font-bold truncate">{currentTrack.name}</div>
                <div className="text-[8px] truncate">{currentTrack.artists[0].name}</div>
              </>
            ) : (
              <div className="text-[10px]">Click play for random track</div>
            )}
          </div>

          <div className="volume-control">
            <div className="flex items-center gap-1">
              <span className="text-[8px]">−</span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-[1px]"
              />
              <span className="text-[8px]">+</span>
            </div>
          </div>

          <div className="player-controls">
            <div className="flex gap-1">
              <button 
                className="control-button text-[10px]" 
                onClick={() => player?.previousTrack()}
                disabled={!currentTrack}
              >⏮</button>
              <button 
                className="control-button text-[10px]" 
                onClick={handlePlayPause}
              >
                {isPaused ? '▶' : '⏸'}
              </button>
              <button 
                className="control-button text-[10px]" 
                onClick={handleNextTrack}
                disabled={!deviceId}
              >⏭</button>
            </div>
            <div className="flex gap-1">
              <button className="control-button">
                <Heart className="w-3 h-3" />
              </button>
              <button className="control-button">
                <Share2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
