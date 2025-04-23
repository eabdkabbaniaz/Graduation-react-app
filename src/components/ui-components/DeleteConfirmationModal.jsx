import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Button from './Button';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, studentName }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>


        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4">

          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-right align-middle shadow-xl transition-all">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900 text-center"
            >
              تأكيد الحذف
            </Dialog.Title>
            <div className="mt-2 text-center text-gray-600">
              هل أنت متأكد أنك تريد حذف{" "}
              <span className="font-bold text-red-600">{studentName}</span>؟ لا يمكنك التراجع عن هذا الإجراء.
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <Button
                name="إلغاء"
                signal="❌"
                onClick={onClose}
                variant="secondary"
                iconPosition="start"
              />
              <Button
                name="حذف"
                signal="🗑️"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                variant="danger"
                iconPosition="start"
              />
            </div>
          </Dialog.Panel>

        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteConfirmationModal;
