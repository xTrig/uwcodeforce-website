import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Logo, GitLogo } from './../Miscellaneous/Miscellaneous.component';


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
            <div className="nav-link dropdown text-light p-0">
              <a className="nav-link dropdown-toggle" href="#" id="resources" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Resources
              </a>
              <div className="dropdown-menu" aria-labelledby="resources">
                <a className="dropdown-item" href="content/CodeForce2021.pdf">Code Force 2021/2022 PDF</a>
                <a className="dropdown-item" href="content/gitcrashcourse.pdf">Git Crash Course</a>
                <a className="dropdown-item" href="https://www.youtube.com/watch?v=YnfmtpLNR9g" target="_blank">Git Crash Course Video</a>
              </div>
            </div>
            <GitLogo />
            {/* {signedIn ? 
            <Link className="nav-link dark-hover text-light" to="/signup">Challenge Sign Up</Link>
            : <Link className="nav-link dark-hover disabled" to="/signup">Challenge Sign Up</Link>
            } */}
            
          </div>
          
        </div>
        <div className="nav navbar-nav ml-auto">
            {!signedIn ? 
            <a className="nav-link dark-hover text-light" href="https://uwcodeforce.ca/api/auth" rel="noreferrer">Login/Register</a>
            : <a className="nav-link dark-hover text-light" href="https://uwcodeforce.ca/api/auth/logout" rel="noreferrer">Logout</a>}
          </div>
      </div>
    </nav>
  )
}
export default memo(Head);