import React from "react";
import { Ban, ShieldCheck, ShieldClose, Loader2 } from "lucide-react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export default function UserTable() {
  const axios = useAxiosPrivate();
  const { isLoading, data: { data: users = [] } = { data: [] } } = useQuery({
    queryKey: ["listUsers"],
    queryFn: () => axios.get("/admin/users"),
  });
  const tableHeaderCss = "border-r border-teal-700 px-2";

  return (
    <div className="mt-10">
      <h1 className="my-2 text-3xl">Users Table</h1>
      <div className="flex flex-col rounded-lg">
        {/* Header */}
        <div className="flex p-2 text-2xl font-medium bg-teal-300 border-t border-teal-600 rounded-t-lg border-x">
          <span className={`basis-2/7 ${tableHeaderCss}`}>Display Name</span>
          <span className={`basis-2/7 ${tableHeaderCss}`}>Email</span>
          <span className={`basis-1/7 ${tableHeaderCss}`}>Status</span>
          <span className={`basis-1/7 ${tableHeaderCss}`}>Admin Access</span>
          <span className="px-2 basis-1/7">Actions</span>
        </div>

        {/* Rows */}

        {isLoading && (
          <span className="w-full py-3 text-xl text-center border-b border-teal-600 rounded-b-lg bg-teal-100/60 border-x">
            <Loader2 className="inline animate-spin" /> Loading...
          </span>
        )}

        {users.map((user, index) => (
          <div
            key={user._id}
            className={`flex items-stretch px-2 py-1 text-lg border-teal-600 bg-teal-100/60 border-x ${
              index === users.length - 1 ? "rounded-b-lg border-b" : ""
            }`}
          >
            <span className={`basis-2/7 ${tableHeaderCss}`}>
              @{user.displayName}
            </span>
            <span className={`basis-2/7 ${tableHeaderCss}`}>{user.email}</span>
            <span
              className={`basis-1/7 ${tableHeaderCss} ${
                user.status === "INACTIVE" ? "text-gray-500" : ""
              }`}
            >
              {user.status}
            </span>
            <span
              className={`basis-1/7 ${tableHeaderCss} uppercase ${
                user.role === "ADMIN" ? "text-green-700" : "text-gray-500"
              } `}
            >
              {user.role === "ADMIN" ? "GRANTED" : "RESTRICTED"}
            </span>
            <div className="grid grid-cols-2 gap-4 px-2 basis-1/7">
              <button
                className="relative py-1 rounded-lg hover:bg-teal-200 hover:after:visible
              after:content-[attr(data-tip)]
              after:absolute
              after:left-0
              after:right-0
              after:text-sm
              after:bg-black/75
              after:text-white
              after:mt-2
              after:p-1
              after:rounded
              after:z-10
              after:invisible"
                data-tip="Disable User"
              >
                <Ban className="w-full" />
              </button>
              <button
                className="relative py-1 rounded-lg hover:bg-teal-200 hover:after:visible
              after:content-[attr(data-tip)]
              after:absolute
              after:left-0
              after:right-0
              after:text-sm
              after:bg-black/75
              after:text-white
              after:mt-2
              after:p-1
              after:rounded
              after:z-10
              after:invisible"
                data-tip="Grant Admin Access"
              >
                <ShieldCheck className="w-full" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
