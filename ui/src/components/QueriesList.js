import { Bookmark } from "lucide-react";

export function QueryList() {
  return (
    <ul>
      <li>
        <p className="px-2 py-3 text-lg truncate border-b-2 rounded-sm hover:bg-gray-200">
          Lorem ipsum text generator online
        </p>
      </li>
      <li>
        <p className="px-2 py-3 text-lg truncate border-b-2 rounded-sm hover:bg-gray-200">
          Random text generated one day
        </p>
      </li>
      <li>
        <p className="px-2 py-3 text-lg truncate border-b-2 rounded-sm hover:bg-gray-200">
          Tuki
        </p>
      </li>
      <li>
        <p className="px-2 py-3 text-lg truncate border-b-2 rounded-sm hover:bg-gray-200">
          Why is Ravi a bitch ?
        </p>
      </li>
      <li>
        <p className="px-2 py-3 text-lg truncate border-b-2 rounded-sm hover:bg-gray-200">
          Wow ki wow lagtase ki wowwww. finally abr ki wow
        </p>
      </li>
    </ul>
  );
}

export default function QueryListWrapper() {
  return (
    <>
      <div className="my-2 text-center text-gray-700">
        <Bookmark className="inline mr-2" />
        <span className="text-lg">Saved Queries</span>
      </div>
      {/* Saved queries  */}
      <QueryList />
    </>
  );
}
