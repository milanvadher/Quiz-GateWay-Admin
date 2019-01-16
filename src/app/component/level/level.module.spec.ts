import { LevelModule } from './level.module';

describe('LevelModule', () => {
  let levelModule: LevelModule;

  beforeEach(() => {
    levelModule = new LevelModule();
  });

  it('should create an instance', () => {
    expect(levelModule).toBeTruthy();
  });
});
