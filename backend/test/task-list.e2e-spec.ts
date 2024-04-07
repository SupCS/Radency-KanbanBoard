const request = require('supertest');
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('TaskListController (e2e)', () => {
    let app: INestApplication;
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
          .send({ name: 'Test Board for TaskList' })
          .expect(201);
    
        createdBoardId = boardResponse.body.id;
      });
    
      afterAll(async () => {
        if (createdBoardId) {
            await request(app.getHttpServer())
              .delete(`/boards/${createdBoardId}`)
              .expect(200);
          }
        await app.close();
      });
  
    it('should create a new task list', async () => {
      const response = await request(app.getHttpServer())
        .post('/task-lists')
        .send({ name: 'Test Task List', boardId: createdBoardId })
        .expect(201);
      
      expect(response.body.name).toEqual('Test Task List');
      createdTaskListId = response.body.id;
    });
  
    it('should get all task lists for a board', async () => {
      await request(app.getHttpServer())
        .get(`/task-lists?boardId=${createdBoardId}`)
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          const createdList = response.body.find(list => list.id === createdTaskListId);
          expect(createdList).toBeTruthy();
          expect(createdList.name).toEqual('Test Task List');
        });
    });
  
    it('should find a task list by ID', async () => {
      await request(app.getHttpServer())
        .get(`/task-lists/${createdTaskListId}`)
        .expect(200)
        .then((response) => {
          expect(response.body.id).toEqual(createdTaskListId);
          expect(response.body.name).toEqual('Test Task List');
        });
    });
  
    it('should update a task list', async () => {
      const updatedName = 'Updated Task List';
      await request(app.getHttpServer())
        .put(`/task-lists/${createdTaskListId}`)
        .send({ name: updatedName })
        .expect(200)
        .then((response) => {
          expect(response.body.name).toEqual(updatedName);
        });
    });
  
    it('should delete a task list', async () => {
      await request(app.getHttpServer())
        .delete(`/task-lists/${createdTaskListId}`)
        .expect(200);
  
      await request(app.getHttpServer())
        .get(`/task-lists/${createdTaskListId}`)
        .expect(404);
    });
  });
  