import { forwardRef } from 'react';

export default forwardRef(function BlockElement(
  { label, listeners, attributes },
  ref,
) {
  return (
    <button
      ref={ref}
      {...listeners}
      {...attributes}
      className="flex w-full items-center gap-2.5 px-4 py-2 text-xs md:text-base rounded-md bg-white text-stone-700 hover:bg-stone-500 hover:text-stone-50"
    >
      <svg width="16px" height="16px" viewBox="-3 0 20 20" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 2.5C0 1.11929 1.11929 0 2.5 0C3.88071 0 5 1.11929 5 2.5C5 3.88071 3.88071 5 2.5 5C1.11929 5 0 3.88071 0 2.5zM0 17.5C0 16.1193 1.11929 15 2.5 15C3.88071 15 5 16.1193 5 17.5C5 18.8807 3.88071 20 2.5 20C1.11929 20 0 18.8807 0 17.5zM0 10C0 8.6193 1.11929 7.5 2.5 7.5C3.88071 7.5 5 8.6193 5 10C5 11.3807 3.88071 12.5 2.5 12.5C1.11929 12.5 0 11.3807 0 10zM9 2.5C9 1.11929 10.1193 0 11.5 0C12.8807 0 14 1.11929 14 2.5C14 3.88071 12.8807 5 11.5 5C10.1193 5 9 3.88071 9 2.5zM9 17.5C9 16.1193 10.1193 15 11.5 15C12.8807 15 14 16.1193 14 17.5C14 18.8807 12.8807 20 11.5 20C10.1193 20 9 18.8807 9 17.5zM9 10C9 8.6193 10.1193 7.5 11.5 7.5C12.8807 7.5 14 8.6193 14 10C14 11.3807 12.8807 12.5 11.5 12.5C10.1193 12.5 9 11.3807 9 10z"
          fill="currentColor"
        />
      </svg>
      {label}
    </button>
  );
});
