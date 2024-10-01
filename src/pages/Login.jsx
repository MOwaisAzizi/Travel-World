import styles from "./Login.module.css";
import PageNav from "../component/PageNav";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { useAuth } from "../contexts/FakeauthContext";
import Button from "../component/Button";

export default function Login() {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const {login,authunticated} = useAuth()
  const navigate = useNavigate()

  function submitHandler(e){
    e.preventDefault()
     if(email && password) login(email,password)
  }

  useEffect(function(){
   if(authunticated) navigate('/AppLoyout/cities',{replace:true})
    
  },[authunticated,navigate])

  return (
    <main className={styles.login} onClick={submitHandler}>
      <PageNav/>
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>

          <Button type='primary'>Login</Button>

        </div>
      </form>
    </main>
  );
}
