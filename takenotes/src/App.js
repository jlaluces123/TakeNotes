import React, { Component } from 'react';
import './App.css';
import { NavLink, Route } from 'react-router-dom';

import { HomeView } from './views/HomeView';
import NotesListView from './views/NotesListView';
import AddNoteView from './views/AddNoteView';
import { SignUpView } from './views/SignUpView';
import { LoginView } from './views/LoginView';
import SingleNoteView from './views/SingleNoteView';






class App extends Component {
  render() {
   return (     
     <div className='App'>      
      <div className='navbar'>
        <ul className='navbar-list'>
          <NavLink exact to='/' className='nav-link home-button'></NavLink>                    
          <NavLink exact to='/notes' className='nav-link notes-button'></NavLink>                    
          <NavLink exact to='/note-form' className='nav-link add-button'></NavLink>                    
          <NavLink exact to='/sign-up' className='nav-link sign-up'></NavLink>                    
          <NavLink exact to='/login' className='nav-link login'></NavLink>          
        </ul>
      </div>
      <Route exact path='/' component={HomeView} />
      <Route exact path='/notes' component={NotesListView} />
      <Route path='/notes/:noteId' component={SingleNoteView} />
      <Route exact path='/note-form' component={AddNoteView} />
      <Route exact path='/sign-up' component={SignUpView} />
      <Route exact path='/login' component={LoginView} />
     </div>
   )
  }
}

export default App;
