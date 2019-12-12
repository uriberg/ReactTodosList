import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {Todo, TodoStore, Note} from './TodoStore';
import {TodoListItem} from './TodoListItem'
import {NoteListItem} from "./NoteListItem";
import {Button, Label} from "semantic-ui-react";

interface NoteListProps {
    todoStore?: TodoStore;
}

@inject('todoStore')
@observer
export class NoteList extends Component<NoteListProps> {


    componentDidMount(): void {
        this.props.todoStore!.getNotes();
    }

    handleNoteChange = ({ currentTarget: { value } }: React.SyntheticEvent<HTMLInputElement>) => {
        this.props.todoStore!.currNote = value
    };

    handleAddNote = () => {
        const noteToAdd = {
            name: this.props.todoStore!.currNote
        };
        this.props.todoStore!.addNote(noteToAdd);
        this.props.todoStore!.currNote = ''
    };

    handleDeleteNote = (id: string) => {
        this.props.todoStore!.deleteNote(id);
    };

    addTodoToNote = (id: string, task: Todo) => {
        this.props.todoStore!.addTodo(id, task);
    };

    handleCheckboxToggle = (noteId: string, todoId: string) => {
      this.props.todoStore!.toggleCheckbox(noteId, todoId);
    };

    render() {
        return (
            <div>
                <Label pointing="right">Enter a new note name</Label>
                <input value={this.props.todoStore!.currNote} onChange={this.handleNoteChange} />
                <Button primary onClick={this.handleAddNote}>Add</Button>
                {this.props.todoStore!.notesList.map((note: any) => (
                    <NoteListItem key={note._id} note={note}  deleteNote={this.handleDeleteNote} addingTodo={this.addTodoToNote} toggleTodoCheckbox={this.handleCheckboxToggle}/>
                ))}
            </div>
        )
    }

}



export default NoteList;
