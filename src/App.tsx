import { useState } from "react";
import { MantineProvider, Text } from "@mantine/core";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import Home from "./pages/Home";
import Password from "./pages/Password";

export default function App() {
  const [email, setEmail] = useState<string>("");
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RouterProvider
        router={createBrowserRouter([
          { path: "/", element: <Home setEmail={setEmail} /> },
          { path: "/signin/password", element: <Password email={email} /> },
        ])}
      />
    </MantineProvider>
  );
}
