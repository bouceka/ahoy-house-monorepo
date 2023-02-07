import { Test, TestingModule } from '@nestjs/testing';
import { OccupiedRoomService } from './occupied-room.service';

describe('OccupiedRoomService', () => {
  let service: OccupiedRoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OccupiedRoomService],
    }).compile();

    service = module.get<OccupiedRoomService>(OccupiedRoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
