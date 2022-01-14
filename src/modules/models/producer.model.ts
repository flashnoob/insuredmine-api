import mongoose, { Document, model } from 'mongoose';
const Schema = mongoose.Schema;


export interface IProducer {
    name: string,
    agentId:string

  }
  
export default interface IProducerModel extends Document, IProducer {
}

const producerSchema = new Schema({
	name: {
		type: String,
		required: true
	},agentId: {
		type: Schema.Types.ObjectId,
		ref: 'Agent',required:true
	}},{ timestamps:true });
export const ProducerModel = model<IProducerModel>('Producer', producerSchema);
