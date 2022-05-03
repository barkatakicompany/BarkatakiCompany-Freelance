import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BarkatakiFoundation from "./BarkatakiFoundation/BarkatakiFoundation";
import DewalPanjika from "./DewalPanjika/DewalPanjika";
import Home from "./Home/Home";
import PrintingSolution from "./PrintingSolution/PrintingSolution";
import Cart from "./Store/Cart/Cart";
import Orders from "./Store/Orders/Orders";
import Product from "./Store/Product/Product";
import Store from "./Store/Store";
import PrivateRoute from "./PrivateRoute";
import SignIn from "./User/SignIn";
import User from "./User/User";
import Astrology from "./Astrology/Astrology";
import ProductManagement from "./Admin/ProductManagement/ProductManagement";
import Base from "./Base";
import AdminRoute from "./AdminRoute";
import DewalPanjikaRoute from "./DewalpanjikaRoute";
import BannerManagement from "./Admin/BannerManagement/BannerManagement";
import CoupoonManagement from "./Admin/CoupoonManagement/CoupoonManagement";
import Year from "./Admin/DewalPanjika/Year/Year";
import Month from "./Admin/DewalPanjika/Month/Month";
import Day from "./Admin/DewalPanjika/Day/Day";
import OrderManagement from "./Admin/OrderManagement/OrderManagement";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndConditions from "./TermsAndConditions";
import AstrologyManagement from "./Admin/AstrologyManagement/AstrologyManagement";
import Faq from "./Faq";
import AppOrdersManagement from "./Admin/AppOrderManagement/AppOrdersManagement";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/store" exact component={Store} />
        <Route path="/astrology" exact component={Astrology} />
        <Route path="/dewalpanjika" exact component={DewalPanjika} />
        <Route path="/printingsolution" exact component={PrintingSolution} />
        <Route path="/faq" exact component={Faq} />
        <Route path="/privacypolicy" exact component={PrivacyPolicy} />
        <Route
          path="/termsandconditions"
          exact
          component={TermsAndConditions}
        />
        <Route
          path="/store/product/:name/:productId"
          exact
          component={Product}
        />
        <Route
          path="/barkatakifoundation"
          exact
          component={BarkatakiFoundation}
        />
        <PrivateRoute path="/store/cart" exact component={Cart} />
        <PrivateRoute path="/store/orders" exact component={Orders} />
        <PrivateRoute path="/user" exact component={User} />
        <AdminRoute path="/admin/product" exact component={ProductManagement} />
        <AdminRoute path="/admin/banner" exact component={BannerManagement} />
        <AdminRoute path="/admin/coupoon" exact component={CoupoonManagement} />
        <AdminRoute path="/admin/order" exact component={OrderManagement} />
        <AdminRoute path="/admin/astro" exact component={AstrologyManagement} />
        <AdminRoute path="/admin/dewalpanjika/orders" exact component={AppOrdersManagement} />

        <DewalPanjikaRoute
          path="/admin/dewalpanjika/year"
          exact
          component={Year}
        />
        <DewalPanjikaRoute
          path="/admin/dewalpanjika/month"
          exact
          component={Month}
        />
        <DewalPanjikaRoute
          path="/admin/dewalpanjika/day"
          exact
          component={Day}
        />
        <Route
          path="*"
          render={() => (
            <Base ><div className="text-center display-4">Opps!! <br/>404, Page Not Found</div></Base>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
