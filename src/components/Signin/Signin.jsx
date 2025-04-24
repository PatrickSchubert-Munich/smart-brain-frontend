import React, { useState } from "react";

const Signin = ({ onChangeRoute, loadUser }) => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const onEmailChange = (event) => {
    setSignInEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value);
  };

  const resetState = () => {
    setSignInEmail(""); // Eingabefeld für Email leeren
    setSignInPassword(""); // Eingabefeld für Passwort leeren
  };

  const onSubmitSignIn = (event) => {
    event.preventDefault(); // Verhindert das Neuladen der Seite
    const form = event.target;
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        resetState(); // Eingabefelder leeren
        // Check if the response contains user data
        if (user.id && user.email && user.name) {
          loadUser(user); // Benutzerinformationen laden
          onChangeRoute("home", event);
        }
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
        alert("Sign-in failed. Please check your credentials.");
        // Formular zurücksetzen und Eingabefelder leeren
        resetState();
        form.reset();
      });
  };

  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                placeholder="john@gmail.com"
                autocomplete="off"
                value={signInEmail}
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                autocomplete="off"
                value={signInPassword}
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={(event) => onChangeRoute("register", event)}
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </form>
      </main>
    </article>
  );
};

export default Signin;
