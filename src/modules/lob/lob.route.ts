import { listLOBSchema,  addLOBSchema,deleteLOBSchema,getLOBSchema,updateLOBSchema } from './schema';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { LOBController } from './lob.controller';
const lobController:	LOBController = new LOBController();
export default function lobRouteHandler(server:FastifyInstance, _options, next) {
	server.get(
		'/',
		{ schema: listLOBSchema },
		async (req:FastifyRequest<any>, res:FastifyReply) => {
			req.log.info('list lobs from db');
			const limit=(+req.query?.limit) ||100 ;
			const offset=(+req.query?.offset) ||0;
			const lobs = await lobController.getAllLOB({offset,limit});
			res
				.code(200)
				.header('Content-Type', 'application/json; charset=utf-8')
				.send((lobs));		}
	);

	server.get('/:_id', 
		{ schema: getLOBSchema },

		async (req:FastifyRequest, res:FastifyReply) => {
			req.log.info('get one lob from db');
			const lobId=(req.params as Record<string,string>)._id;
			const lob = await lobController.getLOB(lobId);
			if(lob){
				return res.status(200).send(lob);}
			else{
				return res.status(404).send({message:'LOB not found for the requested id.'});
			}
		});

	server.post('/', 
		{ schema: addLOBSchema },
	
		async (req:FastifyRequest<never,never>, res:FastifyReply) => {
			req.log.info('Add lob to db');
			const lob = await lobController.createLOB(req.body);
			res.status(201).send(lob);
		});

	server.put('/:_id',
		{ schema: updateLOBSchema },
	
		async (req:FastifyRequest<never,never>, res:FastifyReply) => {
			const userId=(req.params as Record<string,string>)._id;
			req.log.info('Update lob to db');
			const lob = await lobController.updateLOB(userId, req.body);
			res.status(200).send(lob);
		});

	server.delete(
		'/:_id',
		{ schema: deleteLOBSchema },
		async (req:FastifyRequest, res:FastifyReply) => {
			const lobId=(req.params as Record<string,string>)._id;
			req.log.info(`delete lob ${lobId} from db`);
			const data=	await lobController.deleteLOB(lobId);
			if(data){
				return res.send({message :`lob by id ${lobId} removed.`});

			}else {
				throw res.status(404).send({message:'lob not found'});
			}

		}
	);

	next();
}
