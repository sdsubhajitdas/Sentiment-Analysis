import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="container fixed -translate-x-1/2 -translate-y-1/2 top-1/3 left-1/2">
      <h2 className="my-4 text-5xl font-semibold text-center">Register</h2>
      <form className="flex flex-col gap-4 p-3 mx-3 rounded-md bg-slate-200">
        <div className="flex flex-col">
          <label className="pb-1 text-sm ">Display Name</label>
          <input
            className="p-2 rounded-md"
            type="text"
            placeholder="Display Name"
          />
        </div>
        <div className="flex flex-col">
          <label className="pb-1 text-sm ">Email</label>
          <input
            className="p-2 rounded-md"
            type="text"
            placeholder="Email ID"
          />
        </div>
        <div className="flex flex-col">
          <label className="pb-1 text-sm ">Password</label>
          <input
            className="p-2 rounded-md"
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          className="p-2 text-lg font-medium bg-green-300 rounded-md"
          type="submit"
        >
          Register
        </button>
        <Link className="text-center hover:underline" to="/login">
          Already have an account?
        </Link>
      </form>
    </div>
  );
}
