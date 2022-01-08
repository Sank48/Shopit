module.exports = fnc => (req, res, next)=>
	Promise.resolve(fnc(req, res, next))
		.catch(next)