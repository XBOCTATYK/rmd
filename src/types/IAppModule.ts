export interface IAppModule<CONFIG extends Pick<string, any>, EXP extends Pick<string, any>> {
    init: (config: CONFIG) => this
    start: () => void
    stop: () => void
    exports: () => EXP
}
