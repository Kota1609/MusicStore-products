import { createFileRoute } from "@tanstack/react-router";
import { fetchGuitar } from "../../utils/apis";

interface GuitarParams {
  guitarId: string;
}

export const Route = createFileRoute("/guitars/%24guitarId")({
  loader: async ({ params }) => {
    return fetchGuitar((params as GuitarParams).guitarId);
  },
  component: GuitarPage,
});

function GuitarPage() {
  const guitar = Route.useLoaderData();

  return (
    <div className="relative min-h-[100vh] flex items-center bg-white text-gray-900 p-5">
      <div className="absolute inset-0 z-0">
        <img
          src={guitar.image}
          alt={guitar.name}
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="relative z-10 w-[60%] bg-white/90 backdrop-blur-md rounded-2xl p-8 border border-gray-200 shadow-xl">
        <h1 className="text-3xl font-bold mb-4">{guitar.name}</h1>
        <p className="text-gray-600 mb-6">{guitar.description}</p>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-emerald-600">
            ${guitar.price}
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 