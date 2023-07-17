import { useFormik } from "formik";
import { newQueryFormSchema } from "../utils/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Alert from "../components/Alert";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function NewQueryForm() {
  const axios = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { error, isError, isLoading, isSuccess, mutate } = useMutation({
    mutationFn: (newQueryFormData) => {
      queryClient.invalidateQueries({ queryKey: ["listQueries"] });
      return axios.post("/query", newQueryFormData);
    },
  });

  const formik = useFormik({
    initialValues: {
      body: "",
    },
    validationSchema: newQueryFormSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <>
      <form className="flex flex-col gap-3 mx-5" onSubmit={formik.handleSubmit}>
        <h2 className="mt-10 mb-5 text-3xl text-center capitalize">
          Enter text for analysis
        </h2>
        <div className="flex flex-col">
          <label className="pb-1 text-sm" htmlFor="body">
            Query Body
          </label>
          <textarea
            id="body"
            name="body"
            type="body"
            onChange={formik.handleChange}
            value={formik.values.body}
            className="p-2 text-lg border-2 bg-slate-50"
            rows="15"
            placeholder="Enter text to generate prediction"
          />
          {formik.errors.body && formik.touched.body ? (
            <span className="text-sm m-0.5 p-0.5 text-red-600 capitalize">
              {formik.errors.body}
            </span>
          ) : null}
        </div>
        <button
          className="w-1/2 p-3 mx-auto text-xl capitalize bg-teal-500 rounded disabled:bg-gray-500 disabled:text-white"
          type="submit"
          disabled={isLoading}
        >
          {isLoading && (
            <Loader2 className="inline w-5 h-5 mr-2 animate-spin" />
          )}
          Get prediction
        </button>
      </form>
      {isError && <Alert message={error.response.data} variant="error" />}
      {isSuccess && <Alert message="Query processing WIP" variant="success" />}
    </>
  );
}
