import {browser, by, element, ElementFinder} from 'protractor';
import {ContactListPageObject} from "./contact-list.po";

export class NewContactPageObject {
    inputName: ElementFinder;
    inputEmail: ElementFinder;
    inputPhone: ElementFinder;

    constructor() {
        this.inputName = element(by.id('contact-name'));
        this.inputEmail = element(by.id('contact-email'));
        this.inputPhone = element(by.css('input[type="tel"]'));
    }

    setContactInfo(name: string, email: string,
                   phoneNumber: string) {
        this.inputName.sendKeys(name);
        if (email) {
            this.inputEmail.sendKeys(email);
        }
        if (phoneNumber) {
            this.inputPhone.sendKeys(phoneNumber);
        }
    }

    clickCreateButton() {
        element(by.buttonText('Create')).click();
        return new ContactListPageObject();
    }

    getName() {
        return this.inputName.getAttribute('value');
    }


    getPhone() {
        return this.inputPhone.getAttribute('value');
    }

    getEmail() {
        return this.inputEmail.getAttribute('value');
    }

}
