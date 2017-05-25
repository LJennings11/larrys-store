import { LarryStorePage } from './app.po';

describe('larry-store App', () => {
  let page: LarryStorePage;

  beforeEach(() => {
    page = new LarryStorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
