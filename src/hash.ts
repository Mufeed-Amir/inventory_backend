const bcrypt = require('bcrypt');

const secretKey = 'sdfsdfed3343'; // Replace with your actual secret key

async function hashPassword(password) {

    const saltRounds       = 10;
    const salt             = await bcrypt.genSalt(saltRounds);

    const combinedPassword = password + secretKey;
    const hashedPassword   = await bcrypt.hash(combinedPassword, salt);

    return hashedPassword;
 
}

async function compare(enteredPassword, storedHash) {

    const combinedEnteredPassword = enteredPassword + secretKey;
    const match = await bcrypt.compare(combinedEnteredPassword, storedHash);
    return match;

} 
module.exports = {hashPassword,compare}

