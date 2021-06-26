import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import Navbar from './components/navbar/navbar.component';
import HomePage from './pages/home/home.page';
import UploadPage from './pages/upload/upload.page';

export default function App() {
  return (
    <Router>
      <Navbar />
      {/* a div that takes up the entire screen */}
      <div className="h-screen">
        <Switch>
          <Route path="/upload" component={UploadPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
}
