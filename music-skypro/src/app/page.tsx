import styles from "./page.module.css";
import Track from "@/components/Track/Track";
import Bar from "@/components/Bar/Bar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Nav from "@/components/Nav/Nav";
import Search from "@/components/Search/Search";
import classnames from "classnames";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav></Nav>
          <div className={styles.mainCenterblock}>
            <Search></Search>
            <h2 className={styles.centerblockH2}>Треки</h2>
            <div className={styles.centerblockFilter}>
              <div className={styles.filterTitle}>Искать по:</div>
              <div className={classnames(styles.filterButton, styles.BtnText)}>
                исполнителю
              </div>
              <div className={classnames(styles.filterButton, styles.BtnText)}>
                году выпуска
              </div>
              <div className={classnames(styles.filterButton, styles.BtnText)}>
                жанру
              </div>
            </div>
            <div className={styles.centerblockContent}>
              <div className={styles.contentTitle}>
                <div
                  className={classnames(styles.playlistTitleCol, styles.col01)}
                >
                  Трек
                </div>
                <div
                  className={classnames(styles.playlistTitleCol, styles.col02)}
                >
                  Исполнитель
                </div>
                <div
                  className={classnames(styles.playlistTitleCol, styles.col03)}
                >
                  Альбом
                </div>
                <div
                  className={classnames(styles.playlistTitleCol, styles.col04)}
                >
                  <svg className={styles.playlistTitleSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-watch" />
                  </svg>
                </div>
              </div>
              <div className={styles.contentPlaylist}>
                <Track></Track>
              </div>
            </div>
          </div>
          <Sidebar></Sidebar>
        </main>
        <Bar></Bar>
        <footer className="footer" />
      </div>
    </div>
  );
}
