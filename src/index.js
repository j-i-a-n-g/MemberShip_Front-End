import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import './index.css';
import router from './router/index.js';
import { RouterProvider } from 'react-router-dom';
import store from './store/index.js';
import { Provider } from 'react-redux/es/exports.js';

window.onload = () => {
  window.addEventListener('storage', () => {
    console.log(12312)
  })
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
