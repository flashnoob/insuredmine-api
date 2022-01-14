import mongoose from 'mongoose';

// const host = process.env.MONGO_HOST || 'localhost';
// const port = process.env.MONGO_PORT || 27017;
// const database = process.env.MONGO_DATABASE || 'fastify';
// const user = process.env.MONGO_DATABASE || 'fastify';
// const password = process.env.MONGO_DATABASE || 'fastify';
const mongoDBsrvString=process.env.MONGO_URL || 'mongodb+srv://flash:flash@123@cluster0.gzot2.mongodb.net/insuredmine?authSource=admin&replicaSet=atlas-qtol90-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
mongoose.connect(mongoDBsrvString, {useNewUrlParser: true, useUnifiedTopology: true,}, (err) => {
	if (!err)
		console.log('MongoDB connection successful.');
	else
		console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;