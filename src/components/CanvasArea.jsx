import { useRef, useState } from 'react';
import { useDroppable, useDndMonitor } from '@dnd-kit/core';
import { useEventListener, useLocalStorage } from 'usehooks-ts';
import DialogForm from './DialogForm';
import CanvasAreaElements from './CanvasAreaElements';

export default function CanvasArea({ className }) {
  const { setNodeRef } = useDroppable({
    id: 'canvas-area',
  });

  const documentRef = useRef(window.document);
  const [elements, setElements] = useLocalStorage('canvas-elements', []);
  const [formState, setFormState] = useState(null);

  useEventListener('click', formState ? () => {} : onClickAway, documentRef);
  useEventListener(
    'keyup',
    formState ? () => {} : onDeleteElement,
    documentRef,
  );
  useEventListener(
    'keypress',
    formState ? () => {} : onEditElement,
    documentRef,
  );
  useEventListener(
    'focus',
    formState ? () => {} : onClickAway,
    documentRef,
    true,
  );

  useDndMonitor({
    onDragEnd,
  });

  function onDragEnd(event) {
    if (
      event.over?.id === 'canvas-area' ||
      event.active?.data?.current?.alreadyOnCanvas
    ) {
      if (event.active?.data?.current?.alreadyOnCanvas) {
        onEditCanvasElement({
          id: event.active.id,
          type: event.active.data.current.itemType,
          blockType: event.active.data.current.blockType,
          formValues: {
            position: {
              x: event.active.rect.current.translated.left,
              y: event.active.rect.current.translated.top,
            },
          },
        });
      } else {
        onFormOpen({
          id: event.active.id,
          blockType: event.active.data.current.blockType,
          type: event.active.data.current.itemType,
          formValues: {
            position: {
              x: event.active.rect.current.translated.left,
              y: event.active.rect.current.translated.top,
            },
          },
        });
      }
    }
  }

  function onClickAway() {
    setElements(prevState => {
      return prevState.map(item => {
        return { ...item, focused: false };
      });
    });
  }

  function onDeleteElement(event) {
    if (event.key === 'Delete') {
      setElements(prevState => {
        return prevState.filter(item => !item.focused);
      });
    }
  }

  function onEditElement(event) {
    if (event.key === 'Enter' && !formState) {
      onFormOpen(elements.find(item => item.focused));
    }
  }

  function onFormOpen(values) {
    setFormState(values);
  }

  function onClose() {
    setFormState(null);
  }

  function onEditCanvasElement(values) {
    const { id, type, formValues, blockType } = values;

    setElements(prevState => {
      const item = prevState.find(item => item.id === id);

      if (item) {
        return prevState.map(item => {
          const activeId = id.split(':')[0] + ':' + new Date().toISOString();

          if (item.id === id) {
            return {
              ...item,
              id: activeId,
              formValues: {
                ...item.formValues,
                ...formValues,
              },
              focused: true,
            };
          }

          return { ...item, focused: false };
        });
      }

      const activeId = id.split(':')[0] + ':' + new Date().toISOString();

      return [
        ...prevState.map(item => {
          return { ...item, focused: false };
        }),
        {
          id: activeId,
          type,
          blockType,
          formValues,
          focused: true,
        },
      ];
    });
  }

  return (
    <main
      ref={setNodeRef}
      className={`${className} bg-canvas-color overflow-hidden relative`}
    >
      <DialogForm
        formState={formState}
        open={Boolean(formState)}
        onClose={onClose}
        onFormSubmit={onEditCanvasElement}
      />
      <CanvasAreaElements elements={elements} />
    </main>
  );
}
