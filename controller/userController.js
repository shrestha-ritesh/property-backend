//controlling or managing the request

//importing require services:
const pool = require('../config/dbconfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendMail } = require('../sendEmail/nodemailer');

module.exports = {
    register: (req, res) => {
        console.log(req.body);

        const body = req.body;
        console.log(body.email);
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

    //ChangePassword:
    changePassword: (req, res) => {
        const user_id = req.params.userId;
        const body = req.body;

        //Checking the old password:
        pool.query(
            `SELECT * FROM USERS WHERE userId = ?`,
            [
                user_id
            ],
            async (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(400).json({
                        success: 0,
                        error: "something went wrong ! ",
                    });
                }
                // console.log(results);
                if (results.length <= 0) {
                    return res.status(400).json({
                        success: 0,
                        error: "user not found ! ",
                    });
                }
                if (!results || !(await bcrypt.compare(req.body.oldPassword, results[0].password))) { // It is used to compare the user provided password with actual password
                    return res.status(400).json({
                        success: 0,
                        error: "Old password is incorrect"
                    });
                } else {
                    // console.log(body.newPassword);
                    let hashedPassword = await bcrypt.hash(body.newPassword, 8);
                    console.log(hashedPassword, 'This is hashed');

                    pool.query(
                        `UPDATE USERS SET password = ? WHERE userId = ?`,
                        [hashedPassword, user_id,],
                        (error, results) => {
                            if (error) {
                                console.log(error);
                            } else {
                                return res.json({
                                    success: 1,
                                    message: 'Successfully Changed !',
                                })
                            }
                        }
                    );
                }
            }
        );
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

    updateUserDetails: async (req, res) => {
        const body = req.body;
        const user_id = req.params.userId;
        pool.query(
            `UPDATE USERS SET name = ?, email = ?, contact_no = ? WHERE userId = ?`,
            [
                body.name,
                body.email,
                body.contact_no,
                user_id
            ],
            (error, results) => {
                if (error) {
                    res.send({ success: 0, error: "Something went wrong!", });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Successfully saved updated user data!"
                });
            }
        );

    },

    deleteUser: async (req, res) => {
        const user_id = req.params.userId;
        console.log("Check!!!!!!! ");
        pool.query(
            `DELETE FROM users WHERE userId = ?`,
            [
                user_id
            ],
            (error, results) => {
                if (error) {
                    res.send({ success: 0, error: "Something went wrong!", });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Successfully deleted user data!"
                });
            }
        );

    }
}