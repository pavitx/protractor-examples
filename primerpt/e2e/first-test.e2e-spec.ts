import { browser } from 'protractor';

describe('your first protractor test', () => {
  it('should load a page and verify the url', () => {
    browser.get('/#/');
    expect(browser.getCurrentUrl())
        .toEqual(browser.baseUrl + '/#/');
  });
});