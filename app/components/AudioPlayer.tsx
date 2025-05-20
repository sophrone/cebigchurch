"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./AudioPlayer.module.css";

// Sample playlist (replace with your actual track data)
const playlist = [
  { title: "Drive", audioSrc: "/Drive.mp3", imageSrc: "/image6.jpg" },
  { title: "Walk", audioSrc: "/track2.mp3", imageSrc: "/image7.jpg" },
  { title: "Run", audioSrc: "/track3.mp3", imageSrc: "/image8.jpg" },
];

interface AudioPlayerProps {
  initialTitle: string;
  initialAudioSrc: string;
  initialImageSrc: string;
  onCloseComplete: (title: string) => void;
}

export default function AudioPlayer({ initialTitle, initialAudioSrc, initialImageSrc, onCloseComplete }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const userGestureRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    if (isOpen) {
      audio.src = playlist[currentTrackIndex].audioSrc;
      audio.load();
      if (userGestureRef.current || !isPlaying) {
        setTimeout(() => {
          audio
            .play()
            .then(() => setIsPlaying(true))
            .catch((error) => {
              console.error("Playback failed:", error);
              setIsPlaying(false);
            });
        }, 200); // Increased delay to avoid interrupt
      }
    } else {
      setIsPlaying(false);
    }

    return () => {
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
    };
  }, [isOpen, currentTrackIndex, userGestureRef.current]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    userGestureRef.current = true; // Mark user gesture

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.src = playlist[currentTrackIndex].audioSrc;
      audio.load();
      setTimeout(() => {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.error("Play failed:", error);
            setIsPlaying(false);
          });
      }, 200); // Increased delay to avoid interrupt
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = Number(e.target.value);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newVolume = Number(e.target.value);
      audio.volume = newVolume;
      setVolume(newVolume);
      setIsVolumeVisible(true);
      if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
      volumeTimeoutRef.current = setTimeout(() => setIsVolumeVisible(false), 2000);
    }
  };

  const rewind = () => {
    const audio = audioRef.current;
    if (audio && audio.currentTime >= 10) {
      audio.currentTime -= 10;
      setCurrentTime(audio.currentTime);
    } else if (audio) {
      audio.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const repeat = () => {
    const audio = audioRef.current;
    if (audio && audio.currentTime + 10 <= duration) {
      audio.currentTime += 10;
      setCurrentTime(audio.currentTime);
    }
  };

  const previous = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(false); // Reset playing state for new track
    userGestureRef.current = true; // Allow autoplay after user action
  };

  const next = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(false); // Reset playing state for new track
    userGestureRef.current = true; // Allow autoplay after user action
  };

  const handleClose = () => {
    setIsOpen(false);
    onCloseComplete(playlist[currentTrackIndex].title);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const getVolumeIcon = () => {
    if (volume <= 0) return "🔇";
    if (volume <= 0.33) return "🔈";
    if (volume <= 0.66) return "🔉";
    return "🔊";
  };

  if (!isOpen) return null;

  return (
    <div className={styles.player}>
      <button className={styles.closeButton} onClick={handleClose}>
        ×
      </button>
      <div className={styles.playerContent}>
        <div className={styles.artContainer}>
          <Image
            src={playlist[currentTrackIndex].imageSrc}
            alt={playlist[currentTrackIndex].title}
            width={50}
            height={50}
            className={styles.artImage}
            onError={(e) => {
              console.error(`Failed to load image: ${playlist[currentTrackIndex].imageSrc}`);
              (e.target as HTMLImageElement).src = "/cebc-logo.png";
            }}
          />
          <div className={styles.textContainer}>
            <h3 className={styles.title}>{playlist[currentTrackIndex].title}</h3>
            <p className={styles.singer}>CEBC Sermon</p>
          </div>
        </div>
        <div className={styles.progressWave}>
          <div className={styles.progressContainer}>
            <span className={styles.time}>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleProgressChange}
              className={styles.progressBar}
            />
            <span className={styles.time}>{formatTime(duration)}</span>
          </div>
        </div>
        <div className={styles.controlButtons}>
          <button className={styles.controlButton} onClick={rewind}>
            ↺
          </button>
          <button className={styles.controlButton} onClick={previous}>
            ◄
          </button>
          <button className={styles.controlButton} onClick={togglePlay}>
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button className={styles.controlButton} onClick={next}>
            ►
          </button>
          <button className={styles.controlButton} onClick={repeat}>
            ↻
          </button>
          <button
            className={styles.controlButton}
            onClick={() => setIsVolumeVisible(!isVolumeVisible)}
          >
            {getVolumeIcon()}
          </button>
          {isVolumeVisible && (
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className={styles.volumeBar}
            />
          )}
        </div>
      </div>
      <audio ref={audioRef} />
    </div>
  );
}