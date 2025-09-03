import React from "react";

import { CardLinkCustom } from "../_internal/CardLink/CardLinkCustom";

export interface CardComponentsWithLinks
  extends Pick<
    React.ComponentPropsWithoutRef<typeof CardLinkCustom>,
    "href" | "target" | "title"
  > {}
