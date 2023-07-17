import QueryListWrapper from "../components/QueriesList";
import Separator from "../components/Separator";
import NewQueryButton from "../components/NewQueryButton";
import NewQueryForm from "../components/NewQueryForm";

export default function Home() {
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
        <NewQueryForm />
      </div>
    </div>
  );
}
