import { puipuiDB } from "../api/database/db.js"; 

async function getProduct(limit = 4, page = 1) {
    const skip = (page - 1) * limit;

    try {
        // Fetch the products with pagination
        const allPuiPui = await puipuiDB.aggregate([
            { $unwind: "$products" }, // Flatten the products array
            { $skip: skip }, // Skip to the correct page
            { $limit: parseInt(limit) }, // Limit the number of products
            { $replaceRoot: { newRoot: "$products" } } // Replace the root with each product document
        ]).toArray();

        // Count the total products available
        const totalProducts = await puipuiDB.aggregate([
            { $unwind: "$products" },
            { $count: "count" }
        ]).toArray();

        console.log("Total Products Count:", totalProducts);

        const totalCount = totalProducts[0] ? totalProducts[0].count : 0;
        const totalPages = Math.ceil(totalCount / limit); // Calculate total pages

        // Return the products and totalPages
        return {
            products: allPuiPui,
            totalPages, // Include total pages in the response
        };
    } catch (error) {
        return { error: error.message };
    }
}




async function getProductById(productId) {
    try {
        const product = await puipuiDB.findOne({ 
            "products._id": parseInt(productId)
        },
        {
            projection: { "products.$": 1 } 
        });

        if (product && product.products.length > 0) {
            return product.products[0]; 
        } else {
            return { error: "Product not found" };
        }
    } catch (error) {
        console.error(`Error fetching PuiPui product with ID ${productId}:`, error);
        return { error: error.message };
    }
}

export { getProduct, getProductById };
