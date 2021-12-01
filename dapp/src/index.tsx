import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'

import 'styles/base.css'
import 'react-toastify/dist/ReactToastify.css'
import 'animate.css/animate.min.css'

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()
