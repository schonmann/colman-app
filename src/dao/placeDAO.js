function PlaceDAO(){
}
PlaceDAO.prototype.getAll = (callback, fallback) => {
    Http.get("getAllPlaces", null, callback, fallback);
};
PlaceDAO.prototype.insert = (places, callback, fallback) => {
    Http.post("insertPlaces", places, callback, fallback);
};
PlaceDAO.prototype.delete = (Places, callback, fallback) => {
    Http.post("deletePlaces", places, callback, fallback);
};
module.exports = PlaceDAO;
