import React from "react";

import { type ComponentProps } from "@guyromellemagayano/utils";

export interface CommonIconProps
  extends React.ComponentProps<"svg">,
    ComponentProps {}
export type CommonIconComponent = React.FC<CommonIconProps>;
