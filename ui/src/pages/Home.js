import Separator from "../components/Separator";
import Dashboard from "../components/Dashboard";
import NewQueryForm from "../components/NewQueryForm";
import QueryListWrapper from "../components/QueriesList";
import NewQueryButton from "../components/NewQueryButton";
import useSidebarNavigation from "../hooks/useSidebarNavigation";
import { sidebarNavigationTypes } from "../context/SidebarNavigationContextProvider";
import QueryResult from "../components/QueryResult";
export default function Home() {
  let {
    sidebarNavigation: { type, query },
  } = useSidebarNavigation();

  return (
    <div className="relative">
      {/* Side Panel */}
      <div className="fixed top-[90px] bottom-0 left-0 w-1/4 overflow-auto touch-pan-y border-2 z-10 shadow-xl px-3">
        <NewQueryButton />
        <Separator />
        <QueryListWrapper />
      </div>

      {/* Main content Area */}
      <div className="ml-[25%]">
        {type === sidebarNavigationTypes.DASHBOARD && <Dashboard />}
        {type === sidebarNavigationTypes.NEW_QUERY && <NewQueryForm />}
        {type === sidebarNavigationTypes.QUERY_RESULT && (
          <QueryResult query={query} />
        )}
      </div>
    </div>
  );
}
