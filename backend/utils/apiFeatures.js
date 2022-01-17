class APIFeatures{
	constructor(query, queryStr){
		this.query = query;
		this.queryStr = queryStr;
	}

	search(){
		const keyword = this.queryStr.keyword?{
			name:{
				$regex: this.queryStr.keyword,
				$options: 'i'
			}
		}:{}

		this.query = this.query.find({...keyword});
		return this;
	}

	filter(){
		const queryCopy = {...this.queryStr};
		const removeFields = ['keyword', 'limit', 'page']
		removeFields.forEach(e=>delete removeFields[e]);

		// Advance filter for price, ratings etc.
		let queryStr = JSON.stringify(queryCopy); //convert js object to string.
		// for replacing gte with $gte
		queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

		this.query = this.query.find(JSON.parse(queryStr)); //parse converts text to js object.
		return this;
	}

	pagination(resPerPage){
		const currentPage = Number(this.queryStr.page)||1;
		const skip = resPerPage * (currentPage-1); // for skipping no. of products by page no.

		this.query = this.query.limit(resPerPage).skip(skip);
		return this;
	}
}

module.exports = APIFeatures;