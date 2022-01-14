import { Aggregate } from 'mongoose';
import { PolicyCarrier,ICarrier } from '../models/carrier.model';
export class CarrierController {
	/**
	 * @Description delete carrier
	 * @param {string} carrierId
	 * @returns {Promise<ICarrier>}carrierData
	 */
	async deleteCarrier(carrierId: string):Promise<ICarrier> {
		return await PolicyCarrier.findByIdAndDelete(carrierId);
	}
	
	/**
	 * @Description create carrier
	 * @param {ICarrier} carrierData
	 * @returns {Promise<ICarrier>}carrierData
	 */
	async createCarrier(carrierData: ICarrier): Promise<ICarrier> {
		const user= new PolicyCarrier(carrierData);
		return await user.save();
	}

	/**
	 * @Description update carrier
	 * @param {ICarrier} carrierData
	 * @returns {Promise<ICarrier>}carrierData
	 */
	async updateCarrier(carrierId:string,carrierData: ICarrier): Promise<ICarrier> {
		return await PolicyCarrier.findByIdAndUpdate(carrierId,carrierData,{new: true});
	}

	/**
	 * @Description get all carrier
	 * @param {ICarrier} carrierData
	 * @returns {Promise<Aggregate<ICarrier[]>>}carrierData
	 */
	async getAllCarrier(conditions:{offset:number,limit:number}): Promise<Aggregate<ICarrier[]>> {
		return await PolicyCarrier.aggregate([
			{ '$limit': conditions.offset + conditions.limit },
			{ '$skip': conditions.offset }
		]);
	}

	/**
	 * @Description get  carrier
	 * @param {string} carrierId
	 * @returns {Promise<ICarrier>}carrierData
	 */
	async getCarrier(carrierId:string):Promise<ICarrier>{
		return await PolicyCarrier.findById(carrierId).lean();
	}
}