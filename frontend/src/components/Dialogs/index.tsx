import { FC, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useDialog, { AppDialogs } from '../../stores/dialog';

interface ModalProps {
  dialog: AppDialogs;
  title: string;
  description?: string;
  children?: ReactNode;
}

const Modal: FC<ModalProps> = ({ dialog, title, description, children }) => {
  const { curDialog, closeDialog } = useDialog();

  return (
    <AnimatePresence>
      {curDialog === dialog && (
        <div className="relative z-50">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(1px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{
              opacity: { duration: 0.3, ease: 'easeInOut' },
              backdropFilter: { duration: 0.4, ease: 'easeInOut' },
            }}
            onClick={closeDialog}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <motion.div
              className="w-full max-w-lg space-y-4 rounded-xl border bg-white p-6 md:p-8 shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
                scale: { type: 'spring', stiffness: 300, damping: 25 },
              }}
            >
              <div className="space-y-4">
                <h2 className="text-xl font-bold">{title}</h2>
                {description && <p className="text-gray-600">{description}</p>}
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
