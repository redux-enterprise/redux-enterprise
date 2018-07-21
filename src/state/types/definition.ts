import { IReducerMap, Reducer } from './reducer'
import { ISelectorMap } from './selector'
import { IModelDefinition } from './model'

export interface IInvokeDefinitionOptions {
    initialState?: any
    [name: string]: any
  }
  
export type ReducerMapOrConstructor<LocalState> = IReducerMap<LocalState>|ReducerMapConstructor<LocalState>
export type ReducerMapConstructor<LocalState> = (options: IInvokeDefinitionOptions) => IReducerMap<LocalState>

export interface ICreateDefinition<LocalState> {
  reducers: ReducerMapOrConstructor<LocalState>
  selectors: ISelectorMap<LocalState>
  defaultState: LocalState
  transformInitialState?: (initialState: any) => LocalState
}

export interface IDefinitionReducerMap<LocalState> {
  [name: string]: Reducer<LocalState>
}

export interface IReducerDefinition {
  generate: (namespacing: string[], topLevel?: boolean) => IModelDefinition
}