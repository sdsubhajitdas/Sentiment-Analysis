import { X } from "lucide-react";
import { useState } from "react";

export default function Alert({ variant, message }) {
  let [isHidden, setIsHidden] = useState(false);
  const variantToColour = {
    error: "red",
    warn: "yellow",
    success: "green",
  };

  let alertCss = `relative py-4 m-3 mt-10 rounded-lg px-7 bg-${variantToColour[variant]}-300`;
  let closeButtonCss = `absolute p-1 rounded-full right-3 top-2 hover:bg-${variantToColour[variant]}-400`;

  if (isHidden) return null;

  return (
    <div className={alertCss}>
      <span className="text-lg">{message}</span>
      <span className={closeButtonCss} onClick={() => setIsHidden(true)}>
        <X className="w-5 h-5" />
      </span>
    </div>
  );
}
