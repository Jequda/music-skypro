import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import classnames from "classnames";

export default function SigninPage() {
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
            />
            <input
              className={styles.modalInput}
              type="password"
              name="password"
              placeholder="Пароль"
            />
            <button className={styles.modalBtnEnter}>
              <Link href="/">Войти</Link>
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
