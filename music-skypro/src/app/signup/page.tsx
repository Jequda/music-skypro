"use client";

import Image from "next/image";
import styles from "./page.module.css";
import classnames from "classnames";
import { ChangeEvent, useState } from "react";
import { signupUser } from "@/api/users";
import { useUser } from "@/hooks/useUser";

export default function SignUp() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { login } = useUser(); // не знаю какой тип тут написать

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signupUser(loginData).then((data) => {
      login(data, loginData);
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerSignup}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin}>
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
              name="email"
              placeholder="Почта"
              onChange={handleInputChange}
            />
            <input
              className={styles.modalInput}
              type="text"
              name="username"
              placeholder="Имя пользователя"
              onChange={handleInputChange}
            />
            <input
              className={styles.modalInput}
              type="password"
              name="password"
              placeholder="Повторите пароль"
              onChange={handleInputChange}
            />
            <button
              onClick={handleRegister}
              className={styles.modalBtnSignupEnt}
            >
              <span className={styles.modalBtnSignupEntText}>
                Зарегистрироваться
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
