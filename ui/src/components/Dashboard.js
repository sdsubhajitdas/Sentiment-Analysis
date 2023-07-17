import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { data: { data: queries = [] } = { data: [] } } = useQuery({
    queryKey: ["listQueries"],
  });
  return (
    <div className="m-3 ">
      <h2 className="text-4xl text-center">Total queries : {queries.length}</h2>
    </div>
  );
}
