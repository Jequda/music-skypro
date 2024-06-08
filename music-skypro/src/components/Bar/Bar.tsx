"use client";

import {
  ChangeEvent,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Bar.module.css";
import ProgressBar from "../ProgressBar/ProgressBar";
import classNames from "classnames";
import { durationFormat } from "@/utills/durationFormat";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  setIsPlaying,
  setIsShaffle,
  nextTrack,
  prevTrack,
} from "@/store/features/PlaylistSlice";
import { useUser } from "@/hooks/useUser";
import {
  deleteFavoriteTracks,
  postFavoriteTracks,
  refreshToken,
} from "@/api/tracks";

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const dispatch = useAppDispatch();

  const audioRef = useRef<null | HTMLAudioElement>(null);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const isShuffle = useAppSelector((state) => state.playlist.isShuffle);
  let duration = 0;
  const { user, token } = useUser();
  const isLikedByUser = !!currentTrack?.stared_user.find(
    (arg) => arg.id === user?.id
  );

  if (audioRef.current?.duration) {
    duration = audioRef.current?.duration;
  }

  const [isLiked, setIsLiked] = useState<any>();

  const [volume, setVolume] = useState<number>(0.5); // Начальная громкость установлена на 50%

  const togglePlay = () => {
    if (audioRef.current) {
      dispatch(setIsPlaying(!isPlaying));
    }
  };

  const toggleLoop = () => {
    if (audioRef.current) {
      if (isLooping) {
        audioRef.current.loop = false;
      } else {
        audioRef.current.loop = true;
      }
      setIsLooping((prev) => !prev);
    }
  };

  const handleSeek = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setCurrentTime(Number(e.target.value));
      audioRef.current.currentTime = Number(e.target.value);
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const ref = audioRef.current;
    ref?.addEventListener("ended", handleNextTrack);
    return () => {
      ref?.removeEventListener("ended", handleNextTrack);
    };
  }, [audioRef.current]);

  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", () =>
      setCurrentTime(audioRef.current!.currentTime)
    );
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.autoplay = true;
    }
  }, [volume, currentTrack]);

  const handleShaffleTrack = () => {
    console.log(isShuffle);
    if (isShuffle) {
      dispatch(setIsShaffle(false));
    } else {
      dispatch(setIsShaffle(true));
    }
  };

  const handleNextTrack = () => {
    dispatch(nextTrack());
    dispatch(setIsPlaying(true));
  };

  const handlePrevTrack = () => {
    dispatch(prevTrack());
  };

  const handleLikeTrack = () => {
    if (user?.email) {
      if (!isLiked) {
        postFavoriteTracks(currentTrack?.id!, token?.access!).catch((error) => {
          if (error.message === "401" && user) {
            refreshToken(token?.refresh!).then((data) => {
              postFavoriteTracks(currentTrack?.id!, data.access);
            });
          }
          setIsLiked(!isLiked);
        });
      } else {
        deleteFavoriteTracks(currentTrack?.id!, token?.access!).catch(
          (error) => {
            if (error.message === "401" && user) {
              refreshToken(token?.refresh!).then((data) => {
                deleteFavoriteTracks(currentTrack?.id!, data.access);
              });
            }
          }
        );
      }
    } else {
      alert("Для добавления трека, пожалуйста авторизуйтесь");
    }
  };

  return (
    <>
      {currentTrack && (
        <div className={styles.bar}>
          <div className={styles.barContent}>
            <audio ref={audioRef} src={currentTrack.track_file}></audio>
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
                  <div
                    onClick={handlePrevTrack}
                    className={styles.playerBtnPrev}
                  >
                    <svg className={styles.playerBtnPrevSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-prev" />
                    </svg>
                  </div>
                  <div onClick={togglePlay} className={styles.playerBtnPlay}>
                    <svg className={styles.playerBtnPlaySvg}>
                      <use
                        xlinkHref={`/img/icon/sprite.svg#${
                          isPlaying ? "icon-pause" : "icon-play"
                        }`}
                      />
                    </svg>
                  </div>
                  <div
                    onClick={handleNextTrack}
                    className={styles.playerBtnNext}
                  >
                    <svg className={styles.playerBtnNextSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-next" />
                    </svg>
                  </div>
                  <div
                    onClick={toggleLoop}
                    className={classNames(
                      styles.playerBtnRepeat,
                      isLooping ? styles.btnIconActive : null
                    )}
                  >
                    <svg className={styles.playerBtnRepeatSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-repeat" />
                    </svg>
                  </div>
                  <div
                    onClick={handleShaffleTrack}
                    className={classNames(
                      styles.playerBtnShuffle,
                      isShuffle ? styles.btnIconActive : null
                    )}
                  >
                    <svg className={styles.playerBtnShuffleSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-shuffle" />
                    </svg>
                  </div>
                </div>
                <div className={styles.playerTrackPlay}>
                  <div className={styles.trackPlayContain}>
                    <div className={styles.trackPlayImage}>
                      <svg className={styles.trackPlaySvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-note" />
                      </svg>
                    </div>
                    <div className={styles.trackPlayAuthor}>
                      <span className={styles.trackPlayAuthorLink}>
                        {currentTrack.name}
                      </span>
                    </div>
                    <div className={styles.trackPlayAlbum}>
                      <span className={styles.trackPlayAlbumLink}>
                        {currentTrack.author}
                      </span>
                    </div>
                  </div>
                  <div className={styles.trackPlayLikeDis}>
                    <div className={styles.trackPlayLike}>
                      <svg
                        onClick={handleLikeTrack}
                        className={classNames(
                          styles.trackPlayLikeSvg,
                          isLikedByUser ? styles.activeLike : null
                        )}
                      >
                        <use xlinkHref="/img/icon/sprite.svg#icon-like" />
                      </svg>
                    </div>
                    <div className={styles.trackPlayDislike}>
                      <svg className={styles.trackPlayDislikeSvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-dislike" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.barVolumeBlock}>
                <div className={styles.volumeContent}>
                  <div className={styles.volumeImage}>
                    <svg className={styles.volumeSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-volume" />
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
      )}
    </>
  );
}
