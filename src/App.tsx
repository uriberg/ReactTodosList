import React from 'react'
import { Component } from 'react'
import { Provider } from 'mobx-react'

import { TodoStore } from './TodoStore'
import { TodoAdd } from './TodoAdd'
import { TodoList } from './TodoList'

class App extends Component {
  private todoStore: TodoStore = new TodoStore()

  render() {
    return (
        <Provider todoStore={this.todoStore}>
          <div>
            <TodoAdd />
            <TodoList />
          </div>
        </Provider>
    )
  }
}

export default App;
