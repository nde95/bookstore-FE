import { SD_Status } from "../Utils/SD";
import orderDetails from "./orderDetails";

export default interface orderHeader {
  orderHeaderId?: number;
  pickupName?: string;
  pickupPhoneNumber?: string;
  pickupEmail?: string;
  applicationUserId?: string;
  user?: any;
  orderTotal?: number;
  orderDate?: Date;
  stripePaymentIntentId?: string;
  status?: SD_Status;
  totalItems?: number;
  orderDetails?: orderDetails[];
}
