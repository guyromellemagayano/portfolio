import React from "react";

import {
  Div,
  type DivProps,
  type DivRef,
  Heading,
  type HeadingProps,
  type HeadingRef,
  Li,
  type LiProps,
  type LiRef,
  Ol,
  type OlProps,
  type OlRef,
  P,
  type PProps,
  type PRef,
  Time,
  type TimeProps,
  type TimeRef,
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export type TimelineProps = OlProps;
export type TimelineItemProps = LiProps & {
  description?: React.ReactNode;
  descriptionProps?: TimelineDescriptionProps;
  marker?: React.ReactNode;
  markerProps?: TimelineMarkerProps;
  time?: React.ReactNode;
  timeProps?: TimelineTimeProps;
  title?: React.ReactNode;
  titleProps?: TimelineTitleProps;
};
export type TimelineMarkerProps = DivProps;
export type TimelineTitleProps = HeadingProps;
export type TimelineDescriptionProps = PProps;
export type TimelineTimeProps = TimeProps;

function hasRenderableContent(value: React.ReactNode) {
  return value !== null && value !== undefined && value !== false;
}

export const Timeline = React.forwardRef<OlRef, TimelineProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <Ol
      ref={ref}
      {...rest}
      className={cn("relative space-y-6", className)}
      data-slot={getDataSlot(props, "timeline")}
    />
  );
});

Timeline.displayName = "Timeline";

export const TimelineItem = React.forwardRef<LiRef, TimelineItemProps>(
  (props, ref) => {
    const {
      children,
      className,
      description,
      descriptionProps,
      marker,
      markerProps,
      time,
      timeProps,
      title,
      titleProps,
      ...rest
    } = props;
    const hasTime = hasRenderableContent(time);
    const hasTitle = hasRenderableContent(title);
    const hasDescription = hasRenderableContent(description);

    return (
      <Li
        ref={ref}
        {...rest}
        className={cn("grid grid-cols-[auto_1fr] gap-4", className)}
        data-slot={getDataSlot(props, "timeline-item")}
      >
        <TimelineMarker {...markerProps}>{marker}</TimelineMarker>
        <Div className="min-w-0 space-y-1" data-slot="timeline-content">
          {hasTime ? <TimelineTime {...timeProps}>{time}</TimelineTime> : null}
          {hasTitle ? (
            <TimelineTitle {...titleProps}>{title}</TimelineTitle>
          ) : null}
          {hasDescription ? (
            <TimelineDescription {...descriptionProps}>
              {description}
            </TimelineDescription>
          ) : null}
          {children}
        </Div>
      </Li>
    );
  }
);

TimelineItem.displayName = "TimelineItem";

export const TimelineMarker = React.forwardRef<DivRef, TimelineMarkerProps>(
  (props, ref) => {
    const {
      "aria-hidden": ariaHidden = true,
      children,
      className,
      ...rest
    } = props;

    return (
      <Div
        ref={ref}
        aria-hidden={ariaHidden}
        {...rest}
        className={cn(
          "border-primary/30 bg-background relative mt-1 flex size-3 items-center justify-center rounded-full border",
          className
        )}
        data-slot={getDataSlot(props, "timeline-marker")}
      >
        {children}
      </Div>
    );
  }
);

TimelineMarker.displayName = "TimelineMarker";

export const TimelineTime = React.forwardRef<TimeRef, TimelineTimeProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Time
        ref={ref}
        {...rest}
        className={cn("text-muted-foreground text-xs font-medium", className)}
        data-slot={getDataSlot(props, "timeline-time")}
      />
    );
  }
);

TimelineTime.displayName = "TimelineTime";

export const TimelineTitle = React.forwardRef<HeadingRef, TimelineTitleProps>(
  (props, ref) => {
    const { as = "h3", className, ...rest } = props;

    return (
      <Heading
        ref={ref}
        as={as}
        {...rest}
        className={cn("text-base font-semibold tracking-normal", className)}
        data-slot={getDataSlot(props, "timeline-title")}
      />
    );
  }
);

TimelineTitle.displayName = "TimelineTitle";

export const TimelineDescription = React.forwardRef<
  PRef,
  TimelineDescriptionProps
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <P
      ref={ref}
      {...rest}
      className={cn("text-muted-foreground text-sm leading-6", className)}
      data-slot={getDataSlot(props, "timeline-description")}
    />
  );
});

TimelineDescription.displayName = "TimelineDescription";
