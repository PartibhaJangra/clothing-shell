import { Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";

import { checkUserSession } from "./store/user/user.action.js";
import Spinner from "./components/spinner/spinner.component.jsx";

const Home = lazy(() => import("./routes/home/home.component.jsx"));
const Authentication = lazy(() =>
  import("./routes/authentication/authentication.component.jsx")
);
const Navigation = lazy(() =>
  import("./routes/navigation/navigation.component.jsx")
);
const Shop = lazy(() => import("./routes/shop/shop.component.jsx"));
const Checkout = lazy(() =>
  import("./routes/checkout/checkout.components.jsx")
);

const App = () => {
  const dispatch = useDispatch(); // creating dispatch instance for the whole app

  // should run as soon as the app first mounts hence in app.js
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
