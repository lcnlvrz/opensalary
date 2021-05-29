import * as Yup from "yup";
import { currencies } from "../source-of-truth/currencies";
import { JobInterval } from "../types/salary.type";

export const SalarySchema = Yup.object().shape({
  amount: Yup.number().positive("Positive number!").required("Required!"),
  interval: Yup.string()
    .oneOf(Object.values(JobInterval), "Invalid type!")
    .required("Required!"),
  currency: Yup.string()
    .oneOf(
      currencies.map((currency) => currency.code),
      "Invalid currency"
    )
    .required("Required!"),
  yearsOfExperience: Yup.number()
    .positive("Positive number!")
    .required("Required!"),
  location: Yup.string().required("Required!"),
  occupation: Yup.string().required("Required!"),
  company: Yup.string().required("Required!"),
});
