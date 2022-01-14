import { UserModel } from '../models/user.model';
import { PolicyCarrier } from '../models/carrier.model';
import { LOBModel } from '../models/lob.model';
import {  ProducerModel } from '../models/producer.model';
import { AgentModel } from '../models/agent.model';
import { getHealthSchema } from './schema';
import fs from 'fs' ;
import * as csv from 'fast-csv';
import { tmpdir } from 'os';
import multer from 'fastify-multer';
import { PolicyInfo } from '../models/policy-info.model';
const tempDir=tmpdir+'/uploads/';
const upload=multer({dest:tempDir});
export default function dataHandler(server, options, next) {
	server.post('/csv', { schema: getHealthSchema ,
		preHandler: upload.any()
	}, async (req, res) => {
		const data=[];
		// const documentFile  = (req  as MulterRequest).files[0].buffer;
		    fs.createReadStream(tempDir+req.files[0].filename).pipe(csv.parse({ headers: true }))
		    .on('data', (row:never) => {
				data.push(row);
				// console.log(row);
				// res.send(row);
		    })
			.on('end', async () => {
				for (let index = 0; index < data.length; index++) {
					const row = data[index];
					const agent =	await	AgentModel.findOneAndUpdate({name:row.agent},{name:row.agent},{upsert:true,new:true,});
					const producer =	await	ProducerModel.findOneAndUpdate({name:row.producer},{name:row.producer,agentId:agent._id},{upsert:true,new:true,});
					const lob =	await	LOBModel.findOneAndUpdate({categoryName:row.category_name},{categoryName:row.category_name},{upsert:true,new:true,});
					const carrier =	await	PolicyCarrier.findOneAndUpdate({companyName:row.company_name},{companyName:row.company_name},{upsert:true,new:true,});
					const policy=	await PolicyInfo.findOneAndUpdate({policyNumber:row.policy_number},
						{
							premiumAmount: row.premium_amount,
							policyStartDate: row.policy_start_date,
							policyEndDate: row.policy_end_date,
							categoryId: lob._id,
							carrierId: carrier._id,
							policyNumber: row.policy_number,
							policyMode: row.policy_mode,
							policyType: row.policy_type,
							agentId: agent._id,
							producerId: producer._id

						}, { upsert:true,new:true});
					const user =	await	UserModel.findOneAndUpdate({email:row.email},
						{
							email: row.email,
							firstName: row.firstname,
							dob: row.dob,
							gender: row.gender,
							phone: row.phone,
							userType:row.userType,
							accountType:row.account_type,
							city: row.city,
							address: row.address,
							state: row.state,
							zip: row.zip,
							policyId: policy._id								
							
						},
						{upsert:true,new:true,});


				}
				res
					.code(200)
	 				.header('Content-Type', 'application/json; charset=utf-8')
					.send({message:'CSV data uploaded successfully'});
			  });
	});
	server.get('/', { schema: getHealthSchema }, (req, res) => {
		res.send({ status: 'ok' });
	});

	next();
}
