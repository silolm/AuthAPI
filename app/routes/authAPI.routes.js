module.exports = (app) => {
    const authAPI = require('../controllers/auth.controller');

    // LogIn
    app.post('/logIn', authAPI.logIn);

    // Register users
    app.post('/register', authAPI.verifyToken(app), authAPI.register);
};