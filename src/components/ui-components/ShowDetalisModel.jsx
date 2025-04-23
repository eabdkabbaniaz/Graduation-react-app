import { Dialog, Transition } from '@headlessui/react';

import { Fragment } from 'react';
import Button from './Button';
const ShowDetalisModel = ({ isOpen, onClose, fields = [], title = "تفاصيل" }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-right align-middle shadow-xl transition-all">
              <Dialog.Title as="h3" className="text-lg font-medium text-center text-gray-900">
                {title}
              </Dialog.Title>

              <div className="mt-4 grid gap-3 text-right text-gray-700">
                {fields.map(({ label, value, isLtr }) => (
                  <div className="flex flex-row-reverse justify-between border-b pb-1">
                    <span className="font-bold">:{label}</span>
                    <span dir={isLtr ? 'ltr' : 'rtl'} className="inline-block">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  name="إغلاق"
                  signal="✖"
                  onClick={onClose}
                  className="bg-red-100 text-red-700 hover:bg-red-400 transition"
                />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ShowDetalisModel;
