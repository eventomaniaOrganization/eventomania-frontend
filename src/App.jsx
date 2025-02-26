import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/footer.jsx';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/Events"
              element={<Events />}
            />
            <Route
              path="/About"
              element={<About />}
            />
            <Route
              path="/Contact"
              element={<Contact />}
            />
            <Route
              path="/Login"
              element={<Login />}
            />
            <Route
              path="/Signup"
              element={<Signup />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
