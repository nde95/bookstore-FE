const withAuth = (WrappedComponent: any) => {
    return(props: any) => {
        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
            window.location.replace("/Login");
            return null;
        }
        return <WrappedComponent {...props} />
    }
};

export default withAuth;