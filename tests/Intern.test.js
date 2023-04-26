const Intern = require('./lib/intern');

describe('Intern', () => {
  describe('Initialization', () => {
    it('should create an object with name, id, email, and school properties', () => {
      const intern = new Intern('John', '4', 'john@gmail.com', 'BYU');
      expect(intern.name).toEqual('John');
      expect(intern.id).toEqual('4');
      expect(intern.email).toEqual('john@gmail.com');
      expect(intern.school).toEqual('BYU');
    });
  });

  describe('getName', () => {
    it('should return the name of the intern', () => {
      const intern = new Intern('John', '4', 'john@gmail.com', 'BYU');
      expect(intern.getName()).toEqual('John');
    });
  });

  describe('getID', () => {
    it('should return the ID of the intern', () => {
      const intern = new Intern('John', '4', 'john@gmail.com', 'BYU');
      expect(intern.getID()).toEqual('4');
    });
  });

  describe('getEmail', () => {
    it('should return the email of the intern', () => {
      const intern = new Intern('John', '4', 'john@gmail.com', 'BYU');
      expect(intern.getEmail()).toEqual('john@gmail.com');
    });
  });

  describe('getRole', () => {
    it('should return "Intern"', () => {
      const intern = new Intern();
      expect(intern.getRole()).toEqual('Intern');
    });
  });

  describe('getSchool', () => {
    it('should return the school of the intern', () => {
      const intern = new Intern('John', '4', 'john@gmail.com', 'BYU');
      expect(intern.getSchool()).toEqual('BYU');
    });
  });

  describe('getRoleSpecificDataField', () => {
    it('should return the string "School"', () => {
      const intern = new Intern();
      expect(intern.getRoleSpecificDataField()).toEqual('School');
    });
  });

  describe('getRoleSpecificData', () => {
    it('should return the school of the intern', () => {
      const intern = new Intern('John', '4', 'john@gmail.com', 'BYU');
      expect(intern.getRoleSpecificData()).toEqual('BYU');
    });
  });

  describe('Undefined Fields', () => {
    it('should have \'undefined\' for fields not set in initialization', () => {
      const incompleteIntern = new Intern();
      expect(incompleteIntern.getName()).toBeUndefined();
      expect(incompleteIntern.getID()).toBeUndefined();
      expect(incompleteIntern.getEmail()).toBeUndefined();
      expect(incompleteIntern.getSchool()).toBeUndefined();
    });
  });
});