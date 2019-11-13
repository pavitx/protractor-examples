import { browser, by, element } from 'protractor';

describe('the contact list', () => {
    it('with filter: should find existing ' +
        'contact "Craig Service"', () => {
        let tbody = element(by.tagName('tbody'));
        let trs = tbody.all(by.tagName('tr'));
    let craigService = trs.filter(elem => {
        return elem.all(by.tagName('td')).get(1).getText()
    .then(text => {
            return text === 'Craig Service';
        });
    });
        expect(craigService.count()).toBeGreaterThan(0);
    expect(craigService.all(by.tagName('td'))
        .get(2).getText())
    .toBe('craig.services@example.com');
    });
});
