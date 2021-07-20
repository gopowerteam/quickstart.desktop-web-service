type ZEUS_INTERFACES = never
type ZEUS_UNIONS = never

export type ValueTypes = {
    ["Group"]: AliasType<{
	id?:true,
	name?:true,
		__typename?: true
}>;
	["App"]: AliasType<{
	updatedAt?:true,
	createdAt?:true,
	enable?:true,
	name?:true,
	title?:true,
	icon?:true,
	group?:ValueTypes["Group"],
		__typename?: true
}>;
	["User"]: AliasType<{
	id?:true,
	enable?:true,
	updatedAt?:true,
	createdAt?:true,
	username?:true,
	password?:true,
	nickname?:true,
	role?:true,
	desktop?:ValueTypes["App"],
		__typename?: true
}>;
	["UserRole"]:UserRole;
	["ResultString"]: AliasType<{
	data?:true,
		__typename?: true
}>;
	["Query"]: AliasType<{
loginByPassword?: [{	username:string,	password:string},ValueTypes["ResultString"]],
	getUserByToken?:ValueTypes["User"],
	getAppList?:ValueTypes["App"],
		__typename?: true
}>;
	["Mutation"]: AliasType<{
setAdministrator?: [{	user:ValueTypes["UserInput"]},ValueTypes["User"]],
syncAppList?: [{	apps:ValueTypes["AppInput"][]},ValueTypes["App"]],
AddUserDesktopApp?: [{	app:ValueTypes["AppInput"]},ValueTypes["App"]],
RemoveUserDesktopApp?: [{	app:string},ValueTypes["App"]],
		__typename?: true
}>;
	["UserInput"]: {
	username:string,
	password:string,
	role?:string
};
	["AppInput"]: {
	name:string,
	title:string,
	icon:string
}
  }

export type ModelTypes = {
    ["Group"]: {
		id:number,
	name:string
};
	["App"]: {
		updatedAt:number,
	createdAt:number,
	enable:boolean,
	name:string,
	title:string,
	icon:string,
	group:ModelTypes["Group"]
};
	["User"]: {
		id:number,
	enable:boolean,
	updatedAt:number,
	createdAt:number,
	username:string,
	password:string,
	nickname?:string,
	role:ModelTypes["UserRole"],
	desktop:ModelTypes["App"][]
};
	["UserRole"]: GraphQLTypes["UserRole"];
	["ResultString"]: {
		data:string
};
	["Query"]: {
		loginByPassword:ModelTypes["ResultString"],
	getUserByToken:ModelTypes["User"],
	getAppList:ModelTypes["App"][]
};
	["Mutation"]: {
		setAdministrator:ModelTypes["User"],
	syncAppList:ModelTypes["App"][],
	AddUserDesktopApp:ModelTypes["App"],
	RemoveUserDesktopApp:ModelTypes["App"]
};
	["UserInput"]: GraphQLTypes["UserInput"];
	["AppInput"]: GraphQLTypes["AppInput"]
    }

export type GraphQLTypes = {
    ["Group"]: {
	__typename: "Group",
	id: number,
	name: string
};
	["App"]: {
	__typename: "App",
	updatedAt: number,
	createdAt: number,
	enable: boolean,
	name: string,
	title: string,
	icon: string,
	group: GraphQLTypes["Group"]
};
	["User"]: {
	__typename: "User",
	id: number,
	enable: boolean,
	updatedAt: number,
	createdAt: number,
	username: string,
	password: string,
	nickname?: string,
	role: GraphQLTypes["UserRole"],
	desktop: Array<GraphQLTypes["App"]>
};
	["UserRole"]: UserRole;
	["ResultString"]: {
	__typename: "ResultString",
	data: string
};
	["Query"]: {
	__typename: "Query",
	loginByPassword: GraphQLTypes["ResultString"],
	getUserByToken: GraphQLTypes["User"],
	getAppList: Array<GraphQLTypes["App"]>
};
	["Mutation"]: {
	__typename: "Mutation",
	setAdministrator: GraphQLTypes["User"],
	syncAppList: Array<GraphQLTypes["App"]>,
	AddUserDesktopApp: GraphQLTypes["App"],
	RemoveUserDesktopApp: GraphQLTypes["App"]
};
	["UserInput"]: {
		username: string,
	password: string,
	role?: string
};
	["AppInput"]: {
		name: string,
	title: string,
	icon: string
}
    }
export enum UserRole {
	ADMIN = "ADMIN",
	MEMBER = "MEMBER"
}


export type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;
export type ZeusState<T extends (...args: any[]) => Promise<any>> = NonNullable<
  UnwrapPromise<ReturnType<T>>
>;
export type ZeusHook<
  T extends (
    ...args: any[]
  ) => Record<string, (...args: any[]) => Promise<any>>,
  N extends keyof ReturnType<T>
> = ZeusState<ReturnType<T>[N]>;

type WithTypeNameValue<T> = T & {
  __typename?: true;
};
type AliasType<T> = WithTypeNameValue<T> & {
  __alias?: Record<string, WithTypeNameValue<T>>;
};
export interface GraphQLResponse {
  data?: Record<string, any>;
  errors?: Array<{
    message: string;
  }>;
}
type DeepAnify<T> = {
  [P in keyof T]?: any;
};
type IsPayLoad<T> = T extends [any, infer PayLoad] ? PayLoad : T;
type IsArray<T, U> = T extends Array<infer R> ? InputType<R, U>[] : InputType<T, U>;
type FlattenArray<T> = T extends Array<infer R> ? R : T;

