import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, VersioningType } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { userRepo } from '../src/User/user.repository';
import { authRepo } from '../src/Auth/auth.repository';
import { prismaService } from '../src/Prisma/prisma.service';
import { JwtAuthGuard } from '../src/Auth/jwt-auth.guard';
import { RolesGuard } from '../src/Auth/role.guard';

describe('Full App Integratn (e2e', () => {
  let app: INestApplication<App>;

  const mockUserRepo = {
    addUser: jest.fn(),
  };

  const mockAuthRepo = {
    loginUser: jest.fn(),
    addtask: jest.fn(),
    viewTask: jest.fn(),
    deleteTask: jest.fn(),
  };

  const mockPrismaService = {
    task: {
      findMany: jest.fn(),
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(userRepo)
      .useValue(mockUserRepo)
      .overrideProvider(authRepo)
      .useValue(mockAuthRepo)
      .overrideProvider(prismaService)
      .useValue(mockPrismaService)
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context) => {
          const req = context.switchToHttp().getRequest();
          req.user = { id: 1, email: 'example@anymail.com' };
          return true;
        },
      })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    app.enableVersioning({
      type: VersioningType.URI,
      prefix: 'v',
    });
    await app.init();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET / should return Hello World', async () => {
    await request(app.getHttpServer())
      .get('/v1/')
      .expect(200)
      .expect('Hello World!');
  });

  it('POST /adduser should create a user', async () => {
    const payload = {
      name: 'Jon Doe',
      email: 'example@anymail.com',
      password: 'StringPassword',
    };
    const expected = { message: 'user Created Successfully' };

    mockUserRepo.addUser.mockResolvedValue(expected);

    await request(app.getHttpServer())
      .post('/v1/adduser')
      .send(payload)
      .expect(201)
      .expect(expected);

    expect(mockUserRepo.addUser).toHaveBeenCalledWith(payload);
  });

  it('POST /login should return auth tokens', async () => {
    const payload = {
      email: 'example@anymail.com',
      password: 'StringPassword',
    };
    const expected = {
      accesstoken: 'access-token',
      refreshtoken: 'refresh-token',
      name: 'Jon Doe',
      email: 'example@anymail.com',
    };

    mockAuthRepo.loginUser.mockResolvedValue(expected);

    await request(app.getHttpServer())
      .post('/v1/login')
      .send(payload)
      .expect(201)
      .expect(expected);

    expect(mockAuthRepo.loginUser).toHaveBeenCalledWith(payload);
  });

  it('POST /addTask should create a task for authenticated user', async () => {
    const payload = {
      title: 'Write tests',
      description: 'Create integration tests',
    };
    const expected = { id: 10, ...payload, ownerID: 1 };

    mockAuthRepo.addtask.mockResolvedValue(expected);

    await request(app.getHttpServer())
      .post('/v1/addTask')
      .set('Authorization', 'Bearer token')
      .send(payload)
      .expect(201)
      .expect(expected);

    expect(mockAuthRepo.addtask).toHaveBeenCalledWith(payload, 1);
  });

  it('GET /getTasks should return all tasks', async () => {
    const expected = [
      {
        id: 1,
        title: 'Task 1',
        description: 'Desc',
        ownerID: 1,
        user: { id: 1, name: 'Jon Doe' },
      },
    ];

    mockPrismaService.task.findMany.mockResolvedValue(expected);

    await request(app.getHttpServer())
      .get('/v1/getTasks')
      .set('Authorization', 'Bearer token')
      .expect(200)
      .expect(expected);

    expect(mockPrismaService.task.findMany).toHaveBeenCalledWith({
      include: { user: true },
    });
  });

  it('GET /getUserTasks should return authenticated user tasks', async () => {
    const expected = [
      { id: 1, title: 'Task 1', description: 'Desc', ownerID: 1 },
    ];

    mockAuthRepo.viewTask.mockResolvedValue(expected);

    await request(app.getHttpServer())
      .get('/v1/getUserTasks')
      .set('Authorization', 'Bearer token')
      .expect(200)
      .expect(expected);

    expect(mockAuthRepo.viewTask).toHaveBeenCalledWith(1);
  });

  it('DELETE /deleteTask/:id should delete task and return remaining tasks', async () => {
    const expected = {
      message: 'Task deleted successfully',
      allTasks: [{ id: 2, title: 'Task 2', description: 'Desc', ownerID: 1 }],
    };

    mockAuthRepo.deleteTask.mockResolvedValue(expected);

    await request(app.getHttpServer())
      .delete('/v1/deleteTask/1')
      .set('Authorization', 'Bearer token')
      .expect(200)
      .expect(expected);

    expect(mockAuthRepo.deleteTask).toHaveBeenCalledWith(1);
  });
});
