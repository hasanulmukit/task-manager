"use client";

import { Droppable } from "@hello-pangea/dnd";
import { FiPlus, FiSettings } from "react-icons/fi";
import { useState } from "react";
import type { Column as ColumnType, Task } from "@/types";
import TaskCard from "./TaskCard";
import CreateTaskModal from "./CreateTaskModal";
import ColumnModal from "./ColumnModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const Column = ({
  column,
  tasks,
  onCreateTask,
  onDeleteColumn,
  onEditTask,
  onDeleteTask,
  onEditColumn,
}: {
  column: ColumnType;
  tasks: Task[];
  onCreateTask: (content: string, status: string) => void;
  onDeleteColumn: (status: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onEditColumn: (updatedColumn: ColumnType) => void;
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="w-72 bg-gray-100 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{column.title}</h3>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-gray-500 hover:text-gray-700">
              <FiSettings size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white p-2 rounded shadow-lg z-50">
              <DropdownMenuItem
                onClick={() => setShowEditModal(true)}
                className="p-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDeleteColumn(column.status)}
                className="p-2 hover:bg-gray-100 rounded cursor-pointer text-red-600"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            onClick={() => setShowCreateModal(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiPlus size={18} />
          </button>
        </div>
      </div>

      <Droppable droppableId={column.status}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {showCreateModal && (
        <CreateTaskModal
          onClose={() => setShowCreateModal(false)}
          onCreate={(content) => {
            onCreateTask(content, column.status);
            setShowCreateModal(false);
          }}
        />
      )}

{showEditModal && (
        <ColumnModal
          mode="edit"
          initialData={{ title: column.title, status: column.status }}
          onClose={() => setShowEditModal(false)}
          onSubmit={(data) => {
            onEditColumn({
              ...column,
              title: data.title,
            });
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Column;