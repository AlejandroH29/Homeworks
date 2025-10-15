import React, { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) navigate("/", { replace: true });
    });
    return () => unsub();
  }, [navigate]);

  const login = () => signInWithEmailAndPassword(auth, email, pass).catch(alert);
  const register = () => createUserWithEmailAndPassword(auth, email, pass).catch(alert);

  return (
    <div style={{maxWidth: 300, margin: "100px auto", textAlign: "center"}}>
      <h2>Iniciar sesión / Registrarse</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
      <input placeholder="Contraseña" type="password" value={pass} onChange={e => setPass(e.target.value)} /><br />
      <button onClick={login}>Iniciar sesión</button>
      <button onClick={register}>Registrarse</button>
    </div>
  );
};

export default Login;