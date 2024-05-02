"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./Bar.module.css";
import { trackType } from "@/types";
import ProgressBar from "../ProgressBar/ProgressBar";
import classNames from "classnames";
import { durationFormat } from "@/utills/durationFormat";

type BarType = {
  track: trackType;
};

export default function Bar({ track }: BarType) {
  const audioRef = useRef<null | HTMLAudioElement>(null);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);

  const duration = audioRef.current?.duration;
  const [volume, setVolume] = useState<number>(0.5); // Начальная громкость установлена на 50%

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleLoop = () => {
    if (audioRef.current) {
      if (audioRef.current.loop === false) {
        audioRef.current.loop = true;
      } else {
        audioRef.current.loop = false;
      }
      setIsShuffle(!isShuffle);
    }
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setCurrentTime(Number(e.target.value));
      audioRef.current.currentTime = Number(e.target.value);
    }
  };

  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", () =>
      setCurrentTime(audioRef.current!.currentTime)
    );
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.autoplay = true;
      setIsPlaying(true);
    }
  }, [volume]);

  const handleControl = () => {
    alert("Еще не реализовано");
  };

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <audio ref={audioRef} src={track.track_file}></audio>
        <div className={styles.progressBarContainer}>
          <ProgressBar
            max={duration}
            value={currentTime}
            step={0.01}
            onChange={handleSeek}
          />
          <div>
            {durationFormat(currentTime)}
            &nbsp; / &nbsp;
            {durationFormat(duration)}
          </div>
        </div>
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <div className={styles.playerControls}>
              <div onClick={handleControl} className={styles.playerBtnPrev}>
                <svg className={styles.playerBtnPrevSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-prev" />
                </svg>
              </div>
              <div onClick={togglePlay} className={styles.playerBtnPlay}>
                <svg className={styles.playerBtnPlaySvg}>
                  <use
                    xlinkHref={`img/icon/sprite.svg#${
                      isPlaying ? "icon-pause" : "icon-play"
                    }`}
                  />
                </svg>
              </div>
              <div onClick={handleControl} className={styles.playerBtnNext}>
                <svg className={styles.playerBtnNextSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-next" />
                </svg>
              </div>
              <div
                onClick={toggleLoop}
                className={classNames(
                  styles.playerBtnRepeat,
                  isShuffle ? styles.btnIconActive : null
                )}
              >
                <svg className={styles.playerBtnRepeatSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-repeat" />
                </svg>
              </div>
              <div
                onClick={handleControl}
                className={classNames(styles.playerBtnShuffle, styles.btnIcon)}
              >
                <svg className={styles.playerBtnShuffleSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-shuffle" />
                </svg>
              </div>
            </div>
            <div className={styles.playerTrackPlay}>
              <div className={styles.trackPlayContain}>
                <div className={styles.trackPlayImage}>
                  <svg className={styles.trackPlaySvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-note" />
                  </svg>
                </div>
                <div className={styles.trackPlayAuthor}>
                  <span className={styles.trackPlayAuthorLink}>
                    {track.name}
                  </span>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <span className={styles.trackPlayAlbumLink}>
                    {track.author}
                  </span>
                </div>
              </div>
              <div className={styles.trackPlayLikeDis}>
                <div className={styles.trackPlayLike}>
                  <svg className={styles.trackPlayLikeSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-like" />
                  </svg>
                </div>
                <div className={styles.trackPlayDislike}>
                  <svg className={styles.trackPlayDislikeSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-dislike" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.barVolumeBlock}>
            <div className={styles.volumeContent}>
              <div className={styles.volumeImage}>
                <svg className={styles.volumeSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-volume" />
                </svg>
              </div>
              <div className={styles.volumeProgress}>
                <input
                  className={styles.volumeProgressLine}
                  type="range"
                  name="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setVolume(Number(e.target.value))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
