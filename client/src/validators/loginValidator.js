import * as yup from 'yup';
import responseMessage from '../utils/message';

const validateLogin = yup.object().shape({
  email: yup
    .string()
    .required(responseMessage.requiredMessage.email)
    .email(responseMessage.validationMessage.invalidEmail),
  password: yup
    .string()
    .required(responseMessage.requiredMessage.password)
    .min(8, responseMessage.validationMessage.invalidPasswordLength)
    .max(15, responseMessage.validationMessage.invalidPasswordLength)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!$%&*?@])[\d!$%&*?@A-Za-z]{8,15}$/,
      responseMessage.validationMessage.invalidPassword,
    ),
});

export default validateLogin;
