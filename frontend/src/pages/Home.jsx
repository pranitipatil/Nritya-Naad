export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-7xl font-bold text-orange-700 mb-4 tracking-wide">
        NrityaNaad
      </h1>

      <p className="text-lg max-w-xl text-orange-900 mb-8">
        Experience the rhythm of Indian dance and the soul of classical music — 
        all in one digital space.
      </p>

      <button
        onClick={() => window.location.href = "/features"}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg shadow-xl hover:scale-105 transition"
      >
        Explore Culture →
      </button>

      {/* Decorative element */}
      <div className="mt-16 w-64 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full"></div>

    </div>
  );
}