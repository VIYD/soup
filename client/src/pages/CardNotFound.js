import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <p>Card With This ID was Not Found</p>
      <Link to="/">Return to the Home Page</Link>
    </div>
  );
}

export default PageNotFound;
