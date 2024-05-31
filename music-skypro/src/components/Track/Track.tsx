"use client";

import { durationFormat } from "@/utills/durationFormat";
import styles from "./Track.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { trackType } from "@/types";
import { setCurrentTrack } from "@/store/features/PlaylistSlice";
import classNames from "classnames";
import { useState } from "react";
import { deleteFavoriteTracks, postFavoriteTracks } from "@/api/tracks";
import { useUser } from "@/hooks/useUser";

type TrackType = {
  track: trackType;
  tracksData: trackType[];
  isFavorite?: boolean;
};

export default function Track({ track, tracksData, isFavorite }: TrackType) {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const { name, author, album, duration_in_seconds, id } = track;
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
  const dispatch = useAppDispatch();
  const isCurrentTrack = currentTrack ? currentTrack.id === id : false;
  const { user, token }: any = useUser(); // не знаю какой тип тут написать
  const isLikedByUser =
    isFavorite || !!track.stared_user.find((arg) => arg.id === user?.id);
  const [isLiked, setIsLiked] = useState(isLikedByUser);

  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ track, tracksData }));
  };

  const handleLikeTrack = () => {
    // const isLiked = !!track.stared_user.find((arg) => arg.id === user.id);
    if (!isLiked) {
      postFavoriteTracks(track.id, token?.access);
      setIsLiked((prev) => !prev);
    } else {
      deleteFavoriteTracks(track.id, token?.access);
      setIsLiked((prev) => !prev);
    }
  };

  return (
    <div onClick={handleTrackClick} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            {isCurrentTrack ? (
              <div
                className={classNames(styles.animationDot, {
                  [styles.trackIconIsplaying]: isPlaying,
                })}
              ></div>
            ) : (
              <svg className={classNames(styles.trackTitleSvg)}>
                <use
                  xlinkHref={`/img/icon/sprite.svg#icon-note
              `}
                />
              </svg>
            )}
          </div>
          <div className="track__title-text">
            <span className={styles.trackTitleLink}>
              {name} <span className={styles.trackTitleSpan} />
            </span>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink}>{author}</span>
        </div>
        <div className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink}>{album}</span>
        </div>
        <div className="track__time">
          <svg className={styles.trackTimeSvg}>
            <use
              className={classNames(
                styles.likeButton,
                isLiked && styles.activeLike
              )}
              onClick={handleLikeTrack}
              xlinkHref="/img/icon/sprite.svg#icon-like"
            />
          </svg>
          <span className={styles.trackTimeText}>
            {durationFormat(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
