'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const {Users } = require('../models/index');

module.exports = async (req, res, next) => { 

    if (req.headers["authorization"]) {
      let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
      let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
      let decodedString = base64.decode(encodedString); // "username:password"
      let [username, password] = decodedString.split(':'); // username, password
    
      try {
        const user = await Users.findOne({ where: { username: username } });
        if (!user || !password) {
            res.status(403).json('Wrong User / password');
            return;
          }
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
          res.status(200).json(user);
          next();
        }
        else {
          throw new Error('Invalid User')
        }
      } catch (error) { res.status(403).send("Invalid Login"); }
    
    


}
}