export const agentSchema = {

	'name': {
		'type': 'string'
	}
};

export const listAgentSchema = {
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

export const deleteAgentSchema = {'tags': [
	'Agent'
],
summary: 'delete agent',
description: 'delete agent',
params: {
	type: 'object',
	required: ['_id'],
	properties: {
		_id: { type: 'string' }
	}
},

};
export const getAgentSchema = {'tags': [
	'Agent'
],
summary: 'get agent',
description: 'get agent',
params: {
	type: 'object',
	required: ['_id'],
	properties: {
		_id: { type: 'string' }
	}
},

};
export const addAgentSchema = {'tags': [
	'Agent'
],
'description': 'Optional description in *Markdown*',

'summary': 'Add a new Agent',
'body': {
	'type': 'object',
	'properties': agentSchema,
	'required': [
		'name'
	]},
};

export const updateAgentSchema = {'tags': [
	'Agent'
],
params: {
	type: 'object',	required: ['_id'],

	properties: {
	  _id: {
			type: 'string',
			description: 'agent id'
	  }
	}
},

'description': 'Optional description in *Markdown*',

'summary': 'update a Agent',
'body': {
	'type': 'object',
	'properties': agentSchema,
},

  

};
