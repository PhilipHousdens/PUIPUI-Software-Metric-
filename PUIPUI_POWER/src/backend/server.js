// server.js
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { getPuiPui } from "../controllers/puipuiDbController.js";

const app = new Application();
const router = new Router();


// Enable CORS for all routes
app.use(oakCors({
  origin: "http://localhost:5173", // Allow requests from your Vue app
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify the allowed methods
  credentials: true, // Allow credentials if needed
}));

// Define routes
router.get("/api/data", async (ctx) => {
    const data = await getPuiPui(); // Fetch data from the controller
    if (data.error) {
        ctx.response.status = 500; // Set the response status to 500 if there's an error
        ctx.response.body = { error: data.error }; // Return the error
    } else {
        ctx.response.body = data; // Set the response body directly
        ctx.response.type = "application/json"; // Set content type to JSON
    }
});

app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
app.addEventListener("listen", ({ port }) => {
    console.log(`Server running at http://localhost:${port}`);
});

await app.listen({ port: 8000 });
