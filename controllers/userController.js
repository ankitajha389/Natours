exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented!'
  });
};

exports.getUser = exports.getAllUsers;
exports.createUser = exports.getAllUsers;
exports.updateUser = exports.getAllUsers;
exports.deleteUser = exports.getAllUsers;