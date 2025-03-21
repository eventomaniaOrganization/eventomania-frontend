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
import Category from './components/category/category.jsx';
import Musik from './components/category/musik.jsx';
import TeaterAndUnderhallning from './components/category/teaterAndUnderhallning.jsx';
import Sport from './components/category/sport.jsx';
import Familj from './components/category/familj.jsx';
import Festivaler from './components/category/festivaler.jsx';
import MassorAndUtstallningar from './components/category/massorAndUtstallningar.jsx';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Category />
        <main>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Events" element={<Events />}/>
            <Route path="/About" element={<About />}/>
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Musik" element={<Musik />} />
            <Route path="/TeaterAndUnderhållning" element={<TeaterAndUnderhallning/>} />
            <Route path="/Sport" element={<Sport/>} />
            <Route path="/Familj" element={<Familj/>} />
            <Route path="/Festivaler" element={<Festivaler/>} />
            <Route path="/massorAndUtstallningar" element={<>MassorAndUtstallningar</>} />

            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
