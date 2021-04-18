//controlling or managing the request

//importing require services:
const pool = require('../config/dbconfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// exports.register = (req, res) => {
//     console.log(req.body);
//     res.send(req.body);
// }

module.exports = {
    register: (req, res) => {
        console.log(req.body);

        const body = req.body;

        pool.query(
            'SELECT email FROM users WHERE email = ?',
            [body.email],
            async (error, results) => {
                if (error) {
                    console.log(error);
                }
                if (results.length > 0) {
                    return res.status(400).json({
                        success: 0,
                        error: 'The email is already in use !'
                    });
                } else if (body.password !== body.passwordConfirm) {
                    return res.status(400).json({
                        success: 0,
                        error: 'Passwords does not match !'
                    });
                }
                console.log(body.password);
                let hashedPassword = await bcrypt.hash(body.password, 8);
                console.log(hashedPassword, 'This is hashed');

                pool.query(
                    `INSERT INTO users(name, email, password, contact_no ) VALUES (?,?,?,?)`,
                    [body.name, body.email, hashedPassword, body.contact_no],
                    (error, results) => {
                        if (error) {
                            console.log(error);
                        } else {
                            return res.json({
                                success: 1,
                                message: 'Successfully registered !',
                                data: results
                            })
                        }
                    }
                );
            },
        );
    },

    getUser: (req, res) => {
        pool.query(
            'SELECT * FROM USERS',
            [],
            (error, results) => {
                if (error) {
                    console.log(error);
                }
                if (results.length <= 0) {
                    return res.json({
                        success: 0,
                        message: "There is no data in db !"
                    });
                }
                return res.json({
                    success: 1,
                    data: results,
                });
            }
        );
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: "required email and password ! ",
                });
            };

            pool.query(
                `SELECT * FROM USERS WHERE EMAIL = ?`,
                [email],
                async (error, results) => {
                    // console.log('This is DB password: ', results[0].password);
                    if (results.length <= 0) {
                        console.log(error);
                        return res.status(400).json({
                            error: "user not found ! ",
                        });
                    }

                    console.log('Requested passowrd: ', password);
                    console.log('compared bcrypt data: ', bcrypt.compareSync(password, results[0].password));
                    if (!results || !(await bcrypt.compare(req.body.password, results[0].password))) { // It is used to compare the user provided password with actual password
                        res.status(400).json({
                            error: "email or password is incorrect"
                        });
                    } else {
                        const id = results[0].userId;
                        const username = results[0].name;
                        console.log(id);

                        const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_EXPIRY_TIME
                        });

                        console.log('Token time started !' + token);
                        res.send({
                            id: id,
                            name: username,
                            token: token
                        })
                    }
                }
            );


        } catch (error) {
            console.log(error);
        }
    },

    //gETTING USER iD based on id for profile
    getUserProfileDetail: (req, res) => {
        const user_id = req.params.userId;
        pool.query(
            'SELECT userId, name, email, contact_no, reg_date FROM USERS WHERE USERID = ?',
            [user_id],
            (error, results) => {
                if (error) {
                    console.log(error);
                }
                if (results.length <= 0) {
                    return res.json({
                        success: 0,
                        message: "There is no data in db !"
                    });
                }
                return res.json({
                    success: 1,
                    data: results,
                });
            }
        );
    },
}