import styles from "./Sidebar.module.css";
import SidebarItems from "./SidebarItems/SidebarItems";

export default function Sidebar() {
  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebarPersonal}>
        <p className={styles.sidebarPersonalName}>Sergey.Ivanov</p>
        <div className={styles.sidebarIcon}>
          <svg>
            <use xlinkHref="img/icon/sprite.svg#logout" />
          </svg>
        </div>
      </div>
      <SidebarItems />
    </div>
  );
}
