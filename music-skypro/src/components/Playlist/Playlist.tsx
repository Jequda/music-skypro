"use client";

import classnames from "classnames";
import styles from "./Playlist.module.css";
import Track from "@/components/Track/Track";
import { getTracks } from "@/api/tracks";
import { trackType } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setInitialTracks } from "@/store/features/PlaylistSlice";
import { useEffect, useState } from "react";
import Filters from "../Filters/Filters";

export default function Playlist() {
  const dispatch = useAppDispatch();
  const [tracks, setTracks] = useState<trackType[]>([]);
  const filteredTracks = useAppSelector(
    (state) => state.playlist.filteredTracks
  );

  let tracksData: trackType[];

  useEffect(() => {
    getTracks().then((tracksData) => {
      setTracks(tracksData);
      dispatch(setInitialTracks({ initialTracks: tracksData }));
    });
  }, [dispatch]);

  return (
    <div className={styles.centerblockContent}>
      <Filters tracksData={tracks} />
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
            <use xlinkHref="img/icon/sprite.svg#icon-watch" />
          </svg>
        </div>
      </div>
      <div className={styles.contentPlaylist}>
        {filteredTracks.map((trackData) => (
          <Track track={trackData} tracksData={tracks} key={trackData.id} />
        ))}
      </div>
    </div>
  );
}
