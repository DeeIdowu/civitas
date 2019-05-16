import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
/*for user input*/
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  /* destructuring */
  const { email, password } = formData;

  /*onChange handler utilized for event of user input*/

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  /* For the successful login*/
  const onSubmit = async e => {
    e.preventDefault();
    console.log("Welcome Back!");
  };

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Log in</h1>
        <p className="lead">
          <i className="fas fa-user" /> Log into your account
        </p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account?
          <Link to="/register">Register</Link>
        </p>
      </section>
    </Fragment>
  );
};

export default Login;
