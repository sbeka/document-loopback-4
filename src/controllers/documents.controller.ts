import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Documents} from '../models';
import {DocumentsRepository} from '../repositories';

export class DocumentsController {
  constructor(
    @repository(DocumentsRepository)
    public documentsRepository : DocumentsRepository,
  ) {}

  @post('/documents', {
    responses: {
      '200': {
        description: 'Documents model instance',
        content: {'application/json': {schema: getModelSchemaRef(Documents)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Documents, {
            title: 'NewDocuments',
            exclude: ['id'],
          }),
        },
      },
    })
    documents: Omit<Documents, 'id'>,
  ): Promise<Documents> {
    return this.documentsRepository.create(documents);
  }

  @get('/documents/count', {
    responses: {
      '200': {
        description: 'Documents model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Documents)) where?: Where<Documents>,
  ): Promise<Count> {
    return this.documentsRepository.count(where);
  }

  @get('/documents', {
    responses: {
      '200': {
        description: 'Array of Documents model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Documents, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Documents)) filter?: Filter<Documents>,
  ): Promise<Documents[]> {
    return this.documentsRepository.find(filter);
  }

  @patch('/documents', {
    responses: {
      '200': {
        description: 'Documents PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Documents, {partial: true}),
        },
      },
    })
    documents: Documents,
    @param.query.object('where', getWhereSchemaFor(Documents)) where?: Where<Documents>,
  ): Promise<Count> {
    return this.documentsRepository.updateAll(documents, where);
  }

  @get('/documents/{id}', {
    responses: {
      '200': {
        description: 'Documents model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Documents, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Documents)) filter?: Filter<Documents>
  ): Promise<Documents> {
    return this.documentsRepository.findById(id, filter);
  }

  @patch('/documents/{id}', {
    responses: {
      '204': {
        description: 'Documents PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Documents, {partial: true}),
        },
      },
    })
    documents: Documents,
  ): Promise<void> {
    await this.documentsRepository.updateById(id, documents);
  }

  @put('/documents/{id}', {
    responses: {
      '204': {
        description: 'Documents PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() documents: Documents,
  ): Promise<void> {
    await this.documentsRepository.replaceById(id, documents);
  }

  @del('/documents/{id}', {
    responses: {
      '204': {
        description: 'Documents DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.documentsRepository.deleteById(id);
  }
}
