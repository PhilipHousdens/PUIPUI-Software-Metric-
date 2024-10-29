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
router.get("/api/data", async (ctx) => {
    const data = await getPuiPui(); // Fetch data without pagination parameters
    if (data.error) {
        ctx.response.status = 500; // Set the response status to 500 if there's an error
        ctx.response.body = { error: data.error }; // Return the error
    } else {
        ctx.response.body = data.products; // Set the response body to just the products array
        ctx.response.type = "application/json"; // Set content type to JSON
    }
});



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
