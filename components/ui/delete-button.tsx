'use client';

interface DeleteButtonProps {
  action: string;
  itemName?: string;
}

export default function DeleteButton({ action, itemName = 'this item' }: DeleteButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!confirm(`Are you sure you want to delete ${itemName}?`)) {
      e.preventDefault();
    }
  };

  return (
    <form action={action} method="POST" className="inline">
      <button
        type="submit"
        onClick={handleClick}
        className="text-red-600 hover:text-red-900"
      >
        Delete
      </button>
    </form>
  );
} 