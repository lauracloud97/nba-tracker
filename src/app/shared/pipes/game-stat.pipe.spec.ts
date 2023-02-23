import { GameStatPipe } from './game-stat.pipe';

describe('GameStatPipe', () => {
  it('create an instance', () => {
    const pipe = new GameStatPipe();
    expect(pipe).toBeTruthy();
  });
});
