import { Model, Types } from 'mongoose';
import type { QueryFilter, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<T extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<T>) {}

  async create(document: Omit<T, '_id'>): Promise<T> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await createdDocument.save()).toJSON();
  }

  async findOne(filterQuery: QueryFilter<T>): Promise<T> {
    const document = await this.model.findOne(filterQuery).lean<T>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: QueryFilter<T>,
    update: UpdateQuery<T>,
  ): Promise<T> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<T>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async find(filterQuery: QueryFilter<T>): Promise<T[]> {
    return this.model.find(filterQuery).lean<T[]>(true);
  }

  async findOneAndDelete(filterQuery: QueryFilter<T>): Promise<T> {
    const document = await this.model
      .findOneAndDelete(filterQuery)
      .lean<T>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }
}
