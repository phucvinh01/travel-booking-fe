import LoadingScreen from "../components/LoadingScreen";
import { Suspense, lazy, useEffect } from "react";



const Loadable = (Component) => (props) => {
    return (
        <Suspense fallback={ <LoadingScreen /> }>
            <Component { ...props } />
        </Suspense>
    );
};

export default Loadable