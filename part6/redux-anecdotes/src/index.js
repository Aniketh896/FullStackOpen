import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store2 from './store'
//import { store1 } from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store2}>
    <App />
  </Provider>
)
