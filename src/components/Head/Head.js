import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './../Miscellaneous/Miscellaneous.component';


const Head = ({signedIn, setSignedIn}) => {
  setSignedIn(document.cookie ? true : false); //Temporary, just to check if server sent OAUTH response
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Logo />
        <div
          className="collapse navbar-collapse"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav mr-auto p-2">
            <Link className="nav-link dark-hover text-light" to="/"> Home</Link>
            <Link className="nav-link dark-hover text-light" to="/challenges">Challenges</Link>
            <Link className="nav-link dark-hover text-light" to="/contact"> Contact </Link>
            <a
              className="nav-link dark-hover disabled"
              href="https://forms.gle/aL1wt4wSevjWyE969"
              target="_blank"
              rel="noreferrer"
            >Sign Up
            </a>
          </div>
          
        </div>
        <div className="nav ml-auto">
            {!signedIn ? 
            <a className="nav-link dark-hover text-light" href="https://uwcodeforce.ca/api/auth" rel="noreferrer">Login</a>
            : <a className="nav-link dark-hover text-light" href="https://uwcodeforce.ca/api/auth/logout" rel="noreferrer">Logout</a>}
          </div>
      </div>
    </nav>
  )
}
export default memo(Head);