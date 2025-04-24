import React from "react";

const Navigation = ({ onChangeRoute, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className="flex justify-end">
        <p
          onClick={(event) => onChangeRoute("signout", event)}
          className="f3 link ma0 pa2 black underline pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <div>
        <nav className="flex justify-end">
          <p
            onClick={(event) => onChangeRoute("signin", event)}
            className="f3 link ma0 pa2 black underline pointer"
          >
            Sign In
          </p>
          <p
            onClick={(event) => onChangeRoute("register", event)}
            className="f3 link ma0 pa2 black underline pointer"
          >
            Register
          </p>
        </nav>
      </div>
    );
  }
};

export default Navigation;
