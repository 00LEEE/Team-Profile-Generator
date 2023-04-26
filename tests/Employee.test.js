const Employee = require('../lib/employee');

describe('Employee', () => {
    const employee = new Employee("John", "4", "john@gmail.com");

    describe('getName', () => {
        it('should return this.name', () => {
            expect(employee.getName()).toEqual("John");
        });
    });

    describe('getID', () => {
        it('should return this.id', () => {
            expect(employee.getID()).toEqual("4");
        });
    });

    describe('getEmail', () => {
        it('should return this.email', () => {
            expect(employee.getEmail()).toEqual("john@gmail.com");
        });
    });

    describe('getRole', () => {
        it('should return the string \"Employee\"', () => {
            expect(employee.getRole()).toEqual("Employee");
        });
    });
});