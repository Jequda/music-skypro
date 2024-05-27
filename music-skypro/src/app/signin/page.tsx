"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import classnames from "classnames";
import { loginUser } from "@/api/users";
import { ChangeEvent, useState } from "react";

export default function SigninPage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = () => {
    loginUser(loginData).then((data) => {});
    console.log(loginData);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form className={styles.modalformlogin} action="#">
            <div className={styles.modalLogo}>
              <Image
                src="/img/logo_modal.png"
                alt="logo"
                width={140}
                height={21}
              />
            </div>
            <input
              className={classnames(styles.modalInput, styles.login)}
              type="text"
              name="login"
              placeholder="Почта"
              onChange={handleInputChange}
            />
            <input
              className={styles.modalInput}
              type="password"
              name="password"
              placeholder="Пароль"
              onChange={handleInputChange}
            />
            <button onClick={handleLogin} className={styles.modalBtnEnter}>
              <span>Войти</span>
            </button>
            <button className={styles.modalBtnSignup}>
              <Link href="/signup">Зарегистрироваться</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
