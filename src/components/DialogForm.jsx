import { Dialog } from "@headlessui/react";

export default function DialogForm({
  formState = {},
  open,
  onClose,
  onFormSubmit,
}) {
  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const updatedFormState = {
      ...formState,
      formValues: {
        text: data.text,
        fontSize: Number(data.fontSize),
        fontWeight: Number(data.fontWeight),
        position: {
          x: Number(data["position.x"]),
          y: Number(data["position.y"]),
        },
      },
    };

    onFormSubmit(updatedFormState);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <div className="relative p-2 w-full max-w-xl max-h-full">
          <Dialog.Panel className="relative bg-white rounded-md shadow">
            <Dialog.Title
              as="div"
              className="flex items-center justify-between p-3 md:px-5 border-b rounded-t"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                Edit {formState?.blockType || "Label"}
              </h2>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-toggle="crud-modal"
                onClick={onClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </Dialog.Title>

            <form
              className="p-3 md:px-5"
              onSubmit={onSubmit}
              key={formState?.id || ""}
            >
              <div className="grid gap-2 mb-4 grid-cols-1">
                <div className="col-span-1">
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Text
                  </label>
                  <input
                    type="text"
                    name="text"
                    id="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder={`Type the ${(
                      formState?.blockType || "Label"
                    ).toLowerCase()} here`}
                    defaultValue={formState?.formValues?.text || ""}
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="position.x"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    X
                  </label>
                  <input
                    type="number"
                    name="position.x"
                    id="position.x"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type the X-axis position here"
                    defaultValue={formState?.formValues?.position?.x || ""}
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="position.y"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Y
                  </label>
                  <input
                    type="number"
                    name="position.y"
                    id="position.y"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type the X-axis position here"
                    defaultValue={formState?.formValues?.position?.y || ""}
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="fontSize"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Font Size
                  </label>
                  <input
                    type="number"
                    name="fontSize"
                    id="fontSize"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type the X-axis position here"
                    defaultValue={formState?.formValues?.fontSize || 16}
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="fontWeight"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Font Weight
                  </label>
                  <select
                    id="fontWeight"
                    name="fontWeight"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 pr-10"
                    defaultValue={formState?.formValues?.fontWeight || "400"}
                    required
                  >
                    <option disabled hidden>
                      Select Font Weight
                    </option>
                    <option value="200">Extra Light</option>
                    <option value="300">Light</option>
                    <option value="400">Regular</option>
                    <option value="700">Bold</option>
                    <option value="800">Extra Bold</option>
                  </select>
                </div>
              </div>

              <button className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center gap-1">
                <svg
                  className="me-1 -ms-1 w-4 h-4"
                  fill="currentColor"
                  clipRule="evenodd"
                  fillRule="evenodd"
                  strokeLinejoin="round"
                  strokeMiterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z"
                    fillRule="nonzero"
                  />
                </svg>
                Save Changes
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
