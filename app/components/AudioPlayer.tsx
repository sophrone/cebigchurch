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

    if (isOpen && audio.src !== audioSrc && !isPlaying) {
      audio.src = audioSrc; // Update source if changed
      audio.load(); // Reload audio with new source
      audio.volume = volume;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error("Playback failed:", error);
          setIsPlaying(false);
        });
    } else if (isOpen && !isPlaying) {
      audio.volume = volume;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error("Playback failed:", error);
          setIsPlaying(false);
        });
    } else if (!isOpen) {
      audio.pause();
      setIsPlaying(false);
    }

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
    };
  }, [isOpen, audioSrc, volume, isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (audio.src !== audioSrc) {
        audio.src = audioSrc;
        audio.load();
      }
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error("Play failed:", error);
          setIsPlaying(false);
        });
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
    console.log("Previous track (placeholder: single episode for now)");
  };

  const next = () => {
    console.log("Next track (placeholder: single episode for now)");
  };

  const handleClose = () => {
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
      <div className={styles.playerContent}>
        <div className={styles.artContainer}>
          <Image
            src={imageSrc}
            alt={title}
            width={50}
            height={50}
            className={styles.artImage}
            onError={(e) => {
              console.error(`Failed to load image: ${imageSrc}`);
              (e.target as HTMLImageElement).src = "/cebc-logo.png";
            }}
          />
          <div className={styles.textContainer}>
            <h3 className={styles.title}>{title}</h3>
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
      <audio ref={audioRef} src={audioSrc} />
    </div>
  );
}