import { Routes, Route, Outlet } from "react-router-dom";

import Home from "./routes/home/home.component.jsx";
import Navigation from "./routes/navigation/navigation.component.jsx";
import SignIn from "./routes/sign-in/sign-in.component.jsx";

const Shop = () => <h1>Iam a shop component</h1>;

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} /> /* adding sign in
        component */
      </Route>
    </Routes>
  );
};

export default App;
