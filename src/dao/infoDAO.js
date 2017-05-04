function InfoDAO(){
}
InfoDAO.prototype.getAllTypes = (callback,fallback)=>{
    Http.get("getAllTypes", null, callback, fallback);
};
module.exports = InfoDAO;