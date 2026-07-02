/** @format */

import React, { ReactNode } from "react";

type BodyBaseProps = {
  children?: ReactNode;
};

const Base0 = ({ children }: BodyBaseProps) => {
  return (
    <div
      id="base0"
      className="relative z-0 box-border flex h-full w-full flex-col overflow-x-hidden overflow-y-auto transition-all duration-500 ease-out"
    >
      {children}
    </div>
  );
};

export default Base0;
