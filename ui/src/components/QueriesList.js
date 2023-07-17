import { Bookmark } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Loader2 } from "lucide-react";

function QueryList() {
  const axios = useAxiosPrivate();
  const { isLoading, data: { data: queries = [] } = { data: [] } } = useQuery({
    queryKey: ["listQueries"],
    queryFn: () => axios.get("/query"),
    refetchInterval: 60000,
  });

  return (
    <ul>
      {queries.map((query) => (
        <QueryItem key={query._id} query={query} />
      ))}
      {isLoading && (
        <li className="my-2 text-center">
          <Loader2 className="inline-block w-8 h-8 animate-spin" />
        </li>
      )}
    </ul>
  );
}

function QueryItem({ query }) {
  return (
    <li onClick={() => console.log("Clicked on " + query._id)} className={``}>
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
