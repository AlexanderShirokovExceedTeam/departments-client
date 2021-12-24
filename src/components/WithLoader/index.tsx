import React, { FC } from "react";

import { Typography } from "@mui/material";

// interface IWithLoader {
//   isLoading: boolean,
// }

const withLoader =
  (WrappedComponent: any) =>
  ({ isLoading, ...rest }: any) =>
    (
      <>
        {isLoading ? (
          <Typography align="center" color="lightgray" variant="h3">
            Loading...
          </Typography>
        ) : (
          <WrappedComponent {...rest} />
        )}
      </>
    );

export default withLoader;
