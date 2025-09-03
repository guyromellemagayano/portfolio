import React from "react";

import { type ComponentProps } from "@guyromellemagayano/utils";

export interface CommonContainerProps
  extends React.ComponentProps<"div">,
    ComponentProps {}

export type CommonContainerComponent = React.FC<CommonContainerProps>;
