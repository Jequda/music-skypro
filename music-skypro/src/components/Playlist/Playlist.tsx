"use client";

import classnames from "classnames";
import styles from "./Playlist.module.css";
import Track from "@/components/Track/Track";
import { trackType } from "@/types";

export default function Playlist({
  tracks,
  playlist,
  isFavorite,
}: {
  tracks: trackType[];
  playlist: trackType[];
  isFavorite?: boolean;
}) {
  return (
    <div className={styles.centerblockContent}>
      <div className={styles.contentTitle}>
        <div className={classnames(styles.playlistTitleCol, styles.col01)}>
          Трек
        </div>
        <div className={classnames(styles.playlistTitleCol, styles.col02)}>
          Исполнитель
        </div>
        <div className={classnames(styles.playlistTitleCol, styles.col03)}>
          Альбом
        </div>
        <div className={classnames(styles.playlistTitleCol, styles.col04)}>
          <svg className={styles.playlistTitleSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-watch" />
          </svg>
        </div>
      </div>
      <div className={styles.contentPlaylist}>
        {tracks?.map((trackData) => (
          <Track
            track={trackData}
            tracksData={playlist}
            key={trackData.id}
            isFavorite={isFavorite}
          />
        ))}
      </div>
    </div>
  );
}
