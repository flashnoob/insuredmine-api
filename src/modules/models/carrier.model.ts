import mongoose, { Document, model } from 'mongoose';
const Schema = mongoose.Schema;
export interface ICarrier{
    companyName:string

}
const CarrierSchema = new Schema({
	companyName: String,
}, { timestamps:true });
export interface ICarrierModel extends Document {
    companyName:string
}
export const PolicyCarrier = model<ICarrierModel>('PolicyCarrier', CarrierSchema);
