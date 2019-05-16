import React, { Fragment, useState } from "react";
import axios from "axios";
/*for user input*/
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  /* destructuring */
  const { name, email, password, password2 } = formData;

  /*onChange handler utilized for event of user input*/

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  /* For the submission of the registration form*/
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Passwords do not match");
    } else {
      const newUser = {
        name,
        email,
        password
      };
      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        const body = JSON.stringify(newUser);
        //making post request via async/promise by axios middleware
        const res = await axios.post("/api/users/", body, config);
        console.log(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user" /> Create Your Account
        </p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              required
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
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
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <a href="login.html">Sign In</a>
        </p>
      </section>
    </Fragment>
  );
};

export default Register;
