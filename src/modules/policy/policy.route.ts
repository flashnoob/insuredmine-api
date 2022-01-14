import { listPolicySchema,  addPolicySchema,deletePolicySchema,getPolicySchema,updatePolicySchema } from './schema';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import {   PolicyController } from './policy.controller';
const policyController:	PolicyController = new PolicyController();
export default function PolicyRouteHandler(server:FastifyInstance, _options, next) {
	server.get(
		'/',
		{ schema: listPolicySchema },
		async (req:FastifyRequest<any>, res:FastifyReply) => {
			req.log.info('list Policy from db');
			const limit=(+req.query?.limit) ||100 ;
			const offset=(+req.query?.offset) ||0;
			const policy = await policyController.getAllPolicy({offset,limit});
			res
				.code(200)
				.header('Content-Type', 'application/json; charset=utf-8')
				.send((policy));		}
	);

	server.get('/:_id', 
		{ schema: getPolicySchema },

		async (req:FastifyRequest, res:FastifyReply) => {
			req.log.info('get one Policy from db');
			const policyId=(req.params as Record<string,string>)._id;
			const policy = await policyController.getPolicy(policyId);
			if(policy){
				return res.status(200).send(policy);}
			else{
				return res.status(404).send({message:'Policy not found for the requested id.'});
			}
		});

	server.post('/', 
		{ schema: addPolicySchema },
	
		async (req:FastifyRequest<never,never>, res:FastifyReply) => {
			req.log.info('Add Policy to db');
			const policy = await policyController.createPolicy(req.body);
			res.status(201).send(policy);
		});

	server.put('/:_id',
		{ schema: updatePolicySchema },
	
		async (req:FastifyRequest<never,never>, res:FastifyReply) => {
			const userId=(req.params as Record<string,string>)._id;
			req.log.info('Update Policy to db');
			const policy = await policyController.updatePolicy(userId, req.body);
			res.status(200).send(policy);
		});

	server.delete(
		'/:_id',
		{ schema: deletePolicySchema },
		async (req:FastifyRequest, res:FastifyReply) => {
			const policyId=(req.params as Record<string,string>)._id;
			req.log.info(`delete Policy ${policyId} from db`);
			const data=	await policyController.deletePolicy(policyId);
			if(data){
				return res.send({message :`Policy by id ${policyId} removed.`});

			}else {
				throw res.status(404).send({message:'Policy not found'});
			}

		}
	);

	next();
}
