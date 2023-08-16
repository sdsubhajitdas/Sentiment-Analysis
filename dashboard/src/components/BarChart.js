import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";

export default function BarChart() {
  const axios = useAxiosPrivate();
  const { isLoading, data: { data: stats = [] } = { data: [] } } = useQuery({
    queryKey: ["stats"],
    queryFn: () => axios.get("/admin/stats"),
  });
  const [graphData, setGraphData] = useState({ apis: {} });
  const total = Object.entries(graphData.apis).reduce(
    (prev, current) => prev + parseInt(current[1]),
    0
  );

  return (
    <div className="my-5 h-[500px] border-teal-500 border rounded p-3 flex flex-col">
      {isLoading && <h2 className="text-3xl text-center">Loading...</h2>}
      {!isLoading && (
        <div className="flex">
          <h2 className="inline text-3xl grow">API Usage Chart</h2>

          <label htmlFor="date" className="my-auto mr-3 text-lg font-medium">
            Pick a date:
          </label>
          <select
            id="date"
            className="px-3 text-lg font-medium bg-white border border-teal-500 rounded-lg"
            onChange={(e) => setGraphData(stats[e.target.value])}
          >
            <option value={0}></option>
            {stats.map((stat, index) => (
              <option value={index} key={stat.date}>
                {moment(stat.date, "DD/MM/YYYY").format("Do MMMM YYYY")}
              </option>
            ))}
          </select>
        </div>
      )}

      {!isLoading && (
        <div className="mt-2 grow">
          <div className="flex h-full gap-4 mx-5 justify-evenly">
            {Object.entries(graphData.apis).map(([route, count]) => {
              return (
                <Bar count={count} route={route} total={total} key={route} />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Bar({ count, route, total }) {
  const percentage = parseInt((count / total) * 100);
  return (
    <div className="relative flex flex-col-reverse grow">
      <span
        style={{ height: `${percentage}%` }}
        className={`relative block mb-6 text-lg text-center bg-teal-200 border-2 border-teal-500 cursor-pointer font-medium hover:after:visible hover:before:invisible
        before:content-[attr(data-before-count)] before:absolute before:-top-6 before:left-0 before:right-0
        after:content-[attr(data-after-count)] after:absolute after:-top-12 after:left-0 after:right-0 after:bg-black/75 after:text-white after:p-1 after:mx-3 after:rounded after:invisible`}
        data-after-count={`API Invocations: ${count}`}
        data-before-count={count}
      />
      <span className="absolute left-0 right-0 text-lg font-medium text-center truncate -bottom-3">
        {route}
      </span>
    </div>
  );
}
