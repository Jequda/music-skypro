"use client";

import styles from "./Nav.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <nav className={styles.mainNav}>
      <Link href="/">
        <div className={styles.navLogo}>
          <Image
            className={styles.logoImage}
            src="/img/logo.png"
            alt="Логотип СкайПро музыка"
            width={113}
            height={17}
          />
        </div>
      </Link>
      <div
        onClick={() => setIsOpened((prev) => !prev)}
        className={styles.navBurger}
      >
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>
      {isOpened ? (
        <div className={styles.navMenu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Link href="/" className={styles.menuLink}>
                Главное
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/tracks/favorite" className={styles.menuLink}>
                Мой плейлист
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/signin" className={styles.menuLink}>
                Войти
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </nav>
  );
}
