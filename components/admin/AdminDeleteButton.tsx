"use client";

type AdminDeleteButtonProps = {
  label?: string;
  confirmMessage?: string;
};

export function AdminDeleteButton({
  label = "Delete",
  confirmMessage,
}: AdminDeleteButtonProps) {
  return (
    <button
      type="submit"
      className="rounded-md border border-red-900/60 px-3 py-1 text-xs text-red-400 hover:bg-red-950/40"
      onClick={(e) => {
        const message = confirmMessage ?? `Delete this item?`;
        if (!confirm(message)) e.preventDefault();
      }}
    >
      {label}
    </button>
  );
}
