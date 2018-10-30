import React, { Component } from 'react';
import './App.css';
import { NavLink, Route } from 'react-router-dom';

import { HomeView } from './views/HomeView';
import NotesListView from './views/NotesListView';
import AddNoteView from './views/AddNoteView';
import { SignUpView } from './views/SignUpView';
import { LoginView } from './views/LoginView';






class App extends Component {
  render() {
   return (     
     <div className='App'>      
      <div className='navbar'>
        <ul className='navbar-list'>

          <li className='nav-button'>
            <NavLink exact to='/'>Home</NavLink>
          </li>
          <li className='nav-button'>
            <NavLink exact to='/notes'>View Your Notes</NavLink>
          </li>
          <li className='nav-button'>
            <NavLink exact to='/note-form'>+ Create New Note</NavLink>
          </li>
          <li className='nav-button'>
            <NavLink exact to='/sign-up'>Sign Up</NavLink>
          </li>
          <li className='nav-button'>
            <NavLink exact to='/login'>Log In</NavLink>
          </li>

        </ul>
      </div>
      <Route exact path='/' component={HomeView} />
      <Route exact path='/notes' component={NotesListView} />
      <Route exact path='/note-form' component={AddNoteView} />
      <Route exact path='/sign-up' component={SignUpView} />
      <Route exact path='/login' component={LoginView} />
     </div>
   )
  }
}

export default App;
