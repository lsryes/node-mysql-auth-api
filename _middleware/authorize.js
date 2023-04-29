const jwt = require("jsonwebtoken");
const { secret } = require("config.json");

module.exports = authorize;

function authorize(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authenticate first to access this api" });
  }

  // get user with id from token 'sub' (subject) property
  // const user = await db.User.findByPk(req.user.sub);
  const user = jwt.verify(token, secret);
  console.log(user);

  // check user still exists
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  // authorization successful
  req.user = user;
  next();
}