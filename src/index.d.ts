declare global {
  class AddScopePlugin {
    public constructor(config: object)

    public apply(compiler: any): void;
  }
}

export { AddScopePlugin };

export {
  ILibraryConfig,
  IPluginConfig,
  IStyleInput,
  IAttributesInput,
} from './ILibraryConfig';

export {
  IType,
  IMember,
  ITypeDefine,
  IBindingContextData,
  IKusuTools,
  IPluginRenderArgs,
  IPluginUpdateArgs,
  IPlugin,
  IOptions,
} from './IPlugin';
