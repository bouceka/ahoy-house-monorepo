import { Test, TestingModule } from '@nestjs/testing';
import { OccupiedRoomResolver } from './occupied-room.resolver';
import { OccupiedRoomService } from './occupied-room.service';

describe('OccupiedRoomResolver', () => {
  let resolver: OccupiedRoomResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OccupiedRoomResolver, OccupiedRoomService],
    }).compile();

    resolver = module.get<OccupiedRoomResolver>(OccupiedRoomResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
