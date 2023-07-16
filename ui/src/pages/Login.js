import axios from "../api/axios";
import { useEffect } from "react";
import { useFormik } from "formik";
import useAuth from "../hooks/useAuth";
import { Loader2 } from "lucide-react";
import Alert from "../components/Alert";
import { Link, Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginFormSchema } from "../utlis/validation";

export default function Login() {
  let {
    authentication: { isAuthenticated },
    setAuthentication,
  } = useAuth();

  const { data, error, isError, isLoading, mutate } = useMutation({
    mutationFn: (loginFormData) => {
      return axios.post("/auth/login", loginFormData);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginFormSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  useEffect(() => {
    if (data) {
      setAuthentication((previous) => ({
        ...previous,
        isAuthenticated: true,
        user: data.data,
      }));
    }
  }, [data, setAuthentication]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container fixed max-w-2xl -translate-x-1/2 -translate-y-1/2 top-1/3 left-1/2">
      <h2 className="my-4 text-5xl font-semibold text-center">Login</h2>
      <form
        className="flex flex-col gap-4 p-3 pt-6 mx-3 rounded-md bg-slate-200"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col">
          <label className="pb-1 text-sm" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="p-2 rounded-md"
            placeholder="Email ID"
          />
          {formik.errors.email && formik.touched.email ? (
            <span className="text-sm m-0.5 p-0.5 text-red-600 capitalize">
              {formik.errors.email}
            </span>
          ) : null}
        </div>
        <div className="flex flex-col">
          <label className="pb-1 text-sm" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="p-2 rounded-md"
            placeholder="Password"
          />
          {formik.errors.password && formik.touched.password ? (
            <span className="text-sm m-0.5 p-0.5 text-red-600 capitalize">
              {formik.errors.password}
            </span>
          ) : null}
        </div>
        <button
          className="p-2 text-lg font-medium bg-green-300 rounded-md disabled:bg-gray-500 disabled:text-white"
          type="submit"
          disabled={isLoading}
        >
          {isLoading && (
            <Loader2 className="inline w-5 h-5 mr-2 animate-spin" />
          )}
          Login
        </button>
        <Link className="text-center hover:underline" to="/register">
          Create new account?
        </Link>
      </form>
      {isError && <Alert message={error.response.data} variant="error" />}
    </div>
  );
}
