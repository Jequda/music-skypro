import { durationFormat } from "@/utills/durationFormat";
import styles from "./Track.module.css";

type TrackType = {
  name: string;
  author: string;
  album: string;
  duration: number;
  onClick: () => void;
};

export default function Track({
  name,
  author,
  album,
  onClick,
  duration,
}: TrackType) {
  return (
    <div onClick={onClick} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-note" />
            </svg>
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
            {durationFormat(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
