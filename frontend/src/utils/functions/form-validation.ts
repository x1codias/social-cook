const validateUsername = (username: string) => {
  const hasLessThanFourCharacters =
    username.trim().length < 4;
  const hasWhiteSpace = new RegExp('[\\s]').test(username);

  return { hasLessThanFourCharacters, hasWhiteSpace };
};

const validateEmail = (email: string) => {
  const isValid = new RegExp(
    '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'
  ).test(email);
  return { invalidEmail: !isValid };
};

const validatePasswordRepeat = (
  password: string,
  passwordRepeat: string
) => {
  return { passwordDifferent: password !== passwordRepeat };
};

const validatePassword = (password: string) => {
  const notHasUpperCaseLetter = new RegExp('[A-Z]').test(
    password
  );
  const notHasLowerCaseLetter = new RegExp('[a-z]').test(
    password
  );
  const hasLessThanEightCharacters = password.length < 8;

  return {
    notHasUpperCaseLetter: !notHasUpperCaseLetter,
    notHasLowerCaseLetter: !notHasLowerCaseLetter,
    hasLessThanEightCharacters,
  };
};

export const validateRequiredFieldsEmpty = (
  inputValues: string[]
) => {
  const hasRequiredInputsEmpty = inputValues.some(
    inpValue => inpValue.trim().length === 0
  );

  return hasRequiredInputsEmpty;
};

export const validateInput = (
  name: string,
  value: string,
  password?: string
) => {
  switch (name) {
    case 'email':
      return validateEmail(value);
    case 'password':
      return validatePassword(value);
    case 'repeatPassword':
      if (password)
        return validatePasswordRepeat(password, value);
      break;
    case 'username':
      return validateUsername(value);
    default:
      return;
  }
};
