const provide = "Please provide valid";
const empty = "Please enter";

const responseMessage = {
  authMessage: {
    invalidDetails: `${provide} details`,
    emailAlreadyInUse: `email already in use`,
    userRegistered: `new user registered!`,
    unAuthorised: `User not logged in!`,
    invalidToken: "Invalid token",
  },
  validationMessage: {
    emptyEmail: `${empty} email`,
    invalidEmail: `${provide} email`,
    emptyContact: `${empty} contact`,
    invalidContact: `${provide} contact`,
    emptyPassword: `${empty} password`,
    invalidPasswordLength: `Password must be at least 8 and max 15 characters`,
    invalidPassword: `Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character`,
  },
};

export default responseMessage;
