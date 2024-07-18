const crypto = require('crypto');

// Create an HMAC
const hmac = crypto.createHmac('sha256', 'a secret key');
// Update the HMAC with data
hmac.update('some data to hash');
// Calculate the digest of the data
const digest = hmac.digest('hex');
console.log(`HMAC: ${digest}`);