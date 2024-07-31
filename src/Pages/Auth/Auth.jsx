
import React, { useState, useContext } from "react";
import classes from "./Signup.module.css";
import { Link, useNavigate, useLocation} from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import {ClipLoader }from 'react-spinners'
import {DataContext} from "../../componentes/DataProvider/DataProvider"
import { Type } from "../../Utility/action.type";
import { LiaDiagnosesSolid } from "react-icons/lia";
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loding, setLoding]=useState({
    signIn:false,
    signup:false
  })


  const [{user}, dispatch] =useContext(DataContext)
  const navigate=useNavigate();
  const navStateData=useLocation()
  // console.log(navStateData);

// console.log(user);
  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name =="signin") {
      // firebase auth
      setLoding({...loding, signIn: true })
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
        
          dispatch({
            type:Type.SET_USER,
            user:userInfo.user
          })
          setLoding({ ...loding, signIn: false });
          navigate(navStateData?.redirect || "/")
        })
        .catch((err) => {
          console.log(err);
          setError(err.message)
          setLoding({ ...loding, signIn: false });
        });
    } else {
       setLoding({ ...loding, signup: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
         
         dispatch({
           type: Type.SET_USER,
           user: userInfo.user,
         });
         setLoding({ ...loding, signup: false });
         navigate(navStateData?.redirect || "/");
        })
        .catch((err) => {
        setError(err.message);
        setLoding({ ...loding, signup: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      {/* Logo */}
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt=""
        />
      </Link>
      {/* form */}
      <div className={classes.login_container}>
        <h1>sign In</h1>
        {navStateData?.state?.msg &&(
          <small
            style={{
              padding:"5px",
              textAlign:"center",
              color:"red,",
              fontWeight:"bold"
            }}>
              {navStateData?.state?.msg}
          </small>
        )
        
      
        }
        <form action="">
          <div>
            <label htmlfor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlfor="password">Password</label>
            <input
              value={password}
              on
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login_signInButton}
          >
            {loding.signIn ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        {/* agreement */}
        <p>
          By Signing-in your to the AMAZON FAKE CLONE Conditions of use & sale.
          please see our privacy Notice, our cookies Notice and our
          Interest-based Ads Notice.
        </p>
        {/* create account btn */}
        <button
          type="submit"
          onClick={authHandler}
          name="signup"
          className={classes.login_registerButton}
        >
          {loding.signup ? (
            <ClipLoader color="#000" size={15}></ClipLoader>
          ) : (
            "Create your Amazone Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
