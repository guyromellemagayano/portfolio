import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";

export interface CommonContainerProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}

export type CommonContainerComponent = React.FC<CommonContainerProps>;
