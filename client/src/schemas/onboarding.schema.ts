import * as Yup from "yup";

import { occupations } from "../source-of-truth/occupations";
import { workload } from "../source-of-truth/workload";

export const OnboardingSchema = Yup.object().shape({
  position: Yup.string().oneOf(occupations, "Invalid!").required("Required!"),
  location: Yup.string().required("Required!"),
  websiteBusiness: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    )
    .required("Required!"),
  company: Yup.string().required("Required!"),
  quantityEmployees: Yup.array()
    .length(2, "Minimum and Maximum!")
    .of(Yup.number().typeError("Required!"))
    .required("Required!"),
  workload: Yup.string()
    .required("Required!")
    .oneOf(workload, "Invalid option!"),
  laboralSituation: Yup.string().required("Required!"),
});
