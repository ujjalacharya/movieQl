import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import MoviesList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import Modal from "./components/Modal";
import GlobalModalContextProvider from "./context/Modal";
import React from "react"

const App = () => {
  return (
    <GlobalModalContextProvider>
      <Router>
        <div className="App">
          <Modal />
          <Toaster position="bottom-center" reverseOrder={false} />

          <Routes>
            <Route path="/" element={<MoviesList />} />
            <Route path="/:id" element={<MovieDetail />} />
          </Routes>
        </div>
      </Router>
    </GlobalModalContextProvider>
  );
};

export default App;
