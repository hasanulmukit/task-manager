"use client";

import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import Column from "./Column";
import ColumnModal from "./ColumnModal";
import type { Column as ColumnType, Task } from "@/types";

const Board = () => {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showColumnModal, setShowColumnModal] = useState(false);

  // Load initial data
  useEffect(() => {
    const savedColumns = localStorage.getItem("columns");
    const savedTasks = localStorage.getItem("tasks");
    if (savedColumns) setColumns(JSON.parse(savedColumns));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  // Persist data
  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [columns, tasks]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    const newTasks = Array.from(tasks);
    const [movedTask] = newTasks.splice(source.index, 1);
    
    // Update task status
    movedTask.status = destination.droppableId;
    
    // Insert at new position
    newTasks.splice(destination.index, 0, movedTask);

    setTasks(newTasks);
  };

  const handleCreateTask = (content: string, status: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      content,
      status,
    };
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleColumnSubmit = (data: { title: string; status: string }) => {
    const newColumn: ColumnType = {
      id: data.status.toLowerCase(),
      title: data.title,
      status: data.status,
    };
    setColumns([...columns, newColumn]);
    setShowColumnModal(false);
  };

  const handleDeleteColumn = (columnStatus: string) => {
    setColumns(columns.filter(col => col.status !== columnStatus));
    setTasks(tasks.filter(task => task.status !== columnStatus));
  };

  const handleEditColumn = (updatedColumn: ColumnType) => {
    setColumns((prev: ColumnType[]) => 
      prev.map(col => 
        col.status === updatedColumn.status ? updatedColumn : col
      )
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-4 h-screen overflow-x-auto">
        {columns.map((column) => (
          <Column
          key={column.status}
          column={column}
          tasks={tasks.filter(task => task.status === column.status)}
          onCreateTask={handleCreateTask}
          onDeleteColumn={handleDeleteColumn}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onEditColumn={handleEditColumn}
        />
        ))}
        
        <div className="w-72">
          <button
            onClick={() => setShowColumnModal(true)}
            className="w-full h-full bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition-colors"
          >
            + Add Column
          </button>
        </div>

        {showColumnModal && (
          <ColumnModal
            onClose={() => setShowColumnModal(false)}
            onSubmit={handleColumnSubmit}
          />
        )}
      </div>
    </DragDropContext>
  );
};

export default Board;