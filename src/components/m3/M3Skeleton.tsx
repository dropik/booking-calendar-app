import React from "react";
import Skeleton, { SkeletonProps } from "@mui/material/Skeleton";

export default function M3Skeleton(props: SkeletonProps): JSX.Element {
  return <Skeleton {...props} animation="wave" />;
}
