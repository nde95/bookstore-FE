import { SD_Status } from "../Utils/SD";

const getStatusColor = (status: SD_Status) => {
  return status === SD_Status.CONFIRMED
    ? "primary"
    : status === SD_Status.PENDING
    ? "secondary"
    : status === SD_Status.CANCELLED
    ? "danger"
    : status === SD_Status.DELIVERED
    ? "success"
    : status === SD_Status.HANDED_TO_CARRIER
    ? "info"
    : status === SD_Status.SHIPPED && "warning";
};

export default getStatusColor;
