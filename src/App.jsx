import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { RestaurantsContextProvider } from "./context/RestaurantsContext"

import Home from "./routes/Home"
import UpdatePage from "./routes/UpdatePage"
import RestaurantDetailsPage from "./routes/RestaurantDetailsPage"

const App = () => {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/restaurants/:id/update"
              element={<UpdatePage />}
            />
            <Route
              exact
              path="/restaurants/:id"
              element={<RestaurantDetailsPage />}
            />
          </Routes>
        </Router>
      </div>
    </RestaurantsContextProvider>
  )
}

export default App
