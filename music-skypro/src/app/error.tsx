"use client";

import { useEffect } from "react";
import styles from "./page.module.css";
import Nav from "@/components/Nav/Nav";
import Search from "@/components/Search/Search";
import Sidebar from "@/components/Sidebar/Sidebar";
import Bar from "@/components/Bar/Bar";
import Image from "next/image";

type ErrorType = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorType) {
  useEffect(() => {
    // Логирование ошибки
    console.error(error);
  }, [error]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav></Nav>
          <div className={styles.mainCenterblock}>
            <Search></Search>
            <div className={styles.errorH2}>404</div>
            <div className={styles.errorSubline}>
              Страница не найдена
              <Image
                src="/img/icon/crying.svg"
                alt="Логотип СкайПро музыка"
                width={52}
                height={52}
              />
            </div>
            <div className={styles.errorShadedText}>
              Возможно, она была удалена <br /> или перенесена на другой адрес
            </div>
            <button onClick={reset} className={styles.errorButton}>
              Вернуться на главную
            </button>
          </div>
          <Sidebar></Sidebar>
        </main>
        <Bar></Bar>
        <footer className="footer" />
      </div>
    </div>
  );
}