type NotUnionTypes<SRC extends DeepAnify<DST>, DST> = {
  [P in keyof DST]: SRC[P] extends '__union' & infer R ? never : P;
}[keyof DST];

type ExtractUnions<SRC extends DeepAnify<DST>, DST> = {
  [P in keyof SRC]: SRC[P] extends '__union' & infer R
    ? P extends keyof DST
      ? IsArray<R, DST[P] & { __typename: true }>
      : {}
    : never;
}[keyof SRC];

type IsInterfaced<SRC extends DeepAnify<DST>, DST> = FlattenArray<SRC> extends ZEUS_INTERFACES | ZEUS_UNIONS
  ? ExtractUnions<SRC, DST> &
      {
        [P in keyof Omit<Pick<SRC, NotUnionTypes<SRC, DST>>, '__typename'>]: DST[P] extends true
          ? SRC[P]
          : IsArray<SRC[P], DST[P]>;
      }
  : {
      [P in keyof Pick<SRC, keyof DST>]: IsPayLoad<DST[P]> extends true ? SRC[P] : IsArray<SRC[P], DST[P]>;
    };



export type MapType<SRC, DST> = SRC extends DeepAnify<DST> ? IsInterfaced<SRC, DST> : never;
type InputType<SRC, DST> = IsPayLoad<DST> extends { __alias: infer R }
  ? {
      [P in keyof R]: MapType<SRC, R[P]>;
    } &
      MapType<SRC, Omit<IsPayLoad<DST>, '__alias'>>
  : MapType<SRC, IsPayLoad<DST>>;
type Func<P extends any[], R> = (...args: P) => R;
type AnyFunc = Func<any, any>;
export type ArgsType<F extends AnyFunc> = F extends Func<infer P, any> ? P : never;
export type OperationToGraphQL<V, T> = <Z extends V>(o: Z | V, variables?: Record<string, any>) => Promise<InputType<T, Z>>;
export type SubscriptionToGraphQL<V, T> = <Z extends V>(
  o: Z | V,
  variables?: Record<string, any>,
) => {
  ws: WebSocket;
  on: (fn: (args: InputType<T, Z>) => void) => void;
  off: (e: { data?: InputType<T, Z>; code?: number; reason?: string; message?: string }) => void;
  error: (e: { data?: InputType<T, Z>; message?: string }) => void;
  open: () => void;
};
export type CastToGraphQL<V, T> = (resultOfYourQuery: any) => <Z extends V>(o: Z | V) => InputType<T, Z>;
export type SelectionFunction<V> = <T>(t: T | V) => T;
export type fetchOptions = ArgsType<typeof fetch>;
type websocketOptions = typeof WebSocket extends new (
  ...args: infer R
) => WebSocket
  ? R
  : never;
export type chainOptions =
  | [fetchOptions[0], fetchOptions[1] & {websocket?: websocketOptions}]
  | [fetchOptions[0]];
export type FetchFunction = (
  query: string,
  variables?: Record<string, any>,
) => Promise<any>;
export type SubscriptionFunction = (
  query: string,
  variables?: Record<string, any>,
) => void;
type NotUndefined<T> = T extends undefined ? never : T;
export type ResolverType<F> = NotUndefined<F extends [infer ARGS, any] ? ARGS : undefined>;

export declare function Thunder(
  fn: FetchFunction,
  subscriptionFn: SubscriptionFunction
):{
  query: OperationToGraphQL<ValueTypes["Query"],GraphQLTypes["Query"]>,mutation: OperationToGraphQL<ValueTypes["Mutation"],GraphQLTypes["Mutation"]>
}

export declare function Chain(
  ...options: chainOptions
):{
  query: OperationToGraphQL<ValueTypes["Query"],GraphQLTypes["Query"]>,mutation: OperationToGraphQL<ValueTypes["Mutation"],GraphQLTypes["Mutation"]>
}

export declare const Zeus: {
  query: (o: ValueTypes["Query"]) => string,mutation: (o: ValueTypes["Mutation"]) => string
}

export declare const Cast: {
  query: CastToGraphQL<
  ValueTypes["Query"],
  GraphQLTypes["Query"]
>,mutation: CastToGraphQL<
  ValueTypes["Mutation"],
  GraphQLTypes["Mutation"]
>
}

export declare const Selectors: {
  query: SelectionFunction<ValueTypes["Query"]>,mutation: SelectionFunction<ValueTypes["Mutation"]>
}

export declare const resolverFor : <
  T extends keyof ValueTypes,
  Z extends keyof ValueTypes[T],
  Y extends (
    args: Required<ValueTypes[T]>[Z] extends [infer Input, any] ? Input : any,
    source: any,
  ) => Z extends keyof ModelTypes[T] ? ModelTypes[T][Z] | Promise<ModelTypes[T][Z]> : any
>(
  type: T,
  field: Z,
  fn: Y,
) => (args?:any, source?:any) => void;

export declare const Gql: ReturnType<typeof Chain>
