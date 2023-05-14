const provide = 'Please provide valid';
const empty = 'Please enter';
const isRequired = 'is required !';

const responseMessage = {
  authMessage: {
    invalidDetails: `${provide} details`,
    emailAlreadyInUse: 'email already in use',
    userRegistered: 'new user registered!',
    unAuthorised: 'User not logged in!',
    invalidToken: 'Invalid token',
    wrongPassword: 'Incorrect password',
  },
  validationMessage: {
    emptyEmail: `${empty} email`,
    invalidEmail: `${provide} email`,
    emptyContact: `${empty} contact`,
    invalidContact: `${provide} contact`,
    emptyPassword: `${empty} password`,
    invalidPasswordLength: 'Password must be at least 8 and max 15 characters',
    invalidPassword:
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character',
  },
  userMessage: {
    registered: 'User registered',
    loggedIn: 'User logged in',
    notFound: 'User not found',
    invalidId: `${provide} user id`,
  },
  postMessage: {
    created: 'Post created',
    updated: 'Post updated',
    invalidId: `${provide} post id`,
    notFound: 'Post not found',
    deleted: 'Post deleted',
    alreadyDeleted: 'Post already deleted',
  },
  eventMessage: {
    inValidId: `${provide} post id or user id`,
    inValid: `${provide} event id`,
    created: 'Event created',
    updated: 'Event updated',
    deleted: 'Event deleted',
    notFound: 'Event not found',
  },
  requiredMessage: {
    name: `Name ${isRequired}`,
    email: `Email ${isRequired}`,
    contact: `Contact ${isRequired}`,
    password: `Password ${isRequired}`,
    location: `Location ${isRequired}`,
    occupation: `Occupation ${isRequired}`,
    picture: `Picture ${isRequired}`,
  },
  other: {
    interServerErr: 'Internal server error',
  },
};

export default responseMessage;
