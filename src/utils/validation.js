export function validateCheckout({ name, phone, address }) {
  const errors = {};

  if (name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }

  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = 'Enter a valid phone number (7 to 15 digits).';
  }

  if (address.trim().length < 5) {
    errors.address = 'Please enter your delivery address.';
  }

  return errors;
}