import React from "react";
import MainStore from './Main.Store';
import UserStore from './User.Store';
class RootStore 
{
  // 组合模块
  constructor() 
  {
    this.mainStore = new MainStore();
    this.userStore = new UserStore();
  }
}
// 导入useStore方法供组件使用数据
const StoresContext = React.createContext(new RootStore())
export const useStore = () => React.useContext(StoresContext)