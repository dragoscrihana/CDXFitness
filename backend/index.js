const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/");
app.use(express.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get("/", (req, res) => {
    res.send("Express App is Running")
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port)
    }
})

app.use('/images', express.static('upload/images'));
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        console.log(file);
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({ storage: storage })
app.post("/upload", upload.single('exercise'), (req, res) => {
    if (!req.file) {
        return res.json({ success: false, error: "No file uploaded" });
    }

    res.json({
        success: true,
        image_url: `http://localhost:4000/images/${req.file.filename}`
    });
});

const fetchuser = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, "secret_ecom");
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
};

const Users = mongoose.model("Users", {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    subscription: {
        type: Boolean,
        default: false,
    }
});


app.post('/login', async (req, res) => {
    console.log("Login");
    let success = false;
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id,
                    isAdmin: user.admin
                }
            };
            success = true;
            console.log(user.id);
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success, token, isAdmin: user.admin }); 
        }
        else {
            return res.status(400).json({ success: success, errors: "please try with correct email/password" });
        }
    }
    else {
        return res.status(400).json({ success: success, errors: "please try with correct email/password" });
    }
});


app.post('/signup', async (req, res) => {
    console.log("Sign Up");
    let success = false;
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: success, errors: "existing user found with this email" });
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin,
        subscription: req.body.subscription
    });
    await user.save();
    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    success = true;
    res.json({ success, token })
})


const Exercise = mongoose.model("Exercise", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    sets: {
        type: Number
    },
    reps: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,
    },
});

app.post("/addexercise", async (req, res) => {
    if (!req.body.name || !req.body.image || !req.body.category || !req.body.sets || !req.body.reps || !req.body.description) {
        return res.status(400).json({ success: false, error: "All fields are required" });
    }
    else {
        try {
            let exercises = await Exercise.find({});
            let id;
            if (exercises.length > 0) {
                let last_product_array = exercises.slice(-1);
                let last_product = last_product_array[0];
                id = last_product.id + 1;
            }
            else { id = 1; }
            const exercise = new Exercise({
                id: id,
                name: req.body.name,
                image: req.body.image,
                category: req.body.category,
                sets: req.body.sets,
                reps: req.body.reps,
                description: req.body.description,
            });
            console.log(exercise);
            await exercise.save();
            console.log("Saved");
            res.json({ success: true, name: req.body.name });
        } catch (error) {
            console.error("Error:", error);
            res.json({ success: false });
        }
    }
});

app.post("/removeexercise", async (req, res) => {
    const exercise = await Exercise.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({ success: true, name: req.body.name })
});

app.get("/allexercises", async (req, res) => {
    let exercises = await Exercise.find({});
    console.log("All Exercises");
    res.send(exercises);
});

const findUserByAuthToken = async (authToken) => {
    try {
        const decoded = jwt.verify(authToken, "secret_ecom");

        const userId = decoded.user.id;

        const user = await Users.findById(userId);

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        console.error('Error finding user by auth token:', error);
        return null;
    }
};

app.post('/updateSubscription', async (req, res) => {
    console.log("Subscription update");
    try {
        const authToken = req.body.authToken;

        if (!authToken) {
            return res.status(401).json({ errors: "Please provide a valid auth token" });
        }

        const user = await findUserByAuthToken(authToken);

        if (!user) {
            return res.status(404).json({ errors: "User not found" });
        }

        user.subscription = req.body.subscriptionStatus;
        await user.save();

        res.json({ success: true, message: "Subscription updated successfully" });
    } catch (error) {
        console.error('Error updating subscription:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

app.post('/checkSubscription', async (req, res) => {
    console.log("Subscription Status");
    try {
        const { authToken } = req.body;

        if (!authToken) {
            return res.status(401).json({ errors: "Please provide a valid auth token" });
        }

        const user = await findUserByAuthToken(authToken);

        if (!user) {
            return res.status(404).json({ errors: "User not found" });
        }

        const isSubscribed = user.subscription === true || user.subscription === "true";

        res.json({ success: true, isSubscribed });
    } catch (error) {
        console.error('Error checking subscription:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

app.post('/getUserInfo', async (req, res) => {
    console.log("Getting user info");
    try {
        const { authToken } = req.body;

        if (!authToken) {
            return res.status(401).json({ errors: "Please provide a valid auth token" });
        }

        const user = await findUserByAuthToken(authToken);

        if (!user) {
            return res.status(404).json({ errors: "User not found" });
        }

        const { email, name } = user;

        res.json({ success: true, email, name });
    } catch (error) {
        console.error('Error getting user info:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

app.post('/updateUserInfo', async (req, res) => {
    try {
        const { authToken, name, email } = req.body;

        if (!authToken) {
            return res.status(401).json({ errors: "Please provide a valid auth token" });
        }

        const user = await findUserByAuthToken(authToken);

        if (!user) {
            return res.status(404).json({ errors: "User not found" });
        }

        user.name = name;
        user.email = email;
        await user.save();

        res.json({ success: true, message: "User info updated successfully" });
    } catch (error) {
        console.error('Error updating user info:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

app.post('/changePassword', async (req, res) => {
    try {
        const { authToken, oldPassword, newPassword } = req.body;

        if (!authToken) {
            return res.status(401).json({ error: 'Please provide a valid auth token' });
        }

        const user = await findUserByAuthToken(authToken);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (oldPassword !== user.password) {
            return res.status(400).json({ error: 'Incorrect old password' });
        }

        user.password = newPassword;
        await user.save();

        res.json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get("/allUsers", async (req, res) => {
    let users = await Users.find({});
    console.log("All Users");
    res.send(users);
});

app.post("/removeuser", async (req, res) => {
    const user = await Users.findOneAndDelete({ email: req.body.email });
    console.log("User Removed");
    res.json({ success: true, name: req.body.name })
});

app.post('/updateUserAdminStatus', async (req, res) => {
    try {
      const user = await Users.findOneAndUpdate({ email: req.body.email }, { admin: true });
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.json({ success: true, message: 'User admin status updated successfully' });
    } catch (error) {
      console.error('Error updating user admin status:', error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  });
  

app.post('/updateAdminStatusToFalse', async (req, res) => {
    try {
      const user = await Users.findOneAndUpdate({ email: req.body.email }, { admin: false });
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.json({ success: true, message: 'User admin status updated successfully' });
    } catch (error) {
      console.error('Error updating user admin status:', error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  });