import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Button from './Button';

const CreateAcountModalDynmic = ({
    isOpen,
    onClose,
    handleSubmit,
    isSubmitting,
    error,
    successMessage,
    modalTitle,
    formFields,
    submitButtonText,
    submitButtonVariant,
    size
}) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" dir="ltr" onClose={onClose}>
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50" aria-hidden="true" />

                <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className={`w-full ${size} ${size ? "" : "overflow-hidden"} max-w-md transform rounded-2xl bg-white dark:bg-gray-900 p-6 align-middle shadow-xl transition-all`}>
                            <Dialog.Title className="text-lg font-bold text-gray-900 dark:text-gray-100 text-center mb-4">
                                {modalTitle}
                            </Dialog.Title>

                            {error && <p className="text-red-500 text-center">{error}</p>}
                            {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

                            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                                {formFields.map((field, index) => (
                                    <div key={index}>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                            {field.label}
                                        </label>

                                        {field.type === "select" ? (
                                            <select
                                                value={field.value}
                                                onChange={field.onChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                                                required={field.required || false}
                                            >
                                                {field.options.map((option, i) => (
                                                    <option key={i} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : field.type === "textarea" ? (
                                            <textarea
                                                value={field.value}
                                                onChange={field.onChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                                                required={field.required || false}
                                                rows={field.rows || 4}
                                                placeholder={field.placeholder || ""}
                                            />
                                        ) :
                                        field.type === "checkbox-group" ? (
                                            <div className="mt-2">
                                              <p className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                                                {field.label}
                                              </p>
                                              <div className="flex flex-col gap-2">
                                                {field.options.map((option, i) => (
                                                  <label key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                                                    <input
                                                      type="checkbox"
                                                      value={option.value}
                                                      checked={field.value.includes(option.value)}
                                                      onChange={() => field.onChange(option.value)}
                                                      className="text-blue-600"
                                                    />
                                                    {option.label}
                                                  </label>
                                                ))}
                                              </div>
                                            </div>
                                          )  
                                        :(
                                            <input
                                                type={field.type || "text"}
                                                value={field.value}
                                                onChange={field.onChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                                                required={field.required || false}
                                                placeholder={field.placeholder || ""}
                                                {...field}
                                            />
                                        )}
                                    </div>
                                ))}

                                <div className="flex justify-center gap-4 pt-2">
                                    <Button
                                        type="submit"
                                        name={submitButtonText || (isSubmitting ? "جاري الإضافة..." : "إضافة")}
                                        variant={submitButtonVariant || "primary"}
                                        size="normal"
                                        disabled={isSubmitting}
                                    />
                                    <Button
                                        type="button"
                                        name="cancel"
                                        variant="danger"
                                        size="normal"
                                        onClick={onClose}
                                    />
                                </div>
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CreateAcountModalDynmic;
