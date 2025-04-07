import { Link, createFileRoute } from "@tanstack/react-router";
import { fetchGuitars } from "../../utils/apis";

export const Route = createFileRoute("/guitars/$guitarId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const guitars = await fetchGuitars();
    const guitar = guitars.find((guitar) => guitar.id === +params.guitarId);
    if (!guitar) {
      throw new Error("Guitar not found");
    }
    return guitar;
  },
});

function RouteComponent() {
  const guitar = Route.useLoaderData();

  return (
    <div className="relative min-h-[100vh] flex items-center bg-white text-gray-900 p-5">
      <div className="relative z-10 w-[60%] bg-white/90 backdrop-blur-md rounded-2xl p-8 border border-gray-200 shadow-xl">
        <Link
          to="/"
          className="inline-block mb-4 text-emerald-600 hover:text-emerald-500"
        >
          &larr; Back to all guitars
        </Link>
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

      <div className="absolute top-0 right-0 w-[55%] h-full z-0">
        <div className="w-full h-full overflow-hidden rounded-2xl border-4 border-gray-200 shadow-2xl">
          <img
            src={guitar.image}
            alt={guitar.name}
            className="w-full h-full object-cover guitar-image"
          />
        </div>
      </div>
    </div>
  );
}
