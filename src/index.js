import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//引入 antd样式文件
//引入 index.scss文件
import 'antd'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
