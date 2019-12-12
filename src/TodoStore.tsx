import { observable, action, reaction, computed } from 'mobx';
import axios from 'axios';


export interface Todo {
    task: string
    isComplete: boolean
    _id?: string
}

export interface Note {
    name: string;
    _id: any;
    todoList: Todo [];
}

export class TodoStore {
    @observable todoList: Todo[] = [{task: 'bibi', isComplete: true}];
    @observable notesList: Note [] = [];
    @observable currNote: string = '';

    constructor() {
        reaction(
            () => this.todoList.filter(todo => !todo.isComplete),
            incompletedTasks => {
                if (incompletedTasks.length > 5) {
                    alert("Dude. You've got too much on your plate.")
                }
            }
        )
    }

    @computed
    get completedTasks(): number {
        return this.todoList.filter(todo => todo.isComplete).length
    }

    @action
    getNotes(){
        axios.get('http://localhost:5000/notes')
            .then(response => {
                //console.log(response);
                this.notesList = response.data;
            });
    }

    @action
    addNote(note: any){
        axios.post('http://localhost:5000/notes/add', note)
            .then(res => {
                console.log(res);
                console.log(res.data);
                console.log(res.data._id);
                const noteToAdd = {
                    name: note.name,
                    _id: res.data._id,
                    todoList: res.data.todoList
                };
                this.notesList.push(noteToAdd);
                console.log(this.notesList);
            })
            .catch(err => console.log(err));
    }

    @action
    addTodo(noteId: string, todo: Todo) {
        console.log(todo);
        axios.post('http://localhost:5000/notes/' + noteId + '/todoList/add', {noteId, todo})
            .then(res => {
                //console.log(res.data);
               // console.log(this.notesList);
                this.getNotes();
                //res.data.todoList.push(todo);
            })
            .catch(err => console.log(err));
    }

    @action
    toggleCheckbox(noteId: string, todoId: string){
        axios.put('http://localhost:5000/notes/' + noteId + '/todoList/' + todoId)
            .then(response => {
                console.log(response);
                this.getNotes();
            })
            .catch(err => console.log(err));
    }

    @action
    deleteNote(id: string){
        axios.delete('http://localhost:5000/notes/'+id)
            .then(response => {
                console.log(response.data)
                this.notesList = this.notesList.filter(note => note._id !== id);
            })
            .catch(err => console.log(err));
    }

    @action
    completeTodo(completedTodo: Todo) {
            // @ts-ignore
        this.todoList.find((todo: Todo) => todo === completedTodo).isComplete = true
    }
}

//export const todoStore = new TodoStore();

