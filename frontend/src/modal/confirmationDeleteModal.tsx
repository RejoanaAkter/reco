"use client";

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[999] 
                 bg-black/40 transition-opacity duration-300"
      onClick={onClose} // close on backdrop click
    >
      {/* Modal Box */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6
                   animate-[fadeIn_0.25s_ease-out,scaleIn_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Delete Recipe?
        </h2>

        <p className="text-gray-600 text-sm mb-6">
          Are you sure you want to delete this recipe? This action cannot be
          undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1 rounded border border-gray-500 
                       hover:bg-gray-100 text-gray-700 transition text-sm"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-1 rounded bg-red-600 text-white 
                       hover:bg-red-700 transition text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
