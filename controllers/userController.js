const User = require('../models/User');
const secret = require('../config/config');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await User.create({  name, email, password  });
        res.json('User registration successful');
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ message: 'Error occurred during user registration' });
    }
};

const findUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: parseInt(req.params.id) } });
        if (user) {
            return res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ message: 'Error occurred while fetching user' });
    }
};

const findUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        console.log("Showing user information");
        res.json(users);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ message: 'Error occurred while fetching users' });
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.destroy({ where: { id: parseInt(req.params.id) } });
        res.json('User deleted successfully');
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ message: 'Error occurred while deleting the user' });
    }
};

const updateUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        await User.update({ name, password, email }, { where: { id: parseInt(req.params.id) } });
        res.json('User updated successfully');
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ message: 'Error occurred while updating the user' });
    }
};

const authenticateUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const isUserAuthenticated = await User.findOne({ where: { email, password } });

        if (isUserAuthenticated) {
            const token = jwt.sign({ id: email }, secret.secret, { expiresIn: 86400 });
            res.json({
                name: isUserAuthenticated.name,
                email: isUserAuthenticated.email,
                token: token
            });
        } else {
            res.status(401).json({ message: 'User not found or authentication failed' });
        }
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ message: 'Error occurred during authentication' });
    }
};

module.exports = { createUser, findUser, findUsers, deleteUser, updateUser, authenticateUser };