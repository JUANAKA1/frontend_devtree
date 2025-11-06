import { RouterProvider } from "react-router";
import { router } from "./router/router";
import { Toaster } from "sonner";

export const DevTreeApp = () => {
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
};
