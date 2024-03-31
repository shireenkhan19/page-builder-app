import Block from './Block.jsx';
import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import { useState } from 'react';

export default function BlocksPallete({ className }) {
  const { setNodeRef } = useDroppable({
    id: 'blocks-pallete',
  });

  const [blocksConfigurations, setBlocksConfigurations] = useState([
    {
      id: 'draggable-label:' + Date.now(),
      label: 'Label',
      key: Date.now() + 1,
    },
    {
      id: 'draggable-input:' + Date.now(),
      label: 'Input',
      key: Date.now() + 2,
    },
    {
      id: 'draggable-button:' + Date.now(),
      label: 'Button',
      key: Date.now() + 3,
    },
  ]);

  useDndMonitor({
    onDragEnd(e) {
      const activeId = e.active.id;
      setBlocksConfigurations(prevState => {
        return prevState.map(item => {
          if (item.id === activeId) {
            const itemIdName = item.id.split(':')[0];
            return {
              ...item,
              id: itemIdName + ':' + Date.now(),
              key: Date.now(),
            };
          }
          return item;
        });
      });
    },
  });

  return (
    <>
      <aside
        ref={setNodeRef}
        className={`${className} h-screen p-6 bg-dark-color text-stone-50`}
      >
        <h2 className="mb-6 font-bold uppercase md:text-xl text-white">
          BLOCKS
        </h2>
        <ul role="list" className=" flex flex-col gap-2.5 list-none">
          {blocksConfigurations.map(item => {
            return (
              <li key={item.key}>
                <Block id={item.id} label={item.label} />
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
