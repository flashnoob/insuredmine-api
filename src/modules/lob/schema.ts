export const LOBSchema = {
	'categoryName': {
		'type': 'string'
	}
};

export const listLOBSchema = {
	'tags': [
		'LOB'
	  ],
	  query: {
		type: 'object',
		properties: {
			limit: { type: 'string' },
			offset: { type: 'string' }

		}
	},
	summary: 'list lobs',
	description: 'list lobs',
	response: {
	
	}
};

export const deleteLOBSchema = {'tags': [
	'LOB'
],
summary: 'delete LOB',
description: 'delete LOB',
params: {
	type: 'object',
	required: ['_id'],
	properties: {
		_id: { type: 'string' }
	}
},

};
export const getLOBSchema = {'tags': [
	'LOB'
],
summary: 'get LOB',
description: 'get LOB',
params: {
	type: 'object',
	required: ['_id'],
	properties: {
		_id: { type: 'string' }
	}
},

};
export const addLOBSchema = {'tags': [
	'LOB'
],
'description': 'Optional description in *Markdown*',

'summary': 'Add a new LOB',
'body': {
	'type': 'object',
	'properties': LOBSchema,
	'required': [
		'categoryName'
	]},
};

export const updateLOBSchema = {'tags': [
	'LOB'
],
params: {
	type: 'object',	required: ['_id'],

	properties: {
	  _id: {
			type: 'string',
			description: 'LOB id'
	  }
	}
},

'description': 'Optional description in *Markdown*',

'summary': 'update a LOB',
'body': {
	'type': 'object',
	'properties': LOBSchema,
},

  

};
