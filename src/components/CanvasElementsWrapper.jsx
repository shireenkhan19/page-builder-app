import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export default function CanvasElementsWrapper({
  id,
  position,
  children,
  focused,
  fontStyles,
}) {
  const { setNodeRef, attributes, listeners, transform } = useDraggable({
    id: id,
    data: {
      itemType: id.split(':')[0],
      alreadyOnCanvas: true,
    },
  });

  let className = '';

  if (focused) {
    className = 'outline-2 outline-red-500 outline-offset-2 outline ';
  }

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        ...fontStyles,
        transform: CSS.Translate.toString(transform),
        top: position?.y,
        left: position?.x,
      }}
      className={`${className}absolute focus-within:outline-2 focus-within:outline-red-500 focus-within:outline-offset-2 focus-within:outline`}
    >
      {children}
    </li>
  );
}
