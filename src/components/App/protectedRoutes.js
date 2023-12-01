import { Route } from "react-router-dom";

export default function protectedRoutes({ componet: Componet, ...rest}) {
    return(
        <Route>
            {...rest}
            render={(props) => {
                const token = localStorage.getItem('token');

                if(token) {
                    return <Componet {...props}/>;
                } else {
                    return (
                        <Redirect>
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location,
                                },
                            }}
                        </Redirect>
                    )
                }
            }}
        </Route>
    )
}