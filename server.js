const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;
const SECRET = "weak_secret";

app.get("/", (request, response) => {
  response.send("Welcome to the API");
});

app.get("/token", (request, response) => {
  const payload = {
    topic: "jwt",
    school: "dci"
  };

  const options = {
    expiresIn: 120 // 120 seconds = 2 minutes
  };

  const callback = undefined;

  const token = jwt.sign(payload, SECRET, options, callback);

  response.send(token);
});

app.get("/api", (request, response) => {
  // console.log(request.query);
  const token = request.query.token;

  const options = {
    topic: "jwt"
  };

  const callback = (error, decoded) => {
    // console.log(error, decoded);
    const output = !error
      ? {
          cardHolderName: "James Newton",
          cardNumber: 1234509876,
          PIN: 2358,
          expires: "08/21",
          CVV: 132
        }
      : error;

    response.send(output);
  };

  jwt.verify(token, SECRET, options, callback);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
