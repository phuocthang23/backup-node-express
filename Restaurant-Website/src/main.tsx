import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PayPalScriptProvider
          options={{
            clientId:
              "AYUtXiJzxmAC25jd7x701kpPUzRb3Hr_ljGlIGnqgiOHRdGGXioSXRVIwPMGFa5pxa3w_Wgab8N3Z9WD",
          }}
        >
          <App />
        </PayPalScriptProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
