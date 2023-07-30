import * as Yup from "yup";

export const loginFormSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8).max(20),
});
