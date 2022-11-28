import React from "react";
import Helmet from "react-helmet";

const HelmetComp = (props) => {
  return (
    <div>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
    </div>
  );
};

export default HelmetComp;
