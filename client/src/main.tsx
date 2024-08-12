import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext } from "react";

export type urlList = {
  longURL: string;
  shortURL: string;
};

export const URLContext = createContext<{
  urls: urlList;
  setURLs: (urls: urlList) => void;
}>({
  urls: { longURL: "", shortURL: "" },
  setURLs: () => {},
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
