import React from 'react'
import { observer, inject } from 'mobx-react'

import {Todo, TodoStore} from './TodoStore';
import { TodoListItem } from './TodoListItem'

interface TodoListProps {
    todoStore?: TodoStore,
}

const TodoListComponent = ({todoStore: { todoList: } } : TodoListProps) => (
    <>
        {todoList.map((todo: Todo, idx: any) => (
            <TodoListItem key={idx} todo={todo} />
        ))}
    </>
);

export const TodoList = inject('todoStore')(observer(TodoListComponent))