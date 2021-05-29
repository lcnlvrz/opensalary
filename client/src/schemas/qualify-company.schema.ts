import * as Yup from "yup";

export const QualifyCompanySchema = Yup.object().shape({
  rate: Yup.number().required("Required!"),
  advantages: Yup.string().min(50, "Too short!").required("Required"),
  disadvantages: Yup.string().min(50, "Too short!").required("Required!"),
});
