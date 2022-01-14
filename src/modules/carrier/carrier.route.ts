import { listCarrierSchema,  addCarrierSchema,deleteCarrierSchema,getCarrierSchema,updateCarrierSchema } from './schema';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CarrierController } from './carrier.controller';
const carrierController:	CarrierController = new CarrierController();
export default function CarrierRouteHandler(server:FastifyInstance, _options, next) {
	server.get(
		'/',
		{ schema: listCarrierSchema },
		async (req:FastifyRequest<any>, res:FastifyReply) => {
			req.log.info('list carrier from db');
			const limit=(+req.query?.limit) ||100 ;
			const offset=(+req.query?.offset) ||0;
			const carrier = await carrierController.getAllCarrier({offset,limit});
			res
				.code(200)
				.header('Content-Type', 'application/json; charset=utf-8')
				.send((carrier));		}
	);

	server.get('/:_id', 
		{ schema: getCarrierSchema },

		async (req:FastifyRequest, res:FastifyReply) => {
			req.log.info('get one carrier from db');
			const carrierId=(req.params as Record<string,string>)._id;
			const carrier = await carrierController.getCarrier(carrierId);
			if(carrier){
				return res.status(200).send(carrier);}
			else{
				return res.status(404).send({message:'carrier not found for the requested id.'});
			}
		});

	server.post('/', 
		{ schema: addCarrierSchema },
	
		async (req:FastifyRequest<never,never>, res:FastifyReply) => {
			req.log.info('Add carrier to db');
			const carrier = await carrierController.createCarrier(req.body);
			res.status(201).send(carrier);
		});

	server.put('/:_id',
		{ schema: updateCarrierSchema },
	
		async (req:FastifyRequest<never,never>, res:FastifyReply) => {
			const userId=(req.params as Record<string,string>)._id;
			req.log.info('Update carrier to db');
			const carrier = await carrierController.updateCarrier(userId, req.body);
			res.status(200).send(carrier);
		});

	server.delete(
		'/:_id',
		{ schema: deleteCarrierSchema },
		async (req:FastifyRequest, res:FastifyReply) => {
			const carrierId=(req.params as Record<string,string>)._id;
			req.log.info(`delete carrier ${carrierId} from db`);
			const data=	await carrierController.deleteCarrier(carrierId);
			if(data){
				return res.send({message :`carrier by id ${carrierId} removed.`});

			}else {
				throw res.status(404).send({message:'carrier not found'});
			}

		}
	);

	next();
}
