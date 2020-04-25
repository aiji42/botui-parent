export const validations = {
  password: {
    min: 6,
    max: 30,
    matches: /^[a-z\d!#$%&'()*+,./:;<=>?@\-[\]^_`{|}~]+$/i
  }
};