import React from "react";

let Login = props => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <p>Sign in to manage your store Inventory</p>

    <button className="github" onClick={() => props.authenticate("Github")}>
      Log in with Github
    </button>

    <button className="facebook" onClick={() => props.authenticate("Facebook")}>
      Log in with Facebook
    </button>
  </nav>
);

export default Login;
