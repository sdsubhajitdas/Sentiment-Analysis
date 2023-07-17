import { Frown } from "lucide-react";

export default function NoAccess() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Frown className="sm:min-w-[20%] sm:min-h-[20%]  min-w-[50%] min-h-[50%] flex-1 self-center" />
      <span className="self-center flex-1 text-5xl font-semibold text-center">
        You don't have access to view this page
      </span>
    </div>
  );
}
