"use client";

import { useUser } from "@/hooks/useUser";
import styles from "./Sidebar.module.css";
import SidebarItems from "./SidebarItems/SidebarItems";

export default function Sidebar() {
  const { user, logout }: any = useUser(); // не знаю какой тип тут написать

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebarPersonal}>
        <p className={styles.sidebarPersonalName}>{user?.username}</p>
        <div onClick={logout} className={styles.sidebarIcon}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout" />
          </svg>
        </div>
      </div>
      <SidebarItems />
    </div>
  );
}
