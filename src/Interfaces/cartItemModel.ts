import { productsModel } from ".";

export default interface cartItemModel {
    id?: number, 
    productItemId?: number; 
    productItem?: productsModel;
    quantity?: number, 

}