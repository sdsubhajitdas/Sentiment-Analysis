import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import useSidebarNavigation from "../hooks/useSidebarNavigation";
import { sidebarNavigationTypes } from "../context/SidebarNavigationContextProvider";

export default function QuickLinks() {
  const { data: { data: queries = [] } = { data: [] } } = useQuery({
    queryKey: ["listQueries"],
  });

  return (
    <div>
      <h1 className="ml-[5%] text-4xl my-5 font-semibold">Recent Queries</h1>
      <div className="grid grid-cols-3 gap-8 m-2">
        {queries.slice(0, Math.min(6, queries.length)).map((query) => (
          <QuickLink query={query} key={query._id} />
        ))}
      </div>
    </div>
  );
}

function QuickLink({ query }) {
  const { setSidebarNavigation } = useSidebarNavigation();

  let body = query.body.split(" ");
  body = body
    .slice(0, Math.min(body.length, 75))
    .concat(body.length > 75 ? "..." : "")
    .join(" ");

  return (
    <div
      className="relative p-5 bg-teal-100 rounded shadow-lg cursor-pointer pb-14"
      onClick={() => {
        setSidebarNavigation((previous) => ({
          ...previous,
          type: sidebarNavigationTypes.QUERY_RESULT,
          query,
        }));
      }}
    >
      <p className="italic font-medium text-gray-700 ">
        Processed at {moment(query.createdAt).format("llll")}
      </p>
      <p className="mt-3 text-xl text-center">{body}</p>
      <p className="absolute text-justify align-bottom bottom-5 ">
        Result:{" "}
        <span
          className={`italic font-medium ${
            query.result === "NEUTRAL"
              ? "text-gray-500"
              : query.result === "POSITIVE"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {query.result}
        </span>
      </p>
    </div>
  );
}
