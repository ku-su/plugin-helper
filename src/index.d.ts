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
  styleInput,
  attributesInput,
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
} from './IPlugin';
