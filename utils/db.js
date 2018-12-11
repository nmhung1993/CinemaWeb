var mongoose = require('mongoose');

const mlabURI = 'mongodb://admin-cinema:111111a@ds121624.mlab.com:21624/cinema'

const con = mongoose.connect(mlabURI,{ useNewUrlParser: true }, (error) => {
	if(error){
		console.log("Error " + error);
	}else{
		console.log("Connected successfully to server")
	}
});

module.exports = con;