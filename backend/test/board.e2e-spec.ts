const request = require('supertest');
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('BoardController (e2e)', () => {
  let app: INestApplication;
  let createdBoardId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new board', () => {
    return request(app.getHttpServer())
      .post('/boards')
      .send({ name: 'Test Board' })
      .expect(201)
      .then((response) => {
        expect(response.body.name).toEqual('Test Board');
        createdBoardId = response.body.id;
      });
  });

  it('should get all boards', async () => {
    await request(app.getHttpServer())
      .get('/boards')
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });

  it('should find a board by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/boards/${createdBoardId}`)
      .expect(200);
    
    expect(response.body.id).toEqual(createdBoardId);
  });

  it('should update a board', async () => {
    const updatedName = 'Updated Test Board';
    await request(app.getHttpServer())
      .put(`/boards/${createdBoardId}`)
      .send({ name: updatedName })
      .expect(200)
      .then((response) => {
        expect(response.body.name).toEqual(updatedName);
      });
  });

  it('should delete a board', async () => {
    await request(app.getHttpServer())
      .delete(`/boards/${createdBoardId}`)
      .expect(200);
    await request(app.getHttpServer())
      .get(`/boards/${createdBoardId}`)
      .expect(404);
  });
});