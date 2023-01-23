import * as yup from "yup";
import responseMessage from "utils/message";

const validateRegister = yup.object().shape({
  name: yup.string().required(responseMessage.requiredMessage.name),
  email: yup.string().email(responseMessage.requiredMessage.email),
  contact: yup.string().required(responseMessage.requiredMessage.contact),
  password: yup
    .string()
    .required(responseMessage.requiredMessage.password)
    .min(8, responseMessage.validationMessage.invalidPasswordLength)
    .max(15, responseMessage.validationMessage.invalidPasswordLength)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
      responseMessage.validationMessage.invalidPassword
    ),
  location: yup.string().required(responseMessage.requiredMessage.location),
  occupation: yup.string().required(responseMessage.requiredMessage.occupation),
  profilePic: yup.string().required(responseMessage.requiredMessage.picture),
});

export default validateRegister;
