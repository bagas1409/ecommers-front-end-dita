/** @format */

import React, { ReactNode } from "react";

type BodyBaseProps = {
  children?: ReactNode;
};

const BodyBase = ({ children }: BodyBaseProps) => {
  return (
    <div
      id="bodybase"
      className="bg-accent relative z-0 box-border flex h-fit w-full flex-col overflow-x-hidden overflow-y-auto rounded-2xl transition-all duration-500 ease-out"
    >
      {children}
    </div>
  );
};

export default BodyBase;
