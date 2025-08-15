import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router";
import { UserProvider } from "./context/user.context";
import { ClientsProvider } from "./context/clients.context";
import { ItemsProvider } from "./context/items.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<UserProvider>
				<ClientsProvider>
					<ItemsProvider>
						<App />
					</ItemsProvider>
				</ClientsProvider>
			</UserProvider>
		</BrowserRouter>
	</React.StrictMode>
);

reportWebVitals();
