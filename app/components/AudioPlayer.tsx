"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./AudioPlayer.module.css";

interface AudioPlayerProps {
  title: string;
  audioSrc: string;
  imageSrc: string;
  onCloseComplete: (title: string) => void;
}

export default function AudioPlayer({ title, audioSrc, imageSrc, onCloseComplete }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      // Fallback for auto-play blocked by browser
      audio.play().catch((error) => {
        console.warn("Auto-play blocked by browser:", error);
        setIsPlaying(false); // Ensure play button is required
      });
    } else {
      audio.pause();
      setIsPlaying(false);
    }

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
    };
  }, [isOpen, audioSrc]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch((error) => console.error("Play failed:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = Number(e.target.value);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
      console.log(`Progress changed to: ${newTime}s`);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newVolume = Number(e.target.value);
      audio.volume = newVolume;
      setVolume(newVolume);
      setIsVolumeVisible(true);
      console.log(`Volume changed to: ${Math.round(newVolume * 100)}%`);
      if (volumeTimeoutRef.current) {
        clearTimeout(volumeTimeoutRef.current);
      }
      volumeTimeoutRef.current = setTimeout(() => {
        setIsVolumeVisible(false);
      }, 2000);
    }
  };

  const handleClose = () => {
    console.log(`Closing player for: ${title}`);
    setIsOpen(false);
    onCloseComplete(title);
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
      <div className={styles.controls}>
        <div className={styles.artContainer}>
          <Image
            src={imageSrc}
            alt={title}
            width={100}
            height={100}
            className={styles.artImage}
            onError={(e) => {
              console.error(`Failed to load image: ${imageSrc}`);
              (e.target as HTMLImageElement).src = "/cebc-logo.png"; // Fallback
            }}
          />
          <h3 className={styles.title}>{title}</h3>
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
              className={`${styles.progressBar} ${isVolumeVisible ? styles.active : ""}`}
            />
            <span className={styles.time}>{formatTime(duration)}</span>
          </div>
          <div className={`${styles.waveContainer} ${isPlaying ? styles.wavePulse : ""}`}>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={styles.waveBar}
                style={{ height: `${4 + Math.random() * 8}px` }}
              />
            ))}
          </div>
        </div>
        <div className={styles.controlButtons}>
          <button
            className={styles.playButton}
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <div className={styles.volumeContainer}>
            <span className={`${styles.volumeIcon} ${isVolumeVisible ? styles.pulse : ""}`}>
              {getVolumeIcon()}
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className={`${styles.volumeBar} ${isVolumeVisible ? styles.active : ""}`}
            />
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={audioSrc} />
    </div>
  );
}