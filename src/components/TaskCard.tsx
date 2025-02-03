"use client";

import { Draggable } from "@hello-pangea/dnd";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useState } from "react";
import CreateTaskModal from "./CreateTaskModal";
import type { Task } from "@/types";

const TaskCard = ({ 
  task, 
  index,
  onEdit,
  onDelete
}: { 
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}) => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group relative"
          >
            {task.content}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => setShowEditModal(true)}
                className="text-gray-500 hover:text-blue-600"
              >
                <FiEdit size={16} />
              </button>
              <button 
                onClick={() => onDelete(task.id)}
                className="text-gray-500 hover:text-red-600"
              >
                <FiTrash size={16} />
              </button>
            </div>
          </div>
        )}
      </Draggable>

      {showEditModal && (
        <CreateTaskModal
          onClose={() => setShowEditModal(false)}
          onCreate={(content) => {
            onEdit({ ...task, content });
            setShowEditModal(false);
          }}
        />
      )}
    </>
  );
};

export default TaskCard;