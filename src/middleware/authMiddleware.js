import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export function authRequired(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect("/"); // back to login page

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.redirect("/"); // expired or invalid token
    req.user = user;
    next();
  });
}
