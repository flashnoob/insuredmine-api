import { listAgentSchema,  addAgentSchema,deleteAgentSchema,getAgentSchema,updateAgentSchema } from './schema';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { AgentController } from './agent.controller';
const agentController:	AgentController = new AgentController();
export default function agentRouteHandler(server:FastifyInstance, _options, next) {
	server.get(
		'/',
		{ schema: listAgentSchema },
		async (req:FastifyRequest<any>, res:FastifyReply) => {
			req.log.info('list products from db');
			const limit=(+req.query?.limit )|| 100 ;
			const offset=(+req.query?.offset )||0;

			const users = await agentController.getAllAgents({offset,limit});
			console.log(users.length);
			
			res
				.code(200)
				.header('Content-Type', 'application/json; charset=utf-8')
				.send((users));		}
	);

	server.get('/:_id', 
		{ schema: getAgentSchema },

		async (req:FastifyRequest, res:FastifyReply) => {
			req.log.info('get one agent from db');
			const agentId=(req.params as Record<string,string>)._id;
			const agent = await agentController.getUser(agentId);
			if(agent){
				return res.status(200).send(agent);}
			else{
				return res.status(404).send({message:'Agent not found for the requested id.'});
			}
		});

	server.post('/', 
		{ schema: addAgentSchema },
	
		async (req:FastifyRequest<any,any>, res:FastifyReply) => {
			req.log.info('Add agent to db');
			const agent = await agentController.createAgent(req.body);
			res.status(201).send(agent);
		});

	server.put('/:_id',
		{ schema: updateAgentSchema },
	
		async (req:FastifyRequest<any,any>, res:FastifyReply) => {
			const userId=(req.params as Record<string,string>)._id;
			req.log.info('Update agent to db');
			const agent = await agentController.updateAgent(userId, req.body);
			res.status(200).send(agent);
		});

	server.delete(
		'/:_id',
		{ schema: deleteAgentSchema },
		async (req:FastifyRequest, res:FastifyReply) => {
			const agentId=(req.params as Record<string,string>)._id;
			req.log.info(`delete agent ${agentId} from db`);
			const data=	await agentController.deleteAgent(agentId);
			if(data){
				return res.send({message :`agent by id ${agentId} removed.`});

			}else {
				throw res.status(404).send({message:'agent not found'});
			}

		}
	);

	next();
}
