import mongoose, { model } from 'mongoose';
const Schema = mongoose.Schema;


export interface IPolicyCategory{
    policyCategory:string 
}

  
  export default interface IPolicyCategoryModel extends Document, IPolicyCategory {}
const policyCategorySchema = new Schema({
    policyCategory: {
        type: String,
        required: true
    }
});
export const PolicyCategory = model<IPolicyCategoryModel>('PolicyCategory', policyCategorySchema)

