import { Aggregate } from 'mongoose';
import IPolicyInfoModel, { PolicyInfo,IPolicy } from '../models/policy-info.model';
export class PolicyController {
	
	/**
	 * @Description delete policy
	 * @param {string} policyId
	 * @returns {Promise<IPolicyInfoModel>} policyList
	 */
	async deletePolicy(policyId: string): Promise<IPolicyInfoModel> {
		return await PolicyInfo.findByIdAndDelete(policyId);
	}

	/**
	 * @Description create policy
	 * @param {IPolicy} policyData
	 * @returns {Promise<IPolicyInfoModel>} policyList
	 */
	async createPolicy(policyData: IPolicy):Promise<IPolicyInfoModel> {
		const user= new PolicyInfo(policyData);
		return await user.save();
	}

	/**
	 * @Description update policy
	 * @param {string} policyId
	 * @param {IPolicy} policyData
	 * @returns {Promise<IPolicyInfoModel>} policyList
	 */
	async updatePolicy(policyId:string,policyData: IPolicy) :Promise<IPolicyInfoModel>{
		return await PolicyInfo.findByIdAndUpdate(policyId,policyData,{new: true});
	}

	/**
	 * @Description get policy list
	 * @param {string} policyId
	 * @returns {Promise<Aggregate<IPolicyInfoModel[]} policyList
	 */
	async getAllPolicy(conditions:{offset:number,limit:number}) :Promise<Aggregate<IPolicyInfoModel[]>>{
		return await PolicyInfo.aggregate([
			{ '$limit': conditions.offset + conditions.limit },
			{ '$skip': conditions.offset },
		]);
	}

	/**
	 * @Description get policy
	 * @param {string} policyId
	 * @returns {Promise<IPolicy>} policyDatas
	 */
	async getPolicy(policyId:string):Promise<IPolicy>{
		return await PolicyInfo.findById(policyId).lean();
	}
}