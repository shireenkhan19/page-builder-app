import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  pointerWithin,
} from '@dnd-kit/core';
import {
  restrictToParentElement,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';

import './App.css';
import BlocksPallete from './components/BlocksPallete.jsx';
import CanvasArea from './components/CanvasArea.jsx';

const restrictions = ref => {
  const { active } = ref;

  if (active?.data?.current?.alreadyOnCanvas) {
    return restrictToParentElement(ref);
  }

  return restrictToWindowEdges(ref);
};

function App() {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);

  const sensors = useSensors(mouseSensor, touchSensor);
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      modifiers={[restrictions]}
    >
      <div className="flex">
        <CanvasArea className="grow" />
        <BlocksPallete className="basis-80" />
      </div>
    </DndContext>
  );
}

export default App;
