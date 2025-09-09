export const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: You do not have access to this resource",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error in role middleware",
      });
    }
  };
};
