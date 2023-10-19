const checkRoleUser = (req, res, next) => {
  try {
    const roleNum = req.user.roleId;
    if (roleNum == 1) {
      next();
    } else if (roleNum == 2) {
      res.status(403).json({
        success: true,
        message: "Forbidden",
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports = checkRoleUser;
