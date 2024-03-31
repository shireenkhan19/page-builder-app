import CanvasElementsWrapper from './CanvasElementsWrapper';

export default function CanvasAreaElements({ elements }) {
  const renderElements = [];

  for (const element of elements) {
    let renderElement = null;

    if (element.type === 'draggable-label') {
      renderElement = <p>{element.formValues?.text || 'Text'}</p>;
    } else if (element.type === 'draggable-input') {
      renderElement = (
        <input
          id={element.id}
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 pointer-events-none [font:inherit]"
          placeholder={element.formValues?.text || 'Type here'}
        />
      );
    } else if (element.type === 'draggable-button') {
      renderElement = (
        <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5 pointer-events-none [font:inherit]">
          {element.formValues?.text || 'Button'}
        </button>
      );
    }

    const fontStyles = {
      fontSize: element.formValues?.fontSize,
      fontWeight: element.formValues?.fontWeight,
    };

    renderElements.push(
      <CanvasElementsWrapper
        key={element.id}
        id={element.id}
        fontStyles={fontStyles}
        position={element.formValues?.position}
        focused={element.focused}
      >
        {renderElement}
      </CanvasElementsWrapper>,
    );
  }

  return (
    <ul role="list" className="list-none w-full h-full">
      {renderElements}
    </ul>
  );
}
