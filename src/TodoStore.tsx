import { observable, action, reaction, computed } from 'mobx'

export interface Todo {
    task: string
    isComplete: boolean
}

export class TodoStore {
    @observable todoList: Todo[] = []

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
    addTodo(task: string) {
        this.todoList.push({ task, isComplete: false })
    }

    @action
    completeTodo(completedTodo: Todo) {
            // @ts-ignore
        this.todoList.find((todo: Todo) => todo === completedTodo).isComplete = true
    }
}

export const todoStore = new TodoStore();

