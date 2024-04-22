import classnames from "classnames";
import styles from "./Playlist.module.css";
import Track from "@/components/Track/Track";
import { getTracks } from "@/api/tracks";
import { trackType } from "@/types";

export default async function Playlist() {
  // let tracksData: trackType[];

  // try {
  //   tracksData = await getTracks();
  // } catch (error: any) {
  //   throw new Error(error.message);
  // }
  const tracksData: trackType[] = await getTracks();

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
            key={trackData.id}
            name={trackData.name}
            autor={trackData.autor}
            album={trackData.album}
          />
        ))}
      </div>
    </div>
  );
}
