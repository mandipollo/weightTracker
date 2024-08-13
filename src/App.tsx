// routers
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

// redux state
import { Provider } from "react-redux";
import store from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
let persistor = persistStore(store);

const Route = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{ path: "signup", element: <SignUp /> },
			{
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "dashboard",
				element: <DashboardPage />,
			},
		],
	},
]);

const App = () => {
	return (
		<div className="flex flex-1 ">
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<RouterProvider router={Route}></RouterProvider>
				</PersistGate>
			</Provider>
		</div>
	);
};

export default App;
