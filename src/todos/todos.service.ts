import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  // findOne(arg0: number) {
  //   throw new Error('Method not implemented.');
  // }
  constructor(@InjectRepository(Todo) private repo: Repository<Todo>) {}

  create(body: any) {
    /** We create todo object first and then save the record to our database */
    const todo = this.repo.create(body);
    return this.repo.save(todo);
  }

  find() {
    /** We can filter find by passing params to repository find() method */
    return this.repo.find();
  }

  findOne(id: number) {
    /** Repositroy findOne() method will return single record that matches input
     * Where as find() will return all records that matches our input
     */
    if (!id) return null;
    return this.repo.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, body) {
    /**
     * Get the record
     * Check if record exists
     * If exists only then update our record
     */
    const todo = await this.repo.findOne({
      where: {
        id,
      },
    });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return this.repo.save({ ...todo, ...body, isCompleted: true });
  }
}
