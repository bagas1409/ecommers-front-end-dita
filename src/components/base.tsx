/** @format */

import React, { ReactNode } from "react";

type BodyBaseProps = {
  children?: ReactNode;
};

const Base = ({ children }: BodyBaseProps) => {
  return (
    <div
      id="base"
      className="relative z-0 box-border flex h-full w-full flex-col overflow-x-hidden overflow-y-auto rounded-2xl p-2 transition-all duration-500 ease-out"
    >
      {children}
    </div>
  );
};

export default Base;
