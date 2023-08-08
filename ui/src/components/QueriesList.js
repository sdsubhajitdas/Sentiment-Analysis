import { Bookmark } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Loader2, Trash2 } from "lucide-react";
import useSidebarNavigation from "../hooks/useSidebarNavigation";
import { sidebarNavigationTypes } from "../context/SidebarNavigationContextProvider";

function QueryList() {
  const axios = useAxiosPrivate();
  let { sidebarNavigation } = useSidebarNavigation();
  const { isLoading, data: { data: queries = [] } = { data: [] } } = useQuery({
    queryKey: ["listQueries"],
    queryFn: () => axios.get("/query"),
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
  const { setSidebarNavigation } = useSidebarNavigation();
  const axios = useAxiosPrivate();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ _id: queryId }) => {
      return axios.delete(`/query/${queryId}`);
    },
  });

  return (
    <li
      onClick={() =>
        setSidebarNavigation((previous) => ({
          ...previous,
          type: sidebarNavigationTypes.QUERY_RESULT,
          query,
        }))
      }
      className={selected ? "relative bg-gray-200" : ""}
    >
      <p className="px-2 py-3 text-lg truncate border-b-2 rounded-sm hover:bg-gray-200">
        {query.body}
      </p>
      {selected && !isLoading && (
        <button
          className="absolute top-0 bottom-0 right-0 px-2.5 bg-gray-200 hover:bg-gray-300"
          onClick={() => mutate(query)}
        >
          <Trash2 />
        </button>
      )}
      {selected && isLoading && (
        <Loader2 className="absolute top-0 bottom-0 right-0 px-2.5 bg-gray-200 rounded-full h-12 w-12 text-black animate-spin" />
      )}
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
