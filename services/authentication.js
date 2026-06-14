import jwt from "jsonwebtoken";

const secret = "$ijdjnaj434AD@";

function createTokenForUSer(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = jwt.sign(payload, secret);

  return token;
}

function validateToken(token) {
  const payload = jwt.verify(token, secret);

  return payload;
}

export { createTokenForUSer, validateToken };
