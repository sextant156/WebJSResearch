import React from "react"
import MainStore from './Main.Store'

class RootStore 
{
  // 组合模块
  constructor() 
  {
    this.mainStore = new MainStore();
  }
}
// 导入useStore方法供组件使用数据
const StoresContext = React.createContext(new RootStore())
export const useStore = () => React.useContext(StoresContext)