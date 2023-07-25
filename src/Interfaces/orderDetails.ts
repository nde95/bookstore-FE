import { productsModel } from ".";

export default interface orderDetails {
    orderDetailId?: number; 
    orderHeaderId?: number;
    productItemId?: number;
    productItem?: productsModel; 
    quantity?: number;
    itemName?: string;
    price?: number;
}