import { Aggregate } from 'mongoose';
import  { LOBModel,ILOB } from '../models/lob.model';
export class LOBController {
	/**
	 * Description delete LOB
	 * @param {string} lobId
	 * @returns {Promise<ILOB>} 
	 */
	async deleteLOB(lobId: string): Promise<ILOB> {
		return await LOBModel.findByIdAndDelete(lobId);
	}

	/**
	 * @Description create LOB
	 * @param {string} lobId
	 * @returns {Promise<ILOB>} lobData
	 */
	async createLOB(lobData: ILOB):Promise<ILOB> {
		const user= new LOBModel(lobData);
		return await user.save();
	}

	/**
	 * @Description update LOB
	 * @param {string} lobId
	 * @param {ILOB} lobData
	 * @returns {Promise<ILOB>} lobData
	 */
	async updateLOB(lobId:string,lobData: ILOB):Promise<ILOB> {
		return await LOBModel.findByIdAndUpdate(lobId,lobData,{new: true});
	}

	/**
	 * @Description update LOB
	 * @param {string} lobId
	 * @param {ILOB} lobData
	 * @returns {Promise<Aggregate<ILOB[]>>} lobList
	 */
	async getAllLOB(conditions:{offset:number,limit:number}):Promise<Aggregate<ILOB[]>> {
		return await LOBModel.aggregate([
			{ '$limit': conditions.offset + conditions.limit },
			{ '$skip': conditions.offset },

		]);
	}

	/**
	 * @Description get LOB
	 * @param {string} lobId
	 * @returns {Promise<ILOB>} lobData
	 */
	async getLOB(lobId:string):Promise<ILOB>{
		return await LOBModel.findById(lobId).lean();
	}
}