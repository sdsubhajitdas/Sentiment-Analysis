import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Loader2 } from "lucide-react";
import Separator from "./Separator";
import moment from "moment";

export default function QueryResult({ query }) {
  const axios = useAxiosPrivate();
  const { isLoading, data: { data: queryFromDb = {} } = { data: {} } } =
    useQuery({
      queryKey: [query._id],
      queryFn: () => axios.get(`/query/${query._id}`),
    });

  return (
    <div className="flex flex-col gap-2 p-2 m-3">
      {isLoading && (
        <div className="flex flex-col items-center mt-10">
          <Loader2 className="inline w-1/5 h-1/5 animate-spin" />
        </div>
      )}

      {!isLoading && (
        <>
          <h3 className="text-3xl font-medium">Generated analysis</h3>
          <p className="text-sm italic font-medium text-gray-700">
            Processed at {moment(queryFromDb.createdAt).format("llll")}
          </p>
          <Separator />
          <p className="p-4 text-xl bg-gray-200 rounded">{queryFromDb.body}</p>
          <Separator />
          <p className="mt-5 text-2xl font-semibold text-center">
            Result is:{" "}
            <span
              className={
                queryFromDb.result === "NEUTRAL"
                  ? "text-gray-500"
                  : queryFromDb.result === "POSITIVE"
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {queryFromDb.result}
            </span>
          </p>
          <Separator />
          <div className="flex flex-col items-center">
            <span className="mb-1 italic font-medium text-gray-700">
              Generated word cloud
            </span>
            <img
              src={queryFromDb.imageUrl}
              alt="word cloud"
              className="w-[600px] h-[400px] border-2 border-black"
            />
          </div>
        </>
      )}
    </div>
  );
}
