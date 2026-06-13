import { motion, AnimatePresence } from "framer-motion"


type TaskDrawerProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}
export default function TaskDrawer({ open, onClose, children }: TaskDrawerProps) {

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop */}
          <motion.div
            className="fixed h-screen inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* panel */}
          <motion.aside
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white z-50 shadow-xl p-6"
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}