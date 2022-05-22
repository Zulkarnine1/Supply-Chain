import React, { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  if (address) {
    return children;
  }
  return <></>;
}

export default ProtectedRoute;
