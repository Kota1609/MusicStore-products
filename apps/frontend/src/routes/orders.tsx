import { createFileRoute } from "@tanstack/react-router";
import {
  flexRender,
  getCoreRowModel,
  createColumnHelper,
  useReactTable,
} from "@tanstack/react-table";
import { fetchOrders, fetchGuitars } from "../utils/apis";
import type { Guitar, Order } from "../utils/apis";

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor("customerName", {
    header: "Customer Name",
    cell: (info) => info.getValue(),
    filterFn: "includesString",
  }),
  columnHelper.accessor("items", {
    header: "Items",
    cell: (info) => {
      const items = info.getValue();
      const guitars =
        (info.table.options.meta as { guitars: Guitar[] } | undefined)
          ?.guitars || [];
      return (
        <div className="flex flex-col gap-2">
          {items.map((item) => {
            const guitar = guitars.find((g) => g.id === item.guitarId);
            if (!guitar) return null;
            return (
              <div key={guitar.id} className="flex items-center gap-2">
                <img
                  src={guitar.image}
                  alt={guitar.name}
                  className="h-12 w-12 object-cover rounded"
                />
                <div>
                  <div className="font-medium">{guitar.name}</div>
                  <div className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    },
  }),
  columnHelper.accessor("totalAmount", {
    header: "Total Amount",
    cell: (info) =>
      info.getValue().toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
  }),
  columnHelper.accessor("orderDate", {
    header: "Order Date",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
];

export const Route = createFileRoute("/orders")({
  component: RouteComponent,
  loader: async () => {
    const orders = await fetchOrders();
    const guitars = await fetchGuitars();
    return { orders, guitars };
  },
});

function RouteComponent() {
  const { orders, guitars } = Route.useLoaderData();

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: { guitars },
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-emerald-600">My Orders</h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 