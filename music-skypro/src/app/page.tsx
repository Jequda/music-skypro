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
          <Nav></Nav>
          <div className={styles.mainCenterblock}>
            <Search></Search>
            <h2 className={styles.centerblockH2}>Треки</h2>
            <Filters></Filters>
            <Playlist></Playlist>
          </div>
          <Sidebar></Sidebar>
        </main>
        <Bar></Bar>
        <footer className="footer" />
      </div>
    </div>
  );
}
