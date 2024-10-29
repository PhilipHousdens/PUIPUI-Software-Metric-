// puipuiDbController.js
import { puipuiDB } from "../api/database/db.js"; // Ensure puipuiDB is an initialized collection

// Get all puipui products
async function getPuiPui() {
    try {
        const allPuiPui = await puipuiDB.find().toArray();
        console.log("Retrieved data:", allPuiPui); 
        return allPuiPui; // Return the array directly
    } catch (error) {
        return { error: error.message }; // Return error as a plain object
    }
}

async function getPuiPuiById(productId) {
    try {
        const product = await puipuiDB.findOne({ 
            "products._id": parseInt(productId) // Use dot notation to search within the products array
        },
        {
            projection: { "products.$": 1 } // Use projection to retrieve only the matching product
        });

        if (product && product.products.length > 0) {
            return product.products[0]; // Return the matched product
        } else {
            return { error: "Product not found" };
        }
    } catch (error) {
        console.error(`Error fetching PuiPui product with ID ${productId}:`, error);
        return { error: error.message };
    }
}

export { getPuiPui, getPuiPuiById };

