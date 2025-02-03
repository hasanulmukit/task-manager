"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FiX } from "react-icons/fi";

const schema = z.object({
  title: z.string().min(1, "Column title is required"),
  status: z.string().min(1, "Status key is required"),
});

type FormData = z.infer<typeof schema>;

export default function ColumnModal({
  mode = "create",
  initialData,
  onClose,
  onSubmit,
}: {
  mode?: "create" | "edit";
  initialData?: { title: string; status: string };
  onClose: () => void;
  onSubmit: (data: { title: string; status: string }) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {mode === "create" ? "Create Column" : "Edit Column"}
          </h2>
          <button onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              {...register("title")}
              className="w-full p-2 border rounded"
              placeholder="Column title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status Key</label>
            <input
              {...register("status")}
              className="w-full p-2 border rounded"
              placeholder="Unique status key"
              disabled={mode === "edit"}
            />
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {mode === "create" ? "Create Column" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}