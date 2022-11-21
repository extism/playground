import "./Spinner.css";

export default function Spinner() {
  return <div aria-label="Running..." role="status" className="flex items-center space-x-4">
    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16">
    </div>
    <span className="text-xs font-medium text-gray-500">Loading...</span>
  </div>;
}
