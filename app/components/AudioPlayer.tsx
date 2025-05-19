"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./AudioPlayer.module.css";

interface AudioPlayerProps {
  title: string;
  audioSrc: string;
  onCloseComplete: (title: string) => void;
}

export default function AudioPlayer({ title, audioSrc, onCloseComplete }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolumeLabel, setShowVolumeLabel] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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
      audio.play().then(() => setIsPlaying(true)).catch((error) => {
        console.error("Auto-play failed:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
      setIsPlaying(false);
    }

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
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
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newVolume = Number(e.target.value);
      audio.volume = newVolume;
      setVolume(newVolume);
      setShowVolumeLabel(true);
      console.log(`Volume changed to: ${Math.round(newVolume * 100)}%`);
      setTimeout(() => setShowVolumeLabel(false), 1000);
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
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.waveform}>
        <div className={`${styles.waveBar} ${isPlaying ? styles.wavePulse : ""}`} />
        <div className={`${styles.waveBar} ${isPlaying ? styles.wavePulse : ""}`} />
        <div className={`${styles.waveBar} ${isPlaying ? styles.wavePulse : ""}`} />
        <div className={`${styles.waveBar} ${isPlaying ? styles.wavePulse : ""} ${styles.desktopOnly}`} />
      </div>
      <audio ref={audioRef} src={audioSrc} />
      <div className={styles.controls}>
        <button
          className={styles.playButton}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
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
        <div className={styles.volumeContainer}>
          <span className={`${styles.volumeIcon} ${showVolumeLabel ? styles.pulse : ""}`}>
            {getVolumeIcon()}
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className={styles.volumeBar}
          />
          {showVolumeLabel && (
            <span className={styles.volumeLabel}>{Math.round(volume * 100)}</span>
          )}
        </div>
      </div>
    </div>
  );
}