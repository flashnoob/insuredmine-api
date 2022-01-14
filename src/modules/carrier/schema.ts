export const CarrierSchema = {
	'companyName': {
		'type': 'string'
	}
};

export const listCarrierSchema = {
	'tags': [
		'Carrier'
	  ],
	  query: {
		type: 'object',
		properties: {
			limit: { type: 'string' },
			offset: { type: 'string' }

		}
	},
	summary: 'list Carrier',
	description: 'list Carrier',
	response: {
	
	}
};

export const deleteCarrierSchema = {'tags': [
	'Carrier'
],
summary: 'delete Carrier',
description: 'delete Carrier',
params: {
	type: 'object',
	required: ['_id'],
	properties: {
		_id: { type: 'string' }
	}
},

};
export const getCarrierSchema = {'tags': [
	'Carrier'
],
summary: 'get Carrier',
description: 'get Carrier',
params: {
	type: 'object',
	required: ['_id'],
	properties: {
		_id: { type: 'string' }
	}
},

};
export const addCarrierSchema = {'tags': [
	'Carrier'
],
'description': 'Optional description in *Markdown*',

'summary': 'Add a new Carrier',
'body': {
	'type': 'object',
	'properties': CarrierSchema,
	'required': [
		'companyName'
	]},
};

export const updateCarrierSchema = {'tags': [
	'Carrier'
],
params: {
	type: 'object',	required: ['_id'],

	properties: {
	  _id: {
			type: 'string',
			description: 'Carrier id'
	  }
	}
},

'description': 'Optional description in *Markdown*',

'summary': 'update a Carrier',
'body': {
	'type': 'object',
	'properties': CarrierSchema,
},

  

};
