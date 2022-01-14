import { IUserModel, UserModel } from './../models/user.model';
export class UserController {
	async deleteUser(userId: string) {
		return await UserModel.findByIdAndDelete(userId);
	}
	async createUser(userData: any) {
		const user= new UserModel(userData);
		return await user.save();
	}
	async updateUser(userId:string,userData: any) {
		return await UserModel.findByIdAndUpdate(userId,userData,{new: true});

	}
	async getAllUsers(conditions:{offset:number,limit:number}) {
		return await UserModel.aggregate([
			{
				$lookup: {
					from: 'policies', // collection name in db
					localField: 'policyId',
					foreignField: '_id',
					as: 'policy'
				},
                
			}, { '$limit': conditions.offset + conditions.limit },
			{ '$skip': conditions.offset },
			{$unwind: '$policy'}

		]);
	}

	async getUser(userId:string):Promise<IUserModel>{
		return await UserModel.findById(userId).lean();
	}
}