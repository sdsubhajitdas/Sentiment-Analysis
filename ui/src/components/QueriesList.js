import { Bookmark } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Loader2 } from "lucide-react";
import useSidebarNavigation from "../hooks/useSidebarNavigation";
import { sidebarNavigationTypes } from "../context/SidebarNavigationContextProvider";

function QueryList() {
  const axios = useAxiosPrivate();
  let { sidebarNavigation } = useSidebarNavigation();
  const { isLoading, data: { data: queries = [] } = { data: [] } } = useQuery({
    queryKey: ["listQueries"],
    queryFn: () => axios.get("/query"),
    refetchInterval: 60000,
  });

  return (
    <ul>
      {queries.map((query) => (
        <QueryItem
          key={query._id}
          query={query}
          selected={
            sidebarNavigation.type === sidebarNavigationTypes.QUERY_RESULT &&
            query._id === sidebarNavigation.query._id
          }
        />
      ))}
      {isLoading && (
        <li className="my-2 text-center">
          <Loader2 className="inline-block w-8 h-8 animate-spin" />
        </li>
      )}
    </ul>
  );
}

function QueryItem({ query, selected }) {
  let { setSidebarNavigation } = useSidebarNavigation();
  return (
    <li
      onClick={() =>
        setSidebarNavigation((previous) => ({
          ...previous,
          type: sidebarNavigationTypes.QUERY_RESULT,
          query,
        }))
      }
      className={selected ? "bg-gray-200" : ""}
    >
      <p className="px-2 py-3 text-lg truncate border-b-2 rounded-sm hover:bg-gray-200">
        {query.body}
      </p>
    </li>
  );
}

export default function QueryListWrapper() {
  return (
    <>
      <div className="my-2 text-center text-gray-700">
        <Bookmark className="inline mr-2" />
        <span className="text-lg">Saved Queries</span>
      </div>
      <QueryList />
    </>
  );
}
