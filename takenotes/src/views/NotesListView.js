import React from 'react';
import { connect } from 'react-redux';
import { NotesList } from '../components/NotesList/NotesList';
import { fetchNotes } from '../store/actions';

class NotesListView extends React.Component {
  state = {
    notesArray: []
  }

  componentDidMount() {
    console.log('comp did mount')
    this.props.fetchNotes();
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.notesList, 'notesList props')
    if (this.props.notesList !== prevProps.notesList) {
      this.setState({ notesArray: this.props.notesList })
    }
  };

  render() {
    return this.state.notesArray.length > 0 ? <NotesList {...this.props} notes={this.state.notesArray} /> : <div>loading...</div> ;    
  }
}

const mapStateToProps = state => {
  return { 
    notesList: state.notes 
  }
}

export default connect(mapStateToProps, { fetchNotes })(NotesListView);