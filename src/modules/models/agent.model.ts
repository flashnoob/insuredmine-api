import mongoose, { Document, model } from 'mongoose';
const Schema = mongoose.Schema;


export interface IAgent {
    name: string,
    producer:string,
    agencyId:string

  }
  
export default interface IAgentModel extends Document, IAgent {
}

const agentSchema = new Schema({
	name: {
		type: String,
		required: true
	},agencyId:{type:String,
		default:null
	}},{ timestamps:true });
export const AgentModel = model<IAgentModel>('Agent', agentSchema);
