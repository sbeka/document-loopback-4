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
import {Profiles} from '../models';
import {ProfilesRepository} from '../repositories';

export class ProfilesController {
  constructor(
    @repository(ProfilesRepository)
    public profilesRepository : ProfilesRepository,
  ) {}

  @post('/profiles', {
    responses: {
      '200': {
        description: 'Profiles model instance',
        content: {'application/json': {schema: getModelSchemaRef(Profiles)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profiles, {
            title: 'NewProfiles',
            exclude: ['id'],
          }),
        },
      },
    })
    profiles: Omit<Profiles, 'id'>,
  ): Promise<Profiles> {
    return this.profilesRepository.create(profiles);
  }

  @get('/profiles/count', {
    responses: {
      '200': {
        description: 'Profiles model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Profiles)) where?: Where<Profiles>,
  ): Promise<Count> {
    return this.profilesRepository.count(where);
  }

  @get('/profiles', {
    responses: {
      '200': {
        description: 'Array of Profiles model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Profiles, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Profiles)) filter?: Filter<Profiles>,
  ): Promise<Profiles[]> {
    return this.profilesRepository.find(filter);
  }

  @patch('/profiles', {
    responses: {
      '200': {
        description: 'Profiles PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profiles, {partial: true}),
        },
      },
    })
    profiles: Profiles,
    @param.query.object('where', getWhereSchemaFor(Profiles)) where?: Where<Profiles>,
  ): Promise<Count> {
    return this.profilesRepository.updateAll(profiles, where);
  }

  @get('/profiles/{id}', {
    responses: {
      '200': {
        description: 'Profiles model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Profiles, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Profiles)) filter?: Filter<Profiles>
  ): Promise<Profiles> {
    return this.profilesRepository.findById(id, filter);
  }

  @patch('/profiles/{id}', {
    responses: {
      '204': {
        description: 'Profiles PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profiles, {partial: true}),
        },
      },
    })
    profiles: Profiles,
  ): Promise<void> {
    await this.profilesRepository.updateById(id, profiles);
  }

  @put('/profiles/{id}', {
    responses: {
      '204': {
        description: 'Profiles PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() profiles: Profiles,
  ): Promise<void> {
    await this.profilesRepository.replaceById(id, profiles);
  }

  @del('/profiles/{id}', {
    responses: {
      '204': {
        description: 'Profiles DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.profilesRepository.deleteById(id);
  }
}
