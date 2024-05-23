"use client";

import classnames from "classnames";
import styles from "./Playlist.module.css";
import Track from "@/components/Track/Track";
import { trackType } from "@/types";

import Filters from "../Filters/Filters";

export default function Playlist({
  tracks,
  playlist,
}: {
  tracks: trackType[];
  playlist: trackType[];
}) {
  return (
    <div className={styles.centerblockContent}>
      <Filters />
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
          <Track track={trackData} tracksData={playlist} key={trackData.id} />
        ))}
      </div>
    </div>
  );
}
