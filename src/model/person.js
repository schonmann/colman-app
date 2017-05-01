function Person(name,email,phone){
    this.id = Util.guid();
    this.name = name;
    this.email = email;
    this.phone = phone;
}
module.exports = Person;