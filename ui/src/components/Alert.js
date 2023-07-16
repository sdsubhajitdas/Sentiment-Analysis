import { X } from "lucide-react";
import { useState } from "react";

export default function Alert({ variant, message }) {
  let [isHidden, setIsHidden] = useState(false);
  const backGroundColour = {
    error: "red",
    warn: "yellow",
    success: "green",
  };

  if (isHidden) return null;

  return (
    <div
      className={`relative py-4 m-3 mt-10 bg-${backGroundColour[variant]}-300 rounded-lg px-7`}
    >
      <span className="text-lg">{message}</span>
      <span
        className={`absolute p-1 rounded-full right-3 top-2 hover:bg-${backGroundColour[variant]}-400`}
        onClick={() => setIsHidden(true)}
      >
        <X className="w-5 h-5" />
      </span>
    </div>
  );
}
