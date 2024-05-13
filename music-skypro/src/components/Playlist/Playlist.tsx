import classnames from "classnames";
import styles from "./Playlist.module.css";
import Track from "@/components/Track/Track";
import { getTracks } from "@/api/tracks";
import { trackType } from "@/types";

export default async function Playlist() {
  let tracksData: trackType[];
  try {
    tracksData = await getTracks();
  } catch (error: any) {
    throw new Error(error.message);
  }

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
          <Track track={trackData} tracksData={tracksData} key={trackData.id} />
        ))}
      </div>
    </div>
  );
}
