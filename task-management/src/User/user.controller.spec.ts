import { Test, TestingModule } from '@nestjs/testing';
import { userController } from './user.controller';
import { userService } from './user.service';
import { userDto } from './DTO/user.dto';

describe('userController', () => {
  let controller: userController;
  const mockUserService = {
    addUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [userController],
      providers: [{ provide: userService,
        useValue: mockUserService }],
    }).compile();

    controller = module.get<userController>(userController);
  });

  it('should call service addUser and return the result',async () => {
    const userPayload: userDto = {
      name: 'Jon Doe',
      email: 'example@gmail.com',
      password: 'StringPassword',
    };
    const serviceResponse = {message: 'user created successfully'};
    mockUserService.addUser.mockResolvedValue(serviceResponse);
    const result = await controller.addUser(userPayload);

    expect(mockUserService.addUser).toHaveBeenCalledWith(userPayload);
    expect(result).toEqual(serviceResponse);
  });
});
