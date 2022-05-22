import React from "react";

function Layout({ children }) {
  return (
    <>
      <LayoutContainer children={children} />
    </>
  );
}

const LayoutContainer = ({ children }) => {
  return <>{children}</>;
};

export default Layout;
