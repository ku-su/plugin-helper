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
  typeDefines: ITypeDefine
}

export interface IOptions {
  defaultContent?: string,
  appendData?: IBindingContextData[],
  // 是否自动渲染，默认为true
  autoRenderContainer?: boolean,
  // 容器
  containerFrag?: 'className' | string | HTMLElement,
  // 找到容器的选择器
  containerSelector?: string
}

export type getType = (type: IType) => any

export interface IPluginHelper {
  getType: getType,
}

export type IDataFromFunction = (originContextData: any[], pluginConfig: object, pluginHelper: IPluginHelper) => any[]

export type IDataFilter = (child: any) => boolean;

export interface IDefineContainerReturn {
  containerKey: string,
  // 插件自身调用 渲染容器，当options的autoRenderContainer为false才有此函数
  renderContainer?: () => void,
}

export enum Panels {
  style,
  attribute
}

export type IFieldPath = Array<string | number>

export interface IKusuTools {
  defineContainer: (containerId: string | number, groupName?: string | null | undefined, options?: IOptions) => IDefineContainerReturn,
  isBoundContextData: (fieldPath: IFieldPath) => boolean,
  getData: (fieldPath: IFieldPath) => any
  getPath: (fieldPath: IFieldPath) => any
  getType: (fieldPath: IFieldPath) => any,
  locale: (value: string, data?: object) => string
  isEditState: boolean
  triggerEvent: (eventType: string, eventsConfig?: any[]) => void
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