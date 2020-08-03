import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "./providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import { Dashboard } from "./Dashboard";
import { AcitivyLog } from "./ActivityLog";



export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main id="override">
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/activitylog">
                    {isLoggedIn ? <AcitivyLog /> : <Redirect to="/login" />}
                </Route>

            </Switch>
        </main>
    );
};