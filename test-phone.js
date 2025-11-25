const { isValidPhoneNumber } = require('react-phone-number-input')

const testPhone = '+44 7700 900123'
const cleaned = testPhone.replace(/\s+/g, '').trim()

console.log('Original:', testPhone)
console.log('Cleaned:', cleaned)
console.log('Is valid (original):', isValidPhoneNumber(testPhone))
console.log('Is valid (cleaned):', isValidPhoneNumber(cleaned))
