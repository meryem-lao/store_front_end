import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./views/admin/dashboard";
import Productcrud from "./views/admin/crudproduct/productcrud";
import Home from './views/home';
import Categorycrud from "./views/admin/crudcategory/categorycrud";
import Postproductform from "./views/admin/crudproduct/postproductform";
import Updateproductform from "./views/admin/crudproduct/updateproductform";
import Showproduct from "./views/admin/crudproduct/showproduct";
import Showcategory from "./views/admin/crudcategory/showcategory";
import Orderslist from "./views/admin/crudorder/orderslist";
import Postcategory from "./views/admin/crudcategory/postcategory";
import Updatecategory from "./views/admin/crudcategory/updatecategory";
import ShowOrderdetals from "./views/admin/crudorder/showOrderdetals";
import Showcarddetails from "./views/shopcard/showcarddetails";
import Userslist from "./views/admin/usercrud/userslist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/showProduct/:id" element={<Showproduct />} />
        <Route path="/admin" element={<Dashboard />}>
          <Route path="/admin" element={<Productcrud />} />
          <Route path="/admin/addProduct" element={<Postproductform />} />
          <Route path="/admin/updateProduct/:id" element={<Updateproductform />} />
          <Route path="/admin/category" element={<Categorycrud />} />
          <Route path="/admin/showCategory/:id" element={<Showcategory />} />
          <Route path="/admin/addcategory" element={<Postcategory />} />
          <Route path="/admin/updateCategory/:id" element={<Updatecategory />} />
          <Route path="/admin/crudorder" element={<Orderslist />} />
          <Route path="/admin/showOrderDetails/:id" element={<ShowOrderdetals />} />
          <Route path="/admin/cruduser" element={<Userslist />} />
        </Route>
        <Route path="/shopList" element={<Showcarddetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
