// puipuiDbController.js
import { puipuiDB } from "../api/database/db.js"; // Ensure puipuiDB is an initialized collection

async function getPuiPui() {
    try {
        const allPuiPui = await puipuiDB.find().toArray();
        console.log("Retrieved data:", allPuiPui); 
        return allPuiPui; // Return the array directly
    } catch (error) {
        return { error: error.message }; // Return error as a plain object
    }
}

export { getPuiPui };
