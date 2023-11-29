import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import './index.css';
import router from './router/index.js';
import { RouterProvider } from 'react-router-dom';
import store from './store/index.js';
import { Provider } from 'react-redux/es/exports.js';
import { setTopic } from './utils/setTopic.js';

window.onload = () => {
  let index = localStorage.getItem("topic_number")
  if (index) {
    setTopic(parseInt(index) || 0)
  }
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
