import mongoose from 'mongoose';

describe('user CRUD', () => {
	let server;

	beforeAll(async (done) => {
		done();
		server = await require('../src/index');
		await server.ready();
	});

	afterAll(async (done) => {
		server.close();
		await mongoose.connection.close();
		done();
	});

	test('Add user POST /user', async (done) => {
		server = await require('../src/index');
		const response = await server.inject({
			method: 'POST',
			url: '/user',
			payload: 
				{'_id':{'$oid':'61de97359df7cb498ffc3a83'},'email':'madler@yahoo.ca','__v':0,'address':'170 MATTHIAS CT','city':'MOCKSVILLE','createdAt':{'$date':'2022-01-12T08:54:13.905Z'},'dob':{'$date':'1960-02-11T00:00:00.000Z'},'firstName':'Lura Lucca','gender':'','phone':'8677356559','policyId':{'$oid':'61de8c129df7cb498ff1b071'},'state':'NC','updatedAt':{'$date':'2022-01-12T12:10:53.204Z'},'zip':'27028','userType':'Active Client','accountType':'Commercial'}
			
		});
		expect(response.statusCode).toBe(201);
		done();
	});

	test('Get All User /user', async (done) => {
		const response = await server.inject({
			method: 'GET',
			url: '/user'
		});
		expect(response.statusCode).toBe(200);
		done();
	});

	test('Update user PUT /user/:id', async (done) => {
		const response = await server.inject({
			method: 'PUT',
			url: '/user/5f2678dff22e1f4a3c0782ee',
			payload: {
				unit: 2
			}
		});
		expect(response.statusCode).toBe(200);
		done();
	});

	test('Get one user GET /user/:id', async (done) => {
		const response = await server.inject({
			method: 'GET',
			url: '/user/5f2678dff22e1f4a3c0782ee'
		});
		expect(response.statusCode).toBe(200);
		done();
	});

	test('Delete one user DELETE /user/:_id', async (done) => {
		const response = await server.inject({
			method: 'DELETE',
			url: '/user/61de97359df7cb498ffc3a83'
		});
		expect(response.statusCode).toBe(200);
		done();
	});

	test('user Route', async (done) => {
		const response = await server.inject({
			method: 'GET',
			url: '/user'
		});
		expect(response.statusCode).toBe(200);
		done();
	});

});