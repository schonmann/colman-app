function PersonDAO(){
    
}
PersonDAO.prototype.getAll = (callback, fallback) => {
    Http.get("getAllPerson", null, callback, fallback);
};
PersonDAO.prototype.insert = (person, callback, fallback) => {
    Http.post("insertPerson", person, callback, fallback);
};
PersonDAO.prototype.delete = (person, callback, fallback) => {
    Http.post("deletePerson", person, callback, fallback);
};
module.exports = PersonDAO;
