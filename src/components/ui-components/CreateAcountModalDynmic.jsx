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
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6  align-middle shadow-xl transition-all">
                            <Dialog.Title className="text-lg font-bold text-gray-900 text-center mb-4">
                                {modalTitle}
                            </Dialog.Title>

                            {error && <p className="text-red-500 text-center">{error}</p>}
                            {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

                            <form onSubmit={handleSubmit} className="space-y-4 mt-4">

                                {formFields.map((field, index) => (
                                    <div key={index}>
                                        <label className="block text-sm font-medium text-gray-700">{field.label}</label>

                                        {field.type === "select" ? (
                                            <select
                                                value={field.value}
                                                onChange={field.onChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
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
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                                required={field.required || false}
                                                rows={field.rows || 4}
                                                placeholder={field.placeholder || ""}
                                            />
                                        ) : (
                                            <input
                                                type={field.type || "text"}
                                                value={field.value}
                                                onChange={field.onChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                                required={field.required || false}
                                                placeholder={field.placeholder || ""}
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


