import * as Yup from "yup";

let loginAndRegisterCommonFields = {
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8).max(20),
};

export const loginFormSchema = Yup.object({ ...loginAndRegisterCommonFields });
export const registerFormSchema = Yup.object({
  displayName: Yup.string().required(),
  ...loginAndRegisterCommonFields,
});

export const newQueryFormSchema = Yup.object({
  body: Yup.string().required("Query cannot be empty"),
});
