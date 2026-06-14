import { validateToken } from "../services/authentication.js";

export function checkForAuthCookie(cookieName) {
  return (req, res, next) => {
    if (!req.cookies) return next();

    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userpayload = validateToken(tokenCookieValue);

      req.user = userpayload;
    } catch (error) {}
    return next();
  };
}
