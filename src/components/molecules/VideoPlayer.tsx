'use client';

import { useRef, useState, useEffect } from 'react';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { Play, Pause, Volume2, VolumeX, Maximize, Captions } from 'lucide-react';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  src: string;
  locale?: string;
  onEnded?: () => void;
}

export default function VideoPlayer({ src, locale = 'en', onEnded }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [currentCaption, setCurrentCaption] = useState('');
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const setCurrentSubtitle = useAssessmentStore((state) => state.setCurrentSubtitle);
  const showSubtitles = useAssessmentStore((state) => state.showSubtitles);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onEnded]);

  useEffect(() => {
    if (showCaptions && showSubtitles && currentCaption) {
      setCurrentSubtitle(currentCaption);
    } else {
      setCurrentSubtitle('');
    }
  }, [currentCaption, showCaptions, showSubtitles, setCurrentSubtitle]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('Video playback failed:', err);
        }
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleCaptions = () => {
    setShowCaptions(!showCaptions);
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={src}
        className="w-full aspect-video"
        onClick={togglePlay}
        playsInline
      >
        <track
          kind="captions"
          srcLang={locale}
          src={`/captions/${locale}.vtt`}
          label={locale.toUpperCase()}
          default={showCaptions}
        />
        Your browser does not support the video tag.
      </video>

      {/* Controls overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
      >
        {/* Progress bar */}
        <div className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer">
          <div 
            className="h-full bg-[#C5A880] rounded-full relative"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#C5A880] rounded-full" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="text-white hover:text-[#C5A880] transition-colors">
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            <button onClick={toggleMute} className="text-white hover:text-[#C5A880] transition-colors">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleCaptions} 
              className={`transition-colors ${showCaptions ? 'text-[#C5A880]' : 'text-white'}`}
            >
              <Captions size={20} />
            </button>
            
            <button onClick={handleFullscreen} className="text-white hover:text-[#C5A880] transition-colors">
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
