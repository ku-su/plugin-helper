interface IEventList {
  eventName: string,  // 事件名
  eventDescription: string,  // 事件描述
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
  allowDataSourceBind?: boolean,  // 是否可以选择上下文数据, 默认值时true
  seo?: string[] | boolean,
  // 自定义的类型
  dataType?: 'text' | 'int' | 'decimal' | 'bool' | 'datetime' | 'date' | 'time' | 'dbRef' | 'textList' | 'intList' | 'decimalLis' | 'boolList' | 'datetimeList' | 'dateList' | 'timeList' | 'dbRefList',
  rules?: Array<'required' | 'url' | 'email' | 'number' | 'phone' | 'max'> // 验证规则
}

interface IBaseAttribute extends IAttribute {
  type: 'title' | 'desc' | 'divider' | 'name' | 'isRequired' | 'animate' | 'disabled' | 'input' | 'number' | 'datePicker' | 'radio' | 'contextData' | 'optionValueInput' | 'tagSelect'
}

interface IBaseStyle extends IBaseAttribute {
  /**
   * 配置
   * {
   *    id: xxx
   *    customStyle: '.color'
   * }
   *
   * #pluginInstanceId .color {
   *   xxx: 配置项的值
   * }
   */
  customStyle: string | { [styleAttribute: string]: string }  // 将值赋值给指定的样式名
}

interface IEnums {
  label: string,  // 选项显示的文字
  value: string | number | boolean  //  选项背后的值
}

interface ISelectAttribute extends IAttribute {
  enums?: IEnums[] | { [x: string]: string | number | boolean },  // 下拉框选项
  type: 'select', // 类型
}

interface IStackAttribute extends IAttribute {
  type: 'stack',  // 可展开折叠面板
  fields: Array<IBaseAttribute | ISelectAttribute | IStackAttribute>, // 每个折叠面板的配置项
  layerField?: string,    // 每一个面板层显示的字段
  uniqueField?: string,   // 唯一项
  itemTemplate?: object,  // 新增项的数据模板
  addButtonText?: string  // 添加按钮的文案
}

interface IValueType {
  property: string,  // 属性名
  dataType: 'text' | 'int' | 'decimal' | 'bool' | 'datetime' | 'date' | 'time' | 'dbRef' | 'textList' | 'intList' | 'decimalLis' | 'boolList' | 'datetimeList' | 'dateList' | 'timeList' | 'dbRefList' | IValueType[],  // 类型
  defaultValue: any,  // 默认值
  id: number  // 唯一值
}

export interface IPluginConfig {
  pluginName: string, // 插件名称
  pluginType?: 'container' | 'control', // 插件类型。container(容器)，control(插件)
  previewImage?: string,  // 插件预览图 database64的字符串
  attributes: Array<'title' | 'desc' | 'divider' | 'name' | 'isRequired' | 'animate' | 'disabled' | IBaseAttribute | ISelectAttribute | IStackAttribute>, // 属性设置
  styles: Array<'visible' | IBaseStyle | ISelectAttribute | IStackAttribute>, // 样式设置
  isFormType?: boolean, // 是否是表单类型插件
  eventLists?: Array<IEventList | string>,  // 事件列表
  valueType?: IValueType[], // 自定义类型
}

interface IPlugins {
  [x: string]: IPluginConfig  // 插件pluginId：插件配置
}

interface IPluginConfigs {
  name: string, // 分组名
  children: IPlugins  // 分组下的插件列表
}

export interface ILibraryConfig {
  name: string, // 插件库的名称
  version: string,  // 插件库版本
  pluginConfigs: Array<IPluginConfigs> | IPlugins,  // 插件库里面插件配置
  locale: { // 语言包
    en: { // 英文
      // 以@开头的字符串
      [x: string]: string
    },
    zh: { // 中文
      [x: string]: string
    },
  }
}