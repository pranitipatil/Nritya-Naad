import features from "../data/features.json";
import FeatureCard from "../components/FeatureCard";

export default function Features() {
  return (
    <div className="min-h-screen p-8">

      <h1 className="text-4xl font-bold text-orange-700 mb-2 text-center">
        Explore Features
      </h1>

      <p className="text-center text-orange-900 mb-10">
        Dive into different modules of Indian dance & music culture
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <FeatureCard key={f.id} feature={f} />
        ))}
      </div>

    </div>
  );
}