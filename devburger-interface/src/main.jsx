import React from "react";
import ReactDOM from "react-dom/client";
import GloblaStyles from "./styles/GloblaStyles";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "./hooks";
import { Elements } from '@stripe/react-stripe-js'
import stripePromise from "./config/stripeConfig";
import { ThemeProvider } from "styled-components";
import { standardTheme } from './styles/themes/standard'
import { Router } from "./routes";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ThemeProvider theme={standardTheme}>
			<AppProvider>
				<Elements stripe={stripePromise}>
					<BrowserRouter>
						<Router />
					</BrowserRouter>
				</Elements>
				<GloblaStyles />
				<ToastContainer autoClose={2000} theme="colored" />
			</AppProvider>
		</ThemeProvider>
	</React.StrictMode>,
);
