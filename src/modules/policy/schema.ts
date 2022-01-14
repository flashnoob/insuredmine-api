export const policySchema = {
	'policyNumber': {
		'type': 'string'
	},
	'agentId': {
		'type': 'string'
	},
	'carrierId': {
		'type': 'string'
	},
	'categoryId': {
		'type': 'string'
	},
	'policyEndDate': {
		'type': 'string'
	},
	'policyMode': {
		'type': 'string'
	},
	'policyStartDate': {
		'type': 'string'
	},
	'policyType': {
		'type': 'string'
	},
	'premiumAmount': {
		'type': 'number'
	},
	'producerId': {
		'type': 'string'
	}
};

export const listPolicySchema = {
	'tags': [
		'Policy'
	],
	query: {
		type: 'object',
		properties: {
			limit: { type: 'string' },
			offset: { type: 'string' }

		}
	},
	summary: 'list Policy',
	description: 'list Policy',
	response: {
	
	}
};

export const deletePolicySchema = {'tags': [
	'Policy'
],
summary: 'delete Policy',
description: 'delete Policy',
params: {
	type: 'object',
	required: ['_id'],
	properties: {
		_id: { type: 'string' }
	}
},

};
export const getPolicySchema = {'tags': [
	'Policy'
],
summary: 'get Policy',
description: 'get Policy',
params: {
	type: 'object',
	required: ['_id'],
	properties: {
		_id: { type: 'string' }
	}
},

};
export const addPolicySchema = {'tags': [
	'Policy'
],
'description': 'Optional description in *Markdown*',

'summary': 'Add a new Policy',
'body': {
	'type': 'object',
	'properties': policySchema,
	'required': [
		'policyNumber',
		'agentId',
		'carrierId',
		'categoryId',
		'policyEndDate',
		'policyMode',
		'policyStartDate',
		'policyType',
		'premiumAmount',
		'producerId'
	]},
};

export const updatePolicySchema = {'tags': [
	'Policy'
],
params: {
	type: 'object',	required: ['_id'],

	properties: {
		_id: {
			type: 'string',
			description: 'Policy id'
		}
	}
},

'description': 'Optional description in *Markdown*',

'summary': 'update a Policy',
'body': {
	'type': 'object',
	'properties': policySchema,
},
};
