import { BrowserRouter,Routes,Route } from "react-router-dom";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import Test from "./pages/Test";
import Regs from "./pages/Regs";

function App() 
{
  //路由配置
  

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/*创建路由path和组件对应关系*/}
          <Route path='/Layout' element={<Layout/>}>
          </Route>
          <Route path='/Login' element={<Login />}>
          </Route> 
          {<Route path='/Test' element={<Test />}>
          </Route>}
          {<Route path='/Regs' element={<Regs />}>
          </Route>}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
