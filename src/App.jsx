import React, { useRef, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import MainContent from './Components/MainContent';
import Gallery from './Components/Gallery';
import Projects from './Components/Projects';

function App() {

  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

  
  };


  const footerRef = useRef(null);

  // Function to scroll to the footer
  const scrollToFooter = () => {
    footerRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
<>
    <Router>
      <Header searchQuery={searchQuery} handleSearch={handleSearch} 
      scrollToFooter={scrollToFooter} />

        <Routes>
          <Route path="/" element={<MainContent searchQuery={searchQuery}/>} />
          <Route path="/gallery" element={<Gallery searchQuery={searchQuery} />} />
          <Route path="/projects" element={<Projects searchQuery={searchQuery} />} />
          <Route path="/project" element={<Projects searchQuery={searchQuery} />} />
        </Routes>
        <Footer footerRef={footerRef}/>
    </Router>
    
    </>
  )
}

export default App
