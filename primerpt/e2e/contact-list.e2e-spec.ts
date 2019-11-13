import {browser, by, element} from 'protractor';


export interface Contact {
    name?: string;
    email?: string;
    tel?: string;
}


describe('the contact list', () => {

    let expectedContactList: Contact[] = [{
        name: 'Adrian Directive',
        email: 'adrian.directive@example.com',
        tel: '+1 (703) 555-0123'
    }, {
        name: 'Rusty Component',
        email: 'rusty.component@example.com',
        tel: '+1 (441) 555-0122'
    }, {
        name: 'Jeff Pipe',
        email: 'jeff.pipe@example.com',
        tel: '+1 (714) 555-0111'
    }, {
        name: 'Craig Service',
        email: 'craig.services@example.com',
        tel: '+1 (514) 555-0132'
    }];

    beforeAll(() => {
        browser.get('/#/');
    });


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

    it('with map: should create a map object', () => {
        let tbody = element(by.tagName('tbody'));
        let trs = tbody.all(by.tagName('tr'));
        let contactList = trs.map(elem => {
            let contact: Contact = {};
            let promises: any[] = [];
            let tds = elem.all(by.tagName('td'));
            promises.push(tds.get(1).getText().then(text => {
                contact.name = text;
            }));
            promises.push(tds.get(2).getText().then(text => {
                contact.email = text;
            }));
            promises.push(tds.get(3).getText().then(text => {
                contact.tel = text;
            }));

            return Promise.all(promises).then(() => {
                return contact;
            });
        });
        expect(contactList).toBeDefined();
        contactList.then((contacts: Contact[]) => {
            expect(contacts.length).toEqual(4);
            expect(contacts).toEqual(expectedContactList);
        });
    });

    it('with reduce: get a list of contact names', () => {
        let tbody = element(by.tagName('tbody'));
        let trs = tbody.all(by.tagName('tr'));
        let contacts = trs.reduce((acc, curr) => {
            let name = curr.all(by.tagName('td')).get(1);
            return name.getText().then(text => {
                return acc === '' ? text : acc + ', ' + text;
            });
        }, '');
        expect(contacts).toEqual(
            'Adrian Directive, Rusty Component, Jeff Pipe, Craig Service');
    });
});
