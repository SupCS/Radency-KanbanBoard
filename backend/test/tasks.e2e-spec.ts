const request = require('supertest');
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('TasksController (e2e)', () => {
    let app: INestApplication;
    let createdTaskId: number;
    let createdBoardId: number;
    let createdTaskListId: number;
  
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [AppModule],
        }).compile();
    
        app = moduleFixture.createNestApplication();
        await app.init();
    
        const boardResponse = await request(app.getHttpServer())
          .post('/boards')
          .send({ name: 'Test Board for Tasks' })
          .expect(201);
        createdBoardId = boardResponse.body.id;
    
        const taskListResponse = await request(app.getHttpServer())
          .post('/task-lists')
          .send({ name: 'Test Task List', boardId: createdBoardId })
          .expect(201);
        createdTaskListId = taskListResponse.body.id;
      });
  
    afterAll(async () => {
        if (createdBoardId) {
            await request(app.getHttpServer())
                .delete(`/boards/${createdBoardId}`)
                .expect(200);
            }
        await app.close();
    });
  
    it('should create a new task', async () => {
      const createTaskDto = {
        taskName: 'Test Task',
        taskDescription: 'Test Description',
        dueDate: '2024-12-31',
        priority: 'High',
        taskListId: createdTaskListId
      };
      const response = await request(app.getHttpServer())
        .post('/tasks')
        .send(createTaskDto)
        .expect(201);
      
      expect(response.body.taskName).toEqual(createTaskDto.taskName);
      createdTaskId = response.body.id;
    });
  
    it('should get all tasks', async () => {
      await request(app.getHttpServer())
        .get('/tasks')
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          const createdTask = response.body.find(task => task.id === createdTaskId);
          expect(createdTask).toBeDefined();
          expect(createdTask.taskName).toEqual('Test Task');
        });
    });
  
    it('should find a task by ID', async () => {
      await request(app.getHttpServer())
        .get(`/tasks/${createdTaskId}`)
        .expect(200)
        .then((response) => {
          expect(response.body.id).toEqual(createdTaskId);
          expect(response.body.taskName).toEqual('Test Task');
        });
    });
  
    it('should update a task', async () => {
      const updatedTask = {
        taskName: 'Updated Task',
        taskDescription: 'Updated Description',
        dueDate: '2025-01-01',
        priority: 'Medium',
      };
      await request(app.getHttpServer())
        .put(`/tasks/${createdTaskId}`)
        .send(updatedTask)
        .expect(200)
        .then((response) => {
          expect(response.body.taskName).toEqual(updatedTask.taskName);
        });
    });
  
    it('should delete a task', async () => {
      await request(app.getHttpServer())
        .delete(`/tasks/${createdTaskId}`)
        .expect(200);
  
      await request(app.getHttpServer())
        .get(`/tasks/${createdTaskId}`)
        .expect(404);
    });
  });
  