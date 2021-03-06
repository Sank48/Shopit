import React from 'react'

const Home=()=>{
	return(
		<div className='container container-fluid'>
			<h1 id="products_heading">Latest Products</h1>

			<section id="products" className="container mt-5">
		        <div className="row">
			        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
			          <div className="card p-3 rounded">
			            <img
			              className="card-img-top mx-auto"
			              src=""
			            />
			            <div className="card-body d-flex flex-column">
			                <h5 className="card-title">
			                	<a href="">128 GB Solid Storage Memory card - SanDisk Ultra</a>
			                </h5>
			                <div className="ratings mt-auto">
			                	<div className="rating-outer">
			                  	<div className="rating-inner"></div>
			                	</div>
			                </div>
			                <span id="no_of_reviews">(5 Reviews)</span>
			            </div>
			            <p className="card-text">$45</p>
			            <a href="#" id="view_btn" className="btn btn-block">View Details</a>
			        </div>
			    </div>
		        </div>
		    </section>

		</div>
	)
}

export default Home;