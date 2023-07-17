import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex gap-3 px-4 py-3 bg-teal-500 border-b-2 border-teal-700">
      <div className="grow"></div>
      <Link to="/">
        <img src="./logo.svg" className="w-16 h-16" alt="Website logo" />
      </Link>
      <Link to="/" className="my-auto">
        <h1 className="text-2xl font-medium sm:text-6xl">Sentiment Analysis</h1>
      </Link>
      <div className="grow"></div>
    </nav>
  );
}
