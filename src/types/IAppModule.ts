export interface IAppModule<CONFIG extends Pick<string | symbol, any>, EXP extends Pick<string | symbol, any>> {
    init: (config: CONFIG) => this | Promise<this>
    exports: () => EXP
}
