declare global {
  class AddScopePlugin {
    public constructor(config: object)

    public apply(compiler: any): void;
  }
}

export { AddScopePlugin };

export * from './ILibraryConfig';

export * from './IPlugin';
