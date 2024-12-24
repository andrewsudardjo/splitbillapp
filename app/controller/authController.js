import bcrypt from 'bcrypt';
import User from '../model/userSchema.js'; // Adjust the path as needed
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User with this email already exists.");
        }

        // Create a new user (password hashing is handled by the pre-save hook)
        const newUser = new User({ 
                username, 
                email, 
                password // Unhashed password
        });
        await newUser.save();
        console.log("Hashed Password:", newUser.password);

        // Generate a JWT token
        const token = jwt.sign({ id: newUser._id, username: newUser.username, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token in the response
        res.clearCookie('token');
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600000 // 1 hour
        });

        res.redirect('/split/group/new');
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Server error");
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("User with this email does not exist.");
        }

        // Check if the username matches
        if (user.username !== username) {
            return res.status(400).send("Username does not match with the email.");
        }

        // Log debug information
        console.log("Provided Password:", password);
        console.log("Stored Hashed Password:", user.password);

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.error("Password mismatch");
            return res.status(400).send("Invalid password.");
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token in the response
        res.clearCookie('token');
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600000 // 1 hour
        });

        // Redirect to the desired page
        res.redirect('/split/group/new');
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).send("Server error");
    }
};


// Route to render the login page
export const loginPage = (req, res) => {
        res.render('login'); // Render the 'login' view
    };
    