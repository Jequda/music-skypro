import classnames from "classnames";
import styles from "./Playlist.module.css";
import Track from "@/components/Track/Track";
import { getTracks } from "@/api/tracks";
import { trackType } from "@/types";
import { useEffect, useState } from "react";
import { error } from "console";

type PlaylistType = {
  setTrack: (param: trackType) => void;
};

export default function Playlist({ setTrack }: PlaylistType) {
  // let tracksData: trackType[];

  // try {
  //   tracksData = await getTracks();
  // } catch (error: any) {
  //   throw new Error(error.message);
  // }

  const [tracksData, setTracksData] = useState<trackType[]>([]);
  useEffect(() => {
    getTracks()
      .then((data: trackType[]) => setTracksData(data))
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }, []);

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
            <use xlinkHref="img/icon/sprite.svg#icon-watch" />
          </svg>
        </div>
      </div>
      <div className={styles.contentPlaylist}>
        {tracksData.map((trackData) => (
          <Track
            onClick={() => setTrack(trackData)}
            key={trackData.id}
            name={trackData.name}
            author={trackData.author}
            album={trackData.album}
          />
        ))}
      </div>
    </div>
  );
}
