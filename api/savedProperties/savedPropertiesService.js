const pool = require('../../config/dbconfig');

module.exports = {
    postFavourites: (data) => {
        console.log(data.property_id);
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO favourites (userId, property_id) VALUES (?, ?)`,
                [data.userId, data.property_id],
                (error, results) => {
                    if (error) {
                        console.log("adfasd", error);
                        reject(error);
                    }
                    console.log('Sucessfully saved favorites');
                    resolve(results);
                }
            );
        });
    },

    removeFavourites: (property_id, userId) => {
        return new Promise((resolve, reject) => {
            pool.query(`DELETE FROM favourites WHERE property_id = ? AND userId = ? `,
                [
                    property_id,
                    userId
                ],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    console.log("Sucessfully removed from database! ");
                    resolve(results);
                });
        });
    },

    getFavouriteDetails: () => {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM favourites`,
                [],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    console.log("Sucessfully retrived from the database");
                    resolve(results);
                });
        })
    },

    getFavouriteData: (userId) => {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT prop.* FROM PROPERTY prop
            INNER JOIN favourites fav
            ON fav.property_id = prop.property_id
            WHERE fav.userId = ?`,
                [
                    userId
                ],
                (error, results) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    console.log("Geted the data");
                    resolve(results);
                });
        });
    },

    removeSavedProperty: (propertyId) => {
        return new Promise((resolve, reject) => {
            pool.query(`DELETE FROM favourites WHERE property_id = ?`,
                [
                    propertyId
                ],
                (error, results) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    console.log("removed the data");
                    resolve(results);
                });
        });
    }

};