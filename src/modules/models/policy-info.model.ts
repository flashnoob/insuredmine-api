import mongoose, { Document, model } from 'mongoose';
const Schema = mongoose.Schema;


export interface IPolicy{
        policyStartDate: Date,
        policyEndDate: Date,
        policyMode: string,
        policyNumber: string,
        policyType: string,
        userId:string,
        categoryId: string,
        carrierId: string,
        agentId: string,
        premiumAmount:number,
        csrName:string
    }

  
export default interface IPolicyInfoModel extends Document, IPolicy {}
const policyInfoSchema = new Schema({
	policyStartDate: Date,
	policyEndDate: Date,
	csrName :String,
	premiumAmount:{type:Number,required:true},
	policyMode: String,
	policyNumber: String,
	policyType: String,
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	categoryId: {
		type: Schema.Types.ObjectId,
		ref: 'Lob'
	},
	carrierId: {
		type: Schema.Types.ObjectId,
		ref: 'PolicyCarrier'
	},
	agentId: {
		type: Schema.Types.ObjectId,
		ref: 'Agent'
	},producerId: {
		type: Schema.Types.ObjectId,
		ref: 'Producer'
	},
},{ timestamps:true });
export const PolicyInfo = model<IPolicyInfoModel>('Policy', policyInfoSchema);

