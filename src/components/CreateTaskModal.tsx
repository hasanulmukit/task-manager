"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FiX } from "react-icons/fi";

const schema = z.object({
  content: z.string().min(1, "Task content is required"),
});

type FormData = z.infer<typeof schema>;

export default function CreateTaskModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (content: string) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Task</h2>
          <button onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>
        <form
          onSubmit={handleSubmit((data) => onCreate(data.content))}
          className="space-y-4"
        >
          <div>
            <input
              {...register("content")}
              className="w-full p-2 border rounded"
              placeholder="Task description"
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}