import mongoose, { Document, model } from 'mongoose';
const Schema = mongoose.Schema;


export interface ILOB {
	categoryName: string
  }
  
export default interface ILOBModel extends Document, ILOB {
}

const LOBSchema = new Schema({
	categoryName: {
		type: String,
		required: true
	}},{ timestamps:true });
export const LOBModel = model<ILOBModel>('Lob', LOBSchema);
