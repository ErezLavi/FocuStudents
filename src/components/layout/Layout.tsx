import * as React from "react";
import { Fragment } from "react";
import MainNavigation from "./mainNavigation/MainNavigation";


type LayoutProps = {
  children: React.ReactNode; 
};

const Layout = (props: LayoutProps) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;