import { listUsersSchema, deleteUserSchema, addUserSchema, updateUserSchema, getUserSchema } from './schema';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { UserController } from './user.controller';
const userController:	UserController = new UserController();
export default function userRouteHandler(server:FastifyInstance, _options, next) {
	server.get(
		'/',
		{ schema: listUsersSchema },
		async (req:FastifyRequest<any>, res:FastifyReply) => {
			req.log.info('list products from db');
			const limit=(+req.query?.limit) || 100 ;
			const offset=(+req.query?.offset) ||0;

			const users = await userController.getAllUsers({offset,limit});
			console.log(users.length);
			
			res
				.code(200)
				.header('Content-Type', 'application/json; charset=utf-8')
				.send((users));		}
	);

	server.get('/:_id',
		{ schema: getUserSchema },
		async (req:FastifyRequest, res:FastifyReply) => {
			req.log.info('get one products from db');
			const userId=(req.params as Record<string,string>)._id;
			const user = await userController.getUser(userId);
			if(user){
				return res.status(200).send(user);}else{
				return res.status(404).send({message:'User not found for the requested id.'});
			}
		});

	server.post('/',
		{ schema: addUserSchema },
		async (req:FastifyRequest, res:FastifyReply) => {
			req.log.info('Add user to db');
			const user = await userController.createUser(req.body);
			res.status(201).send(user);
		});

	server.put('/:_id', 
		{ schema: updateUserSchema },
		async (req:FastifyRequest, res:FastifyReply) => {
			const userId=(req.params as Record<string,string>)._id;
			req.log.info('Update user to db');
			const user = await userController.updateUser(userId, req.body);
			res.status(200).send(user);
		});

	server.delete(
		'/:_id',
		{ schema: deleteUserSchema },
		async (req:FastifyRequest, res:FastifyReply) => {
			const userId=(req.params as Record<string,string>)._id;
			req.log.info(`delete user ${userId} from db`);
			const	data=	await userController.deleteUser(userId);
			if(data){
				return res.send({message :`user by id ${userId} removed.`});

			}else {
				throw res.status(404).send({message:'user not found'});
			}

		}
	);

	next();
}
