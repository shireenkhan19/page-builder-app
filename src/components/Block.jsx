import { DragOverlay, useDraggable } from '@dnd-kit/core';
import BlockElement from './BlockElement.jsx';

export default function Block({ id, label }) {
  const { attributes, listeners, setNodeRef, active } = useDraggable({
    id: id,
    data: {
      itemType: id.split(':')[0],
      blockType: label,
    },
  });

  let activeItem = false;
  if (active !== null && active.id === id) {
    activeItem = true;
  }

  return (
    <>
      <BlockElement
        label={label}
        ref={setNodeRef}
        listeners={listeners}
        attributes={attributes}
      />

      <DragOverlay>
        {activeItem ? <BlockElement label={label} /> : null}
      </DragOverlay>
    </>
  );
}
