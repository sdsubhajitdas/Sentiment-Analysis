import { FilePlus } from "lucide-react";
import useSidebarNavigation from "../hooks/useSidebarNavigation";
import { sidebarNavigationTypes } from "../context/SidebarNavigationContextProvider";

export default function NewQueryButton() {
  let { setSidebarNavigation } = useSidebarNavigation();

  return (
    <div
      className="flex gap-3 p-3 my-3 text-xl bg-gray-200 rounded-sm hover:bg-gray-300 hover:cursor-pointer"
      onClick={() =>
        setSidebarNavigation((previous) => ({
          ...previous,
          type: sidebarNavigationTypes.NEW_QUERY,
        }))
      }
    >
      <FilePlus className="w-8 h-8" />
      <span className="my-auto">New Query</span>
    </div>
  );
}
