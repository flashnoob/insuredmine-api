import { Schema, Document, model } from 'mongoose';
const userSchema = new Schema({
	email:{
		type: String,
		unique: true,
		required: true
	},
	accountType:{
		type:String,required:true
	},
	firstName: {
		type: String,
		required: true
	},
	accountName: {
		type: String,
		required: true
	},
	gender:{type:String,enum: ['Male','Female','Other']},
	// gender:{type:Number,enum: [0,1,2,9]},           //ISO/IEC 5218 
	city: {type:String,required:true},
	userType:{type:String,required:true},
	phone: {type:String,required:true},
	address: {type:String,required:true},
	state: {type:String,required:true},
	zip: {type:String,required:true,maxLength: 9,minLength:5},
	dob: {type:Date,required:true},
	policyId:{ type: Schema.Types.ObjectId, ref: 'Policy' },
},
{timestamps: true}
);

export interface IUserModel extends Document{
email:string,
accountName:string,
firstName:string,
gender:string,
city:string,
accountType:string
phone: string,
address: string,
userType:string
state: string,
zip: string,
dob: Date,
policyId:string
}

export const UserModel = model<IUserModel>('User', userSchema);
