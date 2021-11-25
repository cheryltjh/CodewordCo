const bcrypt = require("bcrypt");

const userData = [
    {
      name: 'John',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: false,
    },
];

module.exports = userData;