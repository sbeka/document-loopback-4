import {DefaultCrudRepository} from '@loopback/repository';
import {Documents, DocumentsRelations} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DocumentsRepository extends DefaultCrudRepository<
  Documents,
  typeof Documents.prototype.id,
  DocumentsRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Documents, dataSource);
  }
}
