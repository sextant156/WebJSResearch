import { BrowserRouter,Routes,Route } from "react-router-dom";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import Feiju from "./pages/Feiju";

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
          {<Route path='/Feiju' element={<Feiju />}>
          </Route>}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
