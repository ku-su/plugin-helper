export interface IType {
  id: number,
  params?: IType[]
}

export interface IMember {
  id: number,
  name: string,
  alias: string,
  dataType: string | IType,
}

export interface ITypeDefine {
  id: number,
  alias: string,
  members: IMember[]
}

export interface IBindingContextData {
  data: any,
  dataType: number,
  typeDefines: ITypeDefine[]
}

export interface IOptions {
  defaultContent?: string,
  appendData?: IBindingContextData,
}

export type getType = (type: IType) => any

export interface IPluginHelper {
  getType: getType,
}

export type IDataFromFunction = (originContextData: any[], pluginConfig: object, pluginHelper: IPluginHelper) => any[]

export interface IKusuTools {
  defineContainer: (containerId: string | number, groupName?: string, options?: IOptions) => string,
  isBoundContextData: (contextStr: string | object) => boolean,
  getData: (contextStr: string | object) => any
  getPath: (contextStr: string | object) => any
  getType: getType
}

export interface IPluginRenderArgs {
  pluginWrapperEl: HTMLElement, // plugin wrapper
  kusuTools: IKusuTools
  props: any, // use define
}

export interface IPluginUpdateArgs {
  kusuTools: IKusuTools
  props: any, // use define
}

export interface IPlugin {
  render: (args: IPluginRenderArgs) => void
  update: (args: IPluginUpdateArgs) => void
}