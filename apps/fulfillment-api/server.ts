import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

interface InventoryItem {
  guitarId: number;
  quantity: number;
}

interface Order {
  id: number;
  customerName: string;
  items: Array<{
    guitarId: number;
    quantity: number;
  }>;
  totalAmount: number;
  orderDate: string;
}

interface Guitar {
  id: number;
  name: string;
  image: string;
  description: string;
  shortDescription: string;
  price: number;
}

const PRODUCTS_API_URL = process.env.PRODUCTS_API_URL || "http://localhost:8082";

async function fetchState(): Promise<{
  inventory: InventoryItem[];
  orders: Order[];
  guitars: Guitar[];
}> {
  let inventory: InventoryItem[] = [];
  let orders: Order[] = [];
  let guitars: Guitar[] = [];

  if (inventory.length === 0) {
    const guitarsReq = await fetch(`${PRODUCTS_API_URL}/products`);
    guitars = await guitarsReq.json();

    // Set default inventory of 10 units for each guitar
    inventory = guitars.map((guitar: Guitar) => ({
      guitarId: guitar.id,
      quantity: Math.floor(Math.random() * 10) + 5,
    }));

    // Set some default orders
    orders = [
      {
        id: 1,
        customerName: "Michael Jackson",
        items: [
          { guitarId: 1, quantity: 2 },
          { guitarId: 2, quantity: 1 },
        ],
        totalAmount: 1200,
        orderDate: "2025-03-27",
      },
      {
        id: 2,
        customerName: "Taylor Swift",
        items: [{ guitarId: 3, quantity: 1 }],
        totalAmount: 679,
        orderDate: "2025-03-28",
      },
    ];
  }

  return { inventory, orders, guitars };
}

let state: Awaited<ReturnType<typeof fetchState>> | null = null;
const getState = async () => {
  if (!state) {
    state = await fetchState();
  }
  return state;
};

app.get("/inventory", async (req, res) => {
  const { inventory, orders, guitars } = await getState();
  const inventoryWithDetails = inventory.map((item) => {
    const guitar = guitars.find((g: Guitar) => g.id === item.guitarId);
    return {
      ...item,
      guitar,
    };
  });
  res.json(inventoryWithDetails);
});

app.get("/orders", async (req, res) => {
  const { orders } = await getState();
  res.json(
    [...orders]
      .sort(
        (a, b) =>
          new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
      )
      .reverse()
  );
});

app.post("/purchase", async (req, res) => {
  const { inventory, orders, guitars } = await getState();

  const { customerName, items } = req.body as {
    customerName: string;
    items: Array<{ guitarId: number; quantity: number }>;
  };

  if (!customerName || !items || items.length === 0) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  let totalAmount = 0;
  for (const item of items) {
    const guitar = guitars.find((g: Guitar) => g.id === item.guitarId);
    if (!guitar) {
      return res
        .status(404)
        .json({ error: `Guitar with id ${item.guitarId} not found` });
    }
    totalAmount += guitar.price * item.quantity;
  }

  // Create order
  const order: Order = {
    id: orders.length + 1,
    customerName,
    items,
    totalAmount,
    orderDate: new Date().toISOString(),
  };

  // Add to orders array (but don't modify inventory)
  orders.push(order);

  res.json(order);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Fulfillment API Server is running on port http://localhost:${PORT}`
  );
});
