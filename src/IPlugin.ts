
export interface IPluginRenderArgs {
  props: object, // use define
  el: HTMLElement, // plugin wrapper
}

export interface IPluginUpdateArgs {
  props: object, // use define
}

export default interface IPlugin{
  render:(args: IPluginRenderArgs)=>void
  update:(args: IPluginRenderArgs)=>void
}
