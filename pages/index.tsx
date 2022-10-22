import { FormEvent, useState } from "react";
import { decode } from "jsonwebtoken";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [user, setUser] = useState<string>("");
  const [cookie, setCookie] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((t) => t.json());

    alert(res.message);
  };

  const handleLogout = async () => {
    const user = await fetch("/api/auth/logout", {
      method: "GET",
    }).then((u) => u.json());

    alert(user.message);
  };

  const handleGetUser = async () => {
    const user = await fetch("/api/user", {
      method: "GET",
    }).then((c) => c.json());

    if (user.basicJWT) {
      const userInfo = decode(user.basicJWT) as { [key: string]: string };
      setCookie(user.basicJWT);
      setUser(userInfo.username);
    } else {
      setCookie("");
      setUser("");
    }
  };

  return (
    <section className={styles.contatiner}>
      <div className={styles.form}>
        <h1>쿠키확인</h1>
        <span>저장된 쿠키</span>
        <span className={styles.span}>{cookie}</span>
        <span>로그인된 아이디</span>
        <span>{user}</span>
      </div>

      <form className={styles.form}>
        <h1>로그인</h1>
        <input
          className={styles.input}
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className={styles.button} type="button" value="로그인" onClick={handleSubmit} />
        <input className={styles.button} type="button" value="로그아웃" onClick={handleLogout} />
        <input className={styles.button} type="button" value="쿠키확인" onClick={handleGetUser} />
      </form>
    </section>
  );
}
