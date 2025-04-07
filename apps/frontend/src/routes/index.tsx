import { Link, createFileRoute } from "@tanstack/react-router";
import { MessageSquare, ShoppingCart, Headphones } from "lucide-react";
import { fetchGuitars, fetchInventory } from "@/utils/apis";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => {
    const guitars = await fetchGuitars();
    const inventory = await fetchInventory();
    return { guitars, inventory };
  },
});

export default function RouteComponent() {
  const { guitars, inventory } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald-600 mb-4">
            Welcome to Music Store
          </h1>
          <p className="text-xl text-gray-600">
            Discover our collection of unique guitars and let our AI assistant help you find your perfect match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guitars.map((guitar) => {
            const stock = inventory.find((item) => item.guitarId === guitar.id)?.quantity ?? 0;
            return (
              <div
                key={guitar.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 border border-gray-200"
              >
                <img
                  src={guitar.image}
                  alt={guitar.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-emerald-600">
                      {guitar.name}
                    </h2>
                    <span className="text-gray-900 font-bold">
                      ${guitar.price}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{guitar.shortDescription}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">In Stock:</span>
                    <span className={`font-bold ${stock > 0 ? "text-green-600" : "text-red-600"}`}>
                      {stock} units
                    </span>
                  </div>
                  <Link
                    to="/guitars/$guitarId"
                    params={{ guitarId: guitar.id.toString() }}
                    className="mt-4 block w-full text-center bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
