import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid!").required("Email required!"),
  password: Yup.string()
    .min(6, "At least 6 characters for password!")
    .required("Password required!!"),
  name: Yup.string().required("Required!"),
});
