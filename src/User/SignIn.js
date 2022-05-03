import React, { useState } from "react";
import Base from "../Base";
import {
  signInUser,
  authenticateUser,
  isAuthenticated,
  signUpUser,
  generateOtp,
  checkNewEmailMobile,
} from "./helper/auth";
import { Redirect } from "react-router-dom";

const SignIn = ({ history }) => {
  //variables
  const [status, setStatus] = useState("signin");
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    cpassword: "",
    otp: "",
    fname: "",
    lname: "",
    mobile: "",
  });

  const [signUp, setSignUp] = useState({
    signup1: true,
    signup2: false,
  });
  const { signup1, signup2 } = signUp;

  //methods
  const signIn = (event) => {
    
    event.preventDefault();
    if (!user.email.match("^[\\w-\\.+]*[\\w-\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$")) {
      user.mobile = user.email;
      user.email = "";
    }else{
      user.mobile=""
    }

    if(user.email|| user.mobile){
      if(user.mobile && !user.mobile.match("^[0-9]{10}$")){
        alert("Please enter a valid Email/Mobile.")
        return
      }
      if(user.email && !user.email.match("^[\\w-\\.+]*[\\w-\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$")){
        alert("Please enter a valid Email/Mobile.")
        return
      }
      if(!user.password){
        alert("Please enter your password.")
        return
      }
      signInUser(user).then((res) => {
        if (res.status === 0) {
          alert(res.error);
        } else {
          authenticateUser(res, () => {
            setRedirect(true);
          });
        }
      });
    }else{
      alert("Enter a valid Email/Mobile.")
    }
  };

  const checkMail = (event) => {
    if(user.email.match("^[\\w-\\.+]*[\\w-\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$")){
      checkNewEmailMobile('email',user.email).then(res=>{
        if(res.error){
          alert(res.error)
        }else{
          if (res.status === "ok") {
            generateOtp(user.email).then((res) => {
              if (res.status === 0) {
                alert(res.error);
              } else {
                setSignUp({ signup1: false, signup2: true });
              }
            });
          } else {
            alert("Already Registered");
            setStatus("signin");
          }
        }
      })
    }
    else if(user.email.match(/[0-9]{10}/)){
      checkNewEmailMobile("mobile", user.email).then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          if(res.status==='ok'){
            generateOtp(user.email).then((res) => {
              if (res.status === 0) {
                alert(res.error);
              } else {
                setSignUp({ signup1: false, signup2: true });
              }
            });
          }else{
            alert('Already Registered')
            setStatus('signin')
          }
        }
      });
    }else{
      alert('Please enter valid email or mobile.')
    }
  };

  const addUser = (event) => {
    event.preventDefault();
    if (user.fname.trim().length < 3) {
      alert("Please enter valid First Name.");
      return;
    }
    if (user.lname.trim().length < 3) {
      alert("Please enter valid Last Name.");
      return;
    }
    if (!user.otp) {
      alert("OTP is required.");
      return;
    }
    if (user.password.length < 8) {
      alert("Please enter a password of atleast 8 characters.");
      return;
    }
    if (user.password !== user.cpassword) {
      alert("Confirm password does not match with password.");
      return;
    }
    if (user.email.match(/[0-9]{10}/)) {
      user.mobile = user.email;
      user.email = "";
    }
    signUpUser(user).then((res) => {
      if (res.status === 0) {
        alert(res.error);
      } else {
        signInUser(user).then((res) => {
          if (res.status === 0) {
            alert(res.error);
          } else {
            authenticateUser(res, () => {
              setRedirect(true);
            });
          }
        });
      }
    });
  };
  
  //HTML methods
  const doRedirect = () => {
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
    if (redirect) {
      if (isAuthenticated()) {
        return <Redirect to="/" />;
      } else {
        //   show error
      }
    }
  };
  const signInPage = () => {
    return (
      <div className="row justify-content-center">
        <form className="col">
          <div className="form-group">
            <label htmlFor="signInEmail">Email/Mobile</label>
            <input
              id="signInEmail"
              type="text"
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              className="form-control"
            />
            <small className="form-text text-muted">
              We'll never share your details with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="signInpass">Password</label>
            <input
              id="signInpass"
              type="password"
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              className="form-control"
            />
          </div>
          <div className="row justify-content-center ">
              <div className="button m-2" onClick={signIn}>
                Sign In
              </div>
              <div className="button m-2" onClick={(e)=>{
                setStatus('signup')
              }}>
                Sign Up
              </div>
          </div>
        </form>
      </div>
    );
  };
  const signUp1 = () => {
    return (
      <div>
        <div className="form-group">
          <label htmlFor='suem'>Email/Mobile</label>
          <input
          id='suem'
            type="text"
            className="form-control"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your details with anyone else.
          </small>
        </div>

        <div className="row justify-content-center">
          <div className="button m-2" onClick={checkMail}>
            Generate Otp
          </div>
          <div
            className="button m-2"
            onClick={() => {
              setStatus("signin");
            }}
          >
            Sign In
          </div>
        </div>
      </div>
    );
  };
  const signUp2 = () => {
    return (
      <div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="sufa">First Name</label>
              <input
                id="sufa"
                type="text"
                className="form-control"
                onChange={(e) => {
                  setUser({ ...user, fname: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="sula">Last Name</label>
              <input
                id="sula"
                type="text"
                className="form-control"
                onChange={(e) => {
                  setUser({ ...user, lname: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="suo">Otp</label>
          <input
            id="suo"
            type="text"
            className="form-control"
            onInput={(e) => {
              var regex = /[^0-9]/gi;
              e.target.value = e.target.value.replace(regex, "");
              if (e.target.value.length > 6) {
                e.target.value = e.target.value.substring(0, 6);
              }
            }}
            onChange={(e) => {
              setUser({ ...user, otp: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sup">Password</label>
          <input
            id="sup"
            type="password"
            className="form-control"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sucp">Confirm Password</label>
          <input
            id="sucp"
            type="password"
            className="form-control"
            onChange={(e) => {
              setUser({ ...user, cpassword: e.target.value });
            }}
          />
        </div>
        <div className="row justify-content-center">
          <div className="button" onClick={addUser}>
            Submit
          </div>
        </div>
      </div>
    );
  };

  const signUpPage = () => {
    return (
      <div className="row justify-content-center">
        <form className=" col">
          {signup1 && signUp1()}
          {signup2 && signUp2()}
        </form>
      </div>
    );
  };

  return (
    <Base>
      <div
        className="row justify-content-center m-0 align-items-center side-spacer"
      >
        <div className="col-md-4 m-0">
          {status === "signin" && signInPage()}
          {status === "signup" && signUpPage()}
        </div>
      </div>
      {doRedirect()}
    </Base>
  );
};

export default SignIn;
