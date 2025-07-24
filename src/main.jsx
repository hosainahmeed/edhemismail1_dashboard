import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { store } from './Redux/store.js';
import { Routes } from "./routes/Routes.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <RouterProvider router={Routes} />
    </Provider>
  </StrictMode>
);
