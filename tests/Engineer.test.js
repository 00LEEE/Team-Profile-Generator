// Import the Engineer class from the appropriate file location
const Engineer = require('./lib/engineer');

// Test suite for Engineer class
describe('Engineer', () => {
    // Test to ensure that the object properties are set correctly
    it('should hold solid references to its properties', () => {
        const engineer = new Engineer("John", "4", "john@gmail.com", "Pulsar");
        expect(engineer.name).toEqual("John");
        expect(engineer.id).toEqual("4");
        expect(engineer.email).toEqual("john@gmail.com");
        expect(engineer.githubUsername).toEqual("Pulsar");
    });

    // Test for the getName method
    describe('getName', () => {
        it('should return this.name', () => {
            const engineer = new Engineer("John", "4", "john@gmail.com", "Pulsar");
            expect(engineer.getName()).toEqual("John");
        });
    });

    // Test for the getID method
    describe('getID', () => {
        it('should return this.id', () => {
            const engineer = new Engineer("John", "4", "john@gmail.com", "Pulsar");
            expect(engineer.getID()).toEqual("4");
        });
    });

    // Test for the getEmail method
    describe('getEmail', () => {
        it('should return this.email', () => {
            const engineer = new Engineer("John", "4", "john@gmail.com", "Pulsar");
            expect(engineer.getEmail()).toEqual("john@gmail.com");
        });
    });

    // Test for the getRole method
    describe('getRole', () => {
        it('should return the string \"Engineer\"', () => {
            const engineer = new Engineer();
            expect(engineer.getRole()).toEqual("Engineer");
        });
    });

    // Test for the getRoleSpecificDataField method
    describe('getRoleSpecificDataField', () => {
        it('should return the string \"GitHub Username\"', () => {
            const engineer = new Engineer();
            expect(engineer.getRoleSpecificDataField()).toEqual("GitHub Username");
        });
    });

    // Test for the getRoleSpecificData method
    describe('getRoleSpecificData', () => {
        it('should return this.githubUsername', () => {
            const engineer = new Engineer("John", "4", "john@gmail.com", "Pulsar");
            expect(engineer.getRoleSpecificData()).toEqual("Pulsar");
        });
    });
});

// Test suite for situations where Engineer instance might have undefined fields
describe('Engineer', () => {
    it('should have \'undefined\' for fields not set in initialization', () => {
        const incompleteEngineer = new Engineer();
        expect(incompleteEngineer.getName()).toBeUndefined();
        expect(incompleteEngineer.getID()).toBeUndefined();
        expect(incompleteEngineer.getEmail()).toBeUndefined();
        expect(incompleteEngineer.getRoleSpecificData()).toBeUndefined();
    });
});