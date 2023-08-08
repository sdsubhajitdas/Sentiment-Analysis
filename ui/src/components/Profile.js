import { useQuery } from "@tanstack/react-query";
import { UserCircle2 } from "lucide-react";
import useAuthentication from "../hooks/useAuthentication";

export default function Profile() {
  const { data: { data: queries = [] } = { data: [] } } = useQuery({
    queryKey: ["listQueries"],
  });
  const {
    authentication: { user },
  } = useAuthentication();

  return (
    <>
      <h1 className="ml-[5%] text-4xl my-5 font-semibold">Profile Section</h1>
      <div className="flex gap-5">
        <div className="max-w-xs max-h-80 grow">
          <UserCircle2 className="w-full h-full p-5 text-teal-500 bg-gray-300 rounded-lg" />
        </div>
        <div className="p-0.5 space-y-1 text-2xl grow">
          <h2 className="text-3xl">
            Display Name:{" "}
            <span className="text-gray-600">@{user.displayName}</span>
          </h2>
          <h2>
            Email: <span className="text-gray-600">{user.email}</span>
          </h2>
          <h2>
            User Status: <span className="text-gray-600">{user.status}</span>
          </h2>
          <h2>
            Total queries:{" "}
            <span className="text-gray-600">{queries.length}</span>
          </h2>
          {user.role === "ADMIN" && (
            <h2 className="text-xl font-medium text-green-500">
              Admin status active
            </h2>
          )}
        </div>
        <div className="grow min-w-[10rem] p-4 max-h-80 flex mr-5">
          <div className="my-auto space-y-2 text-xl font-medium text-center uppercase grow">
            <span className="block text-green-600">Positive (+ve): 60%</span>
            <span className="block text-red-600">Negative (-ve): 40%</span>
          </div>
          <PieChart />
        </div>
      </div>
    </>
  );
}

function PieChart() {
  return (
    <div
      className="h-full rounded-full aspect-square"
      style={{
        background:
          "repeating-conic-gradient(#ef4444 0% 40%, #22c55e 40% 100%)",
      }}
    ></div>
  );
}
