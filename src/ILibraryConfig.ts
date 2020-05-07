interface IEventList {
  eventName: string,  // 事件名
  eventDescription: string,  // 事件描述
}

interface IContainerList {
  containerField: string, // 指定容器的字段
  childrenField: string[],
}

interface IVisibleObject {
  relationField: string,  // 关联的字段
  relationValue: string,  // 关联的字段的值
  condition?: 'eq' | 'neq',  // 字段与字段值之间的条件 eq(等于), neq(不等于)
}

interface IAttribute {
  id: string, // 标识
  label?: string, // 标题
  default?: any,  // 默认值
  placeholder?: string, // 提示文字
  visible?: IVisibleObject | IVisibleObject[] | (({ data: object }) => boolean);  // 显示的条件,true为显示,false为隐藏
  visibleConditionRelation?: 'and' | 'or',  // 当visible为数组时，条件之间的关系，and(和)，or(或)
  useFlow?: boolean,  // 是否可以选择上下文数据, 默认值时true
  seo?: string[] | boolean,
  // todo 检查使用的类型是 js内置类型，还是自定义
  dataType?: any,
  rules?: Array<'required' | 'url' | 'email' | 'number' | 'phone' | 'max'> // 验证规则
}

interface IEnums {
  label: string,
  value: string | number | boolean
}

interface IBaseAttribute extends IAttribute {
  type: 'title' | 'desc' | 'divider' | 'name' | 'isRequired' | 'animate' | 'disabled' | 'input' | 'number' | 'datePicker' | 'radio' | 'flowData' | 'optionValueInput' | 'tagSelect'
}

interface ISelectAttribute extends IAttribute {
  enums?: IEnums[] | { [x: string]: string | number | boolean },
  type: 'select',
}

interface IStackAttribute extends IAttribute {
  type: 'stack',
  fields: Array<IBaseAttribute | ISelectAttribute | IStackAttribute>,
  parentFlowDataField?: string,
  layerField?: string,
  uniqueField?: string,
  itemTemplate?: object,  // 模板
  addButtonText?: string
}

export interface IPluginConfig {
  pluginName: string,
  pluginType?: 'container' | 'control', // 插件类型。container(容器)，control(插件)
  previewImage?: string,
  attributes: Array<'title' | 'desc' | 'divider' | 'name' | 'isRequired' | 'animate' | 'disabled' | IBaseAttribute | ISelectAttribute | IStackAttribute>,
  styles: Array<'visible' | IBaseAttribute | ISelectAttribute | IStackAttribute>,
  isFormType?: boolean, // 是否是表单类型插件
  containerList?: Array<IContainerList | string>,
  eventLists?: Array<IEventList | string>,
  valueType?: any,
}

interface IPlugins {
  [x: string]: IPluginConfig
}

interface IPluginConfigs {
  name: string,
  children: IPlugins
}

export default interface ILibraryConfig {
  name: string, // 插件库的名称
  version: string,  // 插件库版本
  pluginConfigs: Array<IPluginConfigs> | IPlugins,  // 插件库里面插件配置
  locale: { // 语言包
    en: {
      [x: string]: string
    },
    zh: {
      [x: string]: string
    },
  }
}
