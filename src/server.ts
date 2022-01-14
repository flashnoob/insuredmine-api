import fastify from 'fastify';

import dataHandler from './modules/data/data.routes';
import multer from 'fastify-multer'; 
import userRouteHandler from './modules/user/user.route';
import agentRouteHandler from './modules/agent/agent.route';
import LOBRouteHandler from './modules/lob/lob.route';
import CarrierRouteHandler from './modules/carrier/carrier.route';
import PolicyRouteHandler from './modules/policy/policy.route';

 
require('./plugins/db');

function createServer() {
	const server = fastify();

	server.register(require('fastify-cors'));
	server.register(multer.contentParser);
	server.register(require('fastify-oas'), {
		routePrefix: '/docs',
		exposeRoute: true,
		swagger: {
			info: {
				title: 'insuredmine api',
				description: 'api documentation',
				version: '0.1.0'
			},
			servers: [
				{ url: 'http://localhost:3000', description: 'development' },
				{
					url: 'https://<production-url>',
					description: 'production'
				}
			],
			schemes: ['http'],
			consumes: ['application/json'],
			produces: ['application/json'],
		}
	});
	server.register(userRouteHandler, { prefix: '/user' });
	server.register(dataHandler, { prefix: '/data' });
	server.register(agentRouteHandler, { prefix: '/agent' });
	server.register(LOBRouteHandler, { prefix: '/lob' });
	server.register(CarrierRouteHandler, { prefix: '/carrier' });
	server.register(PolicyRouteHandler, { prefix: '/policy' });

	server.setErrorHandler((error, req, res) => {
		req.log.error(error.toString());
		res.send({ error });
	});

	return server;
}

export default createServer;
