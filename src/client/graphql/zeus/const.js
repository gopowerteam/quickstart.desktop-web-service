/* eslint-disable */

export const AllTypesProps = {
	Query:{
		loginByPassword:{
			username:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:true
			},
			password:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:true
			}
		}
	},
	UserRole: "enum",
	Mutation:{
		syncAppList:{
			apps:{
				type:"AppInput",
				array:true,
				arrayRequired:true,
				required:true
			}
		},
		registerUser:{
			user:{
				type:"RegisterUserInput",
				array:false,
				arrayRequired:false,
				required:true
			}
		}
	},
	AppInput:{
		name:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		},
		title:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		},
		icon:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		}
	},
	RegisterUserInput:{
		username:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		},
		password:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		},
		role:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		}
	}
}

export const ReturnTypes = {
	Query:{
		getAppList:"App",
		loginByPassword:"User",
		getUserList:"User"
	},
	App:{
		name:"String",
		title:"String",
		icon:"String",
		group:"Group"
	},
	Group:{
		name:"String"
	},
	User:{
		username:"String",
		password:"String",
		nickname:"String",
		role:"UserRole",
		desktop:"App"
	},
	Mutation:{
		syncAppList:"App",
		registerUser:"User"
	}
}