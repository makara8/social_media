const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeder = req.headers["authorization"];
  const token = authHeder && authHeder.split(" ")[1];
  if (!token) return res.json("unauthorizes");
  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return res.json("unauthorize");
    req.user = user.data;
    next();
  });
}

module.exports = verifyToken;
