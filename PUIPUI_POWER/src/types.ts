// types.js
export interface Product {
    _id: string; // Unique identifier
    name: string; // Product name
    description: string;
    price: number; // Product price
    imgUrl: string; // URL of the product image
    stock: number; // Number of items in stock
}

