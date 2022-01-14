export const userSchema = {
	'email': {
		'type': 'string'
	},
	'firstName': {
		'type': 'string'
	},
	'accountName': {
		'type': 'string'
	},
	'dob': {
		'type': 'string'
	},
	'gender': {
		'type': 'string'
	},
	'phone': {
		'type': 'string'
	},
	'city': {
		'type': 'string'
	},
	'address': {
		'type': 'string'
	},
	'userType': {
		'type': 'string'
	},
	'accountType': {
		'type': 'string'
	},
	'state': {
		'type': 'string'
	},
	'zip': {
		'type': 'integer'
	},
	'policyId': {
		'type': 'string'
	}
};

export const listUsersSchema = {
	'tags': [
		'User'
	  ],  query: {
		type: 'object',
		properties: {
			limit: { type: 'string' },
			offset: { type: 'string' }

		}
	},
	summary: 'list users',
	description: 'list users',
	response: {
	
	}
};

export const deleteUserSchema = {'tags': [
	'User'
],
summary: 'delete user',
description: 'delete user',
params: {
	type: 'object',
	required: ['_id'],
	properties: {
		_id: { type: 'string' }
	}
},

};
export const getUserSchema = {'tags': [
	'User'
],
summary: 'get user',
description: 'get user',
params: {
	type: 'object',
	required: ['_id'],
	properties: {
		_id: { type: 'string' }
	}
},

};
export const addUserSchema = {'tags': [
	'User'
],
'description': 'Optional description in *Markdown*',

'summary': 'Add a new User',
'body': {
	'type': 'object',
	'properties': userSchema,
	'required': [
		'email',
		'firstName',
		'accountName',
		'dob',
		'gender',
		'phone',
		'city',
		'address',
		'userType',
		'accountType',
		'state',
		'zip',
		'policyId'
	]},

  

};

export const updateUserSchema = {'tags': [
	'User'
],
params: {
	type: 'object',	required: ['_id'],

	properties: {
	  _id: {
			type: 'string',
			description: 'user id'
	  }
	}
},

'description': 'Optional description in *Markdown*',

'summary': 'update a User',
'body': {
	'type': 'object',
	'properties': userSchema,
},

  

};
