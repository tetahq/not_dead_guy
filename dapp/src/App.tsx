import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Providers from "./providers"
import Dapp from './screens/dapp'

function App() {
    return (
        <Providers>
            <Switch>
                <Route>
                    <Dapp/>
                </Route>
            </Switch>
        </Providers>
    );
}

export default App;
