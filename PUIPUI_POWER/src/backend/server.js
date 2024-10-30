// server.js
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { getPuiPui, getPuiPuiById } from "../controllers/puipuiDbController.js";

const app = new Application();
const router = new Router();


// Enable CORS for all routes
app.use(oakCors({
  origin: "http://localhost:5173", // Allow requests from your Vue app
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify the allowed methods
  credentials: true, // Allow credentials if needed
}));

// server.js
// Fetch Product by limit and page 
router.get("/api/data/:limit/:page", async (ctx) => {
  console.log("Limit:", ctx.params.limit); // Log the limit
  console.log("Page:", ctx.params.page);   // Log the page

  const limit = parseInt(ctx.params.limit, 10); // Convert to integer
  const page = parseInt(ctx.params.page, 10);   // Convert to integer

  if (isNaN(limit) || isNaN(page)) { // Check for NaN values
      ctx.response.status = 400;
      ctx.response.body = { error: "Limit and page must be integers" };
      return;
  }

  const data = await getPuiPui(limit, page);
  if (data.error) {
      ctx.response.status = 500;
      ctx.response.body = { error: data.error };
  } else {
      // Include totalPages in the response body
      ctx.response.body = {
          products: data.products,
          totalPages: data.totalPages,
      };
      ctx.response.type = "application/json";
  }
});




// Product Id 
router.get("/api/product/:id", async (ctx) => {
  const productId = ctx.params.id;
  const product = await getPuiPuiById(productId);
  if(product && !productId.error) {
    ctx.response.body = product;
    ctx.response.type = "application/json";
  } else {
    ctx.response.status = 404;
    ctx.response.body = {error: "Product not found"}
  }
})

app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
app.addEventListener("listen", ({ port }) => {
    console.log(`Server running at http://localhost:${port}`);
});

await app.listen({ port: 8000 });
