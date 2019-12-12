import React from 'react'
import { Component } from 'react'
import { Provider } from 'mobx-react'

import { TodoStore } from './TodoStore'
import NoteList from "./NoteList";

class App extends Component {
  private todoStore: TodoStore = new TodoStore();

  render() {
    return (
        <Provider todoStore={this.todoStore}>
          <div>
            <NoteList/>
          </div>
        </Provider>
    )
  }
}

export default App;
