import { Aggregate } from 'mongoose';
import  { AgentModel,IAgent } from '../models/agent.model';
export class AgentController {
	/**
	 * @Description delete agent
	 * @param {string} agentId
	 * @returns {Promise<IAgent>}agentData
	 */
	async deleteAgent(agentId: string):Promise<IAgent> {
		return await AgentModel.findByIdAndDelete(agentId);
	}
	
	/**
	 * @Description create agent
	 * @param {IAgent} agentData
	 * @returns {Promise<IAgent>}agentData
	 */
	async createAgent(agentData: IAgent):Promise<IAgent>{
		const user= new AgentModel(agentData);
		return await user.save();
	}

	/**
	 * @Description update agent
	 * @param {string} agentId
	 * @param {IAgent} agentData
	 * @returns {Promise<IAgent>}agentData
	 */
	async updateAgent(agentId:string,agentData: IAgent) :Promise<IAgent>{
		return await AgentModel.findByIdAndUpdate(agentId,agentData,{new: true});
	}

	/**
	 * @Description get all agent
	 * @param {string} agentId
	 * @param {IAgent} agentData
	 * @returns {Promise<Aggregate<IAgent[]>>}agentList
	 */
	async getAllAgents(conditions:{offset:number,limit:number}) :Promise<Aggregate<IAgent[]>>{
		return await AgentModel.aggregate([
			{ '$limit': conditions.offset + conditions.limit },
			{ '$skip': conditions.offset }
		]);
	}

	/**
	 * @Description get agent
	 * @param {string} agentId
	 * @returns {Promise<IAgent>}agentData
	 */
	async getUser(agentId:string):Promise<IAgent>{
		return await AgentModel.findById(agentId).lean();
	}
}