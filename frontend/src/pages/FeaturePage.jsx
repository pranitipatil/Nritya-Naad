import { useParams } from "react-router-dom";
import features from "../data/features.json";
//import Sidebar from "../components/Sidebar";

export default function FeaturePage() {
  const { id } = useParams();
  const feature = features.find((f) => f.id === id);

  return (
    <div className="min-h-screen p-8">

  <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-orange-200">

    <h1 className="text-3xl font-bold text-orange-700 mb-4">
      {feature?.name}
    </h1>

    <p className="text-orange-900 mb-6">
      This is your feature workspace. Implement UI and logic here.
    </p>

    <div className="border-2 border-dashed border-orange-300 p-10 rounded-xl text-center text-orange-500">
      🚀 Feature Implementation Area
    </div>

  </div>

</div>
  );
}
