import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/Nav/navigation.component";
import Shop from "./routes/shop/shop.component";
import SignIn from "./routes/signin/signin.component";


const App = () => {
  return (
    <Routes>
      <Route path='/'element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  )
};

export default App;