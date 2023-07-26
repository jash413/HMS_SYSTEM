import React from 'react'

function Signin() {
  return (
<div id="ihealth-layout" className="theme-tradewind">
  {/* main body area */}
  <div className="main p-2 py-3 p-xl-5 ">
    {/* Body: Body */}
    <div className="body d-flex p-0 p-xl-5">
      <div className="container-xxl">
        <div className="row g-0">
          <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center rounded-lg auth-h100">
            <div style={{maxWidth: '25rem'}}>
              <div className="text-center mb-5">
                <i className="icofont-heart-beat secondary-color" style={{fontSize: '90px'}} />
              </div>
              <div className="mb-5">
                <h2 className="color-900 text-center">I-Health, We aim to make your life better</h2>
              </div>
              {/* Image block */}
              <div className>
                <img src="../assets/images/login-img.svg" alt="login-img" />
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
            <div className="w-100 p-3 p-md-5 card border-0 bg-dark text-light" style={{maxWidth: '32rem'}}>
              {/* Form */}
              <form className="row g-1 p-3 p-md-4">
                <div className="col-12 text-center mb-5">
                  <h1>Sign in</h1>
                  <span>Free access to our dashboard.</span>
                </div>
                <div className="col-12 text-center mb-4">
                  <a className="btn btn-lg btn-outline-secondary btn-block" href="#">
                    <span className="d-flex justify-content-center align-items-center">
                      <img className="avatar xs me-2" src="../assets/images/google.svg" alt="Image Description" />
                      Sign in with Google
                    </span>
                  </a>
                  <span className="dividers text-muted mt-4">OR</span>
                </div>
                <div className="col-12">
                  <div className="mb-2">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control form-control-lg" placeholder="name@example.com" />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-2">
                    <div className="form-label">
                      <span className="d-flex justify-content-between align-items-center">
                        Password
                        <a href="auth-password-reset.html">Forgot Password?</a>
                      </span>
                    </div>
                    <input type="password" className="form-control form-control-lg" placeholder="***************" />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="col-12 text-center mt-4">
                  <a href="index.html" className="btn btn-lg btn-block btn-light lift text-uppercase" atl="signin">SIGN IN</a>
                </div>
                <div className="col-12 text-center mt-4">
                  <span>Don't have an account yet? <a href="auth-signup.html">Sign up here</a></span>
                </div>
              </form>
              {/* End Form */}
            </div>
          </div>
        </div> {/* End Row */}
      </div>
    </div>
  </div>
</div>

  )
}

export default Signin
