import { puipuiDB } from "../api/database/db.js"; 


async function getPuiPui(page = 1) {
    const limit = 4; 
    const skip = (page - 1) * limit; 

    try {
        const allPuiPui = await puipuiDB.find().skip(skip).limit(limit).toArray(); 
        const totalProducts = await puipuiDB.countDocuments(); 
        
        console.log("Retrieved data:", allPuiPui); 
        return {
            products: allPuiPui,
            totalPages: Math.ceil(totalProducts / limit), 
        }; 
    } catch (error) {
        return { error: error.message }; 
    }
}

async function getPuiPuiById(productId) {
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

export { getPuiPui, getPuiPuiById };
