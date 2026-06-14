import jwt from "jsonwebtoken";

const secret = "$ijdjnaj434AD@";

export function createTokenForUser(user) {
  const payload = {
    _id: user._id,

    fullName: user.fullName,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = jwt.sign(payload, secret);

  return token;
}

export function validateToken(token) {
  const payload = jwt.verify(token, secret);

  return payload;
}

// export { createTokenForUser, validateToken };
