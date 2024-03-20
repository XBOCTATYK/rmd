import {IDataProvider, IDataSourceConfiguration} from '../common.types';
import {DataSource} from 'typeorm';

export class TypeOrmPostgresDataProvider implements IDataProvider {
  private readonly dataSource: DataSource;
  private readonly config: IDataSourceConfiguration;

  constructor(dataSourceConfig: IDataSourceConfiguration) {
    const {host, port, username, password, database, schema, logging} = dataSourceConfig;
    this.config = dataSourceConfig;
    this.dataSource = new DataSource({
      type: 'postgres', host, port, username, password, database, schema, logging,
    });
  }

  public getDataSource() {
    return this.dataSource;
  }

  public async connect() {
    return await this.dataSource.initialize();
  }

  public async disconnect() {
    await this.dataSource.destroy();
  }
}
