import jwt_decode from "jwt-decode";
import { SD_Roles } from "../Utils/SD";

const withAdminAuth = (WrappedComponent: any) => {
    return(props: any) => {
        const accessToken = localStorage.getItem("token") ?? "";

        if (accessToken) {
            const decode: {
                role: string
            } = jwt_decode(accessToken);

            if (decode.role !== SD_Roles.ADMIN){
                window.location.replace("/accessDenied");
                return null;
            }
        } else {
            window.location.replace("/Login");
            return null;
        }
        return <WrappedComponent {...props} />
    };
};

export default withAdminAuth;