const express = require("express");
const app = express();
const dotEnv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./users");
const Job = require("./jobs");
dotEnv.config();

let loggedInEmail;
let isValidNumber = (num) => {
  let len = Math.ceil(Math.log10(num + 1)) - 1;

  if (len === 10) return true;
  else return false;
};

let isValidEmail = (email) => {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
  if (re.test(email)) {
    return true;
  }

  return false;
};

const isRegistered = async (req, res, next) => {
  let { name, email, number, password, checkbox } = req.body;
  if (checkbox === "on") checkbox = true;
  else checkbox = false;

  const user = await User.findOne({ email });
  if (user) {
    // res.json({status:1 , message: "Already registered using same email-id, Please log in!" });
    res.redirect(`${process.env.HOST_URL}/login`);
  } else {
    // console.log(name, email, number, password, checkbox);
    if (
      name.trim().length >= 1 &&
      isValidEmail(email) &&
      isValidNumber(number) &&
      password.trim().length >= 1 &&
      checkbox === true
    ) {
      req.headers.user = user;
      // console.log(req.headers.user);
      next();
    } else {
      let missingFields = [];
      if (name.trim().length < 1) missingFields.push("name");
      if (isValidEmail(email) === false) missingFields.push("email");
      if (isValidNumber(number) === false) missingFields.push("number");
      if (password.trim().length < 1) missingFields.push("password");
      if (checkbox === false) missingFields.push("checkbox");

      res.json({
        status: 2,
        message: "Please fill all the fields",
        missingFields,
      });
      //   res.redirect('http://localhost:3000/');
    }
  }
};

const isFilledJobDetails = (req, res, next) => {
  let {
    companyName,
    logoUrl,
    jobPosition,
    salary,
    jobType,
    jobLocation,
    location,
    jobDesc,
    aboutCompany,
    skills,
  } = req.body;

  skills = skills.split(",");

  let missingFields = [];
  if (!companyName || companyName.trim().length < 1)
    missingFields.push("companyName");
  if (!logoUrl || logoUrl.trim().length < 1) missingFields.push("logoUrl");
  if (!jobPosition || jobPosition.trim().length < 1)
    missingFields.push("jobPosition");
  if (!salary || salary < 0) missingFields.push("salary");
  if (!jobType || jobType.trim().length < 1) missingFields.push("jobType");
  if (!jobLocation || jobLocation.trim().length < 1)
    missingFields.push("jobLocation");
  if (!location || location.trim().length < 1) missingFields.push("location");
  if (!jobDesc || jobDesc.trim().length < 1) missingFields.push("jobDesc");
  if (!aboutCompany || aboutCompany.trim().length < 1)
    missingFields.push("aboutCompany");
  if (!skills || skills.length <= 0) missingFields.push("skills");

  if (missingFields.length >= 1) {
    res.json({
      status: 400,
      message: "Some of your feilds are empty or not valid :(",
      missingFields,
    });
  } else {
    next();
  }
};

const isAuthenticated = async (req, res, next) => {
  if (!loggedInEmail)
    res.json({ status: 400, message: "You are not registerd yet!" });

  await User.findOne({ email: loggedInEmail })
    .then((user) => {
      if (user) {
        if (jwt.verify(user.token, process.env.JWT_SECRET)) {
          next();
        } else {
          res.json({ status: 400, message: "You are not registerd yet!" });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public/`));

app.get("/", (req, res) => {
  res.json({ message: "All systems operational :)" });
});

app.post("/api/register", isRegistered, async (req, res) => {
  let { name, email, number, password, checkbox } = req.body;
  if (checkbox === "on") checkbox = true;
  else checkbox = false;

  const jwtToken = jwt.sign({ email, password }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  const encryptedPassword = await bcrypt.hash(password, 10);
  User.create({
    name,
    email,
    number,
    password: encryptedPassword,
    checkbox,
    token: jwtToken,
  });

  res.redirect(`${process.env.HOST_URL}/login`);
});

app.post("/api/login", (req, res) => {
  let { email, password } = req.body;
  User.findOne({ email })
    .then(async (user) => {
      let isMatched = await bcrypt.compare(password, user.password);
      if (isMatched && jwt.verify(user.token, process.env.JWT_SECRET)) {
        loggedInEmail = email;
        const temp = jwt.sign({ email, password }, process.env.JWT_SECRET, {
          expiresIn: "24h",
      });
        
        let check = await User.findOneAndUpdate({email},{token: temp},{new:true});
        // console.log(check.token);
        res.redirect(`${process.env.HOST_URL}/job-post`);

      } else res.redirect(`${process.env.HOST_URL}/login`);
    })
    .catch((err) => {
      console.log(err);
      res.redirect(`${process.env.HOST_URL}/`);
    });
});

app.post(
  "/api/jobPost",
  isAuthenticated,
  isFilledJobDetails,
  async (req, res) => {
    let {
      companyName,
      logoUrl,
      jobPosition,
      salary,
      jobType,
      jobLocation,
      location,
      jobDesc,
      aboutCompany,
      skills,
    } = req.body;

    skills = skills.split(",");

    await Job.create({
      email: loggedInEmail,
      companyName,
      logoUrl,
      jobPosition,
      salary,
      jobType,
      jobLocation,
      location,
      jobDesc,
      aboutCompany,
      skills,
    });

    res.json({ status: 200, message: "Job Posted Successfully" });
  }
);

// check routes to throw jwt token

app.get('/check/abc', async (req,res) => {
  // console.log(loggedInEmail);
  await User.findOne({email: loggedInEmail}).then((user) => {
    res.json({status: 200, message: user.token, email: loggedInEmail});
  }).catch((err) => {
    res.json({status: 400, message: 'Please login or create your account!'})
  });

  // res.json({status: 500, message: 'Something went wrong :('})
})

app.listen(process.env.SERVER_PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
      console.log(`Server running on port ${process.env.SERVER_PORT}`);
    })
    .catch(() => {
      console.log("Could not connect to MongoDB");
    });
});
