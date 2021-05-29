import * as Yup from "yup";
import { currencies } from "../source-of-truth/currencies";

export const SearchSalarySchema = Yup.object().shape({
  occupation: Yup.string().required("Required!"),
  location: Yup.string().required("Required!"),
  currency: Yup.string()
    .oneOf(
      currencies.map((currency) => currency.code),
      "Invalid currency!"
    )
    .required("Required!"),
});
