import { FilePlus } from "lucide-react";

export default function NewQueryButton() {
  return (
    <div className="flex gap-3 p-3 my-3 text-xl bg-gray-200 rounded-sm hover:bg-gray-300 hover:cursor-pointer">
      <FilePlus className="w-8 h-8" />
      <span className="my-auto">New Query</span>
    </div>
  );
}
