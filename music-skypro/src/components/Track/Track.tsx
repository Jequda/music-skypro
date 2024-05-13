"use client";

import { durationFormat } from "@/utills/durationFormat";
import styles from "./Track.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { trackType } from "@/types";
import { setCurrentTrack } from "@/store/features/PlaylistSlice";
import classNames from "classnames";

type TrackType = {
  track: trackType;
  tracksData: trackType[];
};

export default function Track({ track, tracksData }: TrackType) {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const { name, author, album, duration_in_seconds, id } = track;
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
  const dispatch = useAppDispatch();
  const isCurrentTrack = currentTrack ? currentTrack.id === id : false;

  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ track, tracksData }));
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
                  xlinkHref={`img/icon/sprite.svg#icon-note
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
            <use xlinkHref="img/icon/sprite.svg#icon-like" />
          </svg>
          <span className={styles.trackTimeText}>
            {durationFormat(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
