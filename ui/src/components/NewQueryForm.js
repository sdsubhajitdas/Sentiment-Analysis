export default function NewQueryForm() {
  return (
    <form className="flex flex-col gap-3 mx-5">
      <h2 className="mt-10 mb-5 text-3xl text-center capitalize">
        Enter text for analysis
      </h2>
      <textarea className="p-2 text-lg border-2 bg-slate-50" rows="15" />
      <button className="w-1/2 p-3 mx-auto text-xl capitalize bg-teal-500 rounded">
        Get prediction
      </button>
    </form>
  );
}
