export interface IDataSource {
    openSession(): void
    closeSession(): void
}
