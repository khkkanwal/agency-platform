import React from "react";

function Container({ children, className = "" }) {
  return (
    <div className={`w-full max-w-[1200px] mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
}

export default Container;
