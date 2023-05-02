const Manager = require('../lib/manager');

describe('Manager', () => {
    it('should hold solid references to its properties', () => {
        const mgrName = "John";
        const mgrID = "4";
        const mgrEmail = "john@gmail.com";
        const mgrOfficeNum = "5";
        const manager = new Manager(mgrName, mgrID, mgrEmail, mgrOfficeNum);
        expect(manager.name).toEqual(mgrName);
        expect(manager.id).toEqual(mgrID);
        expect(manager.email).toEqual(mgrEmail);
        expect(manager.officeNumber).toEqual(mgrOfficeNum);
    });

    describe('getName', () => {
        it('should return this.name', () => {
            const manager = new Manager("John", "4", "john@gmail.com", "5");
            expect(manager.getName()).toEqual("John");
        });
    });

    describe('getID', () => {
        it('should return this.id', () => {
            const manager = new Manager("John", "4", "john@gmail.com", "5");
            expect(manager.getID()).toEqual("4");
        });
    });

    describe('getEmail', () => {
        it('should return this.email', () => {
            const manager = new Manager("John", "4", "john@gmail.com", "5");
            expect(manager.getEmail()).toEqual("john@gmail.com");
        });
    });

    describe('getRole', () => {
        it('should return the string \"Manager\"', () => {
            const manager = new Manager();
            expect(manager.getRole()).toEqual("Manager");
        });
    });

    describe('getRoleSpecificDataField', () => {
        it('should return the string \"Office Number\"', () => {
            const mgrDataField = "Office Number";
            const manager = new Manager();
            expect(manager.getRoleSpecificDataField()).toEqual(mgrDataField);
        });
    });

    describe('getRoleSpecificData', () => {
        it('should return this.officeNumber', () => {
            const officeNum = "5";
            const manager = new Manager("John", "4", "john@gmail.com", "5");
            expect(manager.getRoleSpecificData()).toEqual(officeNum);
        });
    });
});

// A new suite to test situations where Manager instance might have undefined fields
describe('Manager', () => {
    it('should have \'undefined\' for fields not set in initialization', () => {
        const incompleteManager = new Manager();
        expect(incompleteManager.getName()).toBeUndefined();
        expect(incompleteManager.getID()).toBeUndefined();
        expect(incompleteManager.getEmail()).toBeUndefined();
        expect(incompleteManager.getRoleSpecificData()).toBeUndefined();
    });
});