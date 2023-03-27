import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}
  @Post()
  createTodo(@Body() body: any) {
    return this.todosService.create(body);
  }
  @Get()
  findTodos() {
    return this.todosService.find();
  }
  @Get('/:id')
  findTodoById(@Param('id') id: string) {
    return this.todosService.findOne(parseInt(id));
  }
  @Patch('/:id')
  updateTodoStatus(@Param('id') id: string, @Body() body: any) {
    return this.todosService.update(parseInt(id), body);
  }
}
