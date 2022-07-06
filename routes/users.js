const express = require('express');
const user = require('../models/user');
const router = express.Router();
const UserModel = require('../models/user');


// Display All Users Route
// router.get('/', async (req, res) =>{
//     let searchOptions = {};
//     if (req.query.name != null && req.query.name !== '') {
//         searchOptions.name = new RegExp(req.query.name, 'i');
//     }
//     try {
//         const users = await authorModel.find(searchOptions);
//         res.render('./authors/index', {
//             users: users, 
//             searchOptions: req.query
//         });
//     } catch (error) {
//         res.redirect('/');
//     }
// });

// All User Route
router.get('/', (req, res) => {
    res.render('./users/index');
});

// Login User Route
router.get('/login', (req, res) => {
    res.render('./users/login');
});

// New User Route || Register User Route
router.get('/register', (req, res) => {
    res.render('./users/register', {user: new UserModel()});
});

// Create User Route
router.post('/', async (req, res) => {
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email
    })
    try {
        const newUser = await user.save();
        //res.redirect(`users/${newUser.id}`);
        res.redirect(`/`);
    } catch {
        res.render('./users/register' , {
            user: user,
            errorMessage: 'Error Registering User'
        });
    }
    //res.send(req.body.email);
});

module.exports = router;