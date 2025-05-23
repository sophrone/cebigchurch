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
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasPlayedRef = useRef(false);
  const previousAudioSrcRef = useRef<string | null>(null);

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

    // Check if the audio source has changed (new track)
    if (isOpen) {
      if (audioSrc !== previousAudioSrcRef.current) {
        audio.src = audioSrc;
        audio.load();
        setCurrentTime(0); // Reset time for new track
        hasPlayedRef.current = false; // Allow playback for new track
        previousAudioSrcRef.current = audioSrc;
      }

      if (!hasPlayedRef.current) {
        setTimeout(() => {
          audio
            .play()
            .then(() => {
              setIsPlaying(true);
              hasPlayedRef.current = true;
            })
            .catch((error) => {
              console.error("Initial playback failed:", error);
              setIsPlaying(false);
            });
        }, 200);
      }
    }

    if (!isOpen) {
      audio.pause();
      setIsPlaying(false);
      hasPlayedRef.current = false; // Reset for next open
    }

    return () => {
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, [isOpen, audioSrc]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setTimeout(() => {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.error("Play failed:", error);
            setIsPlaying(false);
          });
      }, 200);
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

  const handleClose = () => {
    setIsOpen(false);
    onCloseComplete(title);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
            width={60}
            height={60}
            className={styles.artImage}
            onError={(e) => {
              console.error(`Failed to load image: ${imageSrc}`);
              (e.target as HTMLImageElement).src = "/cebc-logo.png";
            }}
          />
          <div className={styles.textContainer}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.singer}>Pastor Trusouth</p>
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
          <button className={styles.controlButton} onClick={togglePlay}>
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button className={styles.controlButton} onClick={repeat}>
            ↻
          </button>
        </div>
      </div>
      <audio ref={audioRef} />
    </div>
  );
}