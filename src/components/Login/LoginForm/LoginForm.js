import React from 'react';
import './LoginForm.css';

const LoginForm = ({email, password,setEmail, setPassword, handleLogIn, handleSignUp, passwordError, emailError, hasAccount, setHasAccount}) => {
   return (
     <section className="login">
       <div className="loginContainer">
         <label>UserName</label>
         <input
           type="text"
           autoFocus
           required
           value={email}
           onChange={(event) => setEmail(event.target.value)}
         ></input>
         <p className="errorMsg">{emailError}</p>
         <label>Password</label>
         <input
           type="password"
           autoFocus
           required
           value={password}
           onChange={(event) => setPassword(event.target.value)}
         ></input>
         <p className="errorMsg">{passwordError}</p>
         <div className="btnContainer">
           {hasAccount ? (
             <div>
               <button onClick={handleLogIn}>Sign In</button>
               <p className="text-center">
                 Don't have an account ?{" "}
                 <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span>
               </p>
             </div>
           ) : (
             <div>
               <button onClick={handleSignUp}>Sign Up</button>
               <p className="text-center">
                 Already have an account ?{" "}
                 <span onClick={() => setHasAccount(!hasAccount)}>Login</span>
               </p>
             </div>
           )}
         </div>
       </div>
     </section>
   );
};

export default LoginForm;