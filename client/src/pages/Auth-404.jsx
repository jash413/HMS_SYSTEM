import React from 'react'

function Auth404() {
  return (
    <div className="container-xxl">
  <div className="row g-0">
    <div className="col-lg-12 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
      <div className="w-100 p-3 p-md-5 card border-0 bg-dark text-light" style={{maxWidth: '32rem'}}>
        {/* Form */}
        <form className="row g-1 p-3 p-md-4">
          <div className="col-12 text-center mb-4">
            <img src="../assets/images/not_found.svg" className="w240 mb-4" alt="" />
            <h5>OOP! PAGE NOT FOUND</h5>
            <span className="text-light">Sorry, the page you're looking for doesn't exist. if you think something is broken, report a problem.</span>
          </div>
          <div className="col-12 text-center">
            <a href="/dashboard" title className="btn btn-lg btn-block btn-light lift text-uppercase">Back to Home</a>
          </div>
        </form>
        {/* End Form */}
      </div>
    </div>
  </div> {/* End Row */}
</div>

  )
}

export default Auth404
