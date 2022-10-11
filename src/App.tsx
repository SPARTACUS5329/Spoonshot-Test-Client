import React from "react";
import { Router, Switch, Route } from "wouter";
import "./App.css";
import { Home } from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" component={Home} />
				<Route path="/:rest*" component={Home} />
			</Switch>
		</Router>
	);
}

export default App;
