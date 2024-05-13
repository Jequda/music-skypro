import styles from "./page.module.css";
import Bar from "@/components/Bar/Bar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Nav from "@/components/Nav/Nav";
import Search from "@/components/Search/Search";
import Filters from "@/components/Filters/Filters";
import Playlist from "@/components/Playlist/Playlist";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.mainCenterblock}>
            <Search />
            <h2 className={styles.centerblockH2}>Треки</h2>
            <Filters />
            <Playlist />
          </div>
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer" />
      </div>
    </div>
  );
}
