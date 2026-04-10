import { Link } from "react-router-dom";

export default function FeatureCard({ feature }) {
  return (
    <Link to={`/feature/${feature.id}`}>
      <div className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer border border-orange-200">
        
        <h2 className="text-xl font-semibold text-orange-700 mb-2">
          {feature.name}
        </h2>

        <p className="text-sm text-orange-900">
          Click to explore and implement this feature
        </p>

      </div>
    </Link>
  );
}