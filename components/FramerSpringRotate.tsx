import { motion } from "framer-motion";
import { ReactNode } from "react";
interface FramerSpringRotateProps {
  children: ReactNode;
  className?: string;
}

const FramerSpringRotate = ({
  children,
  className,
}: FramerSpringRotateProps) => {
  return (
    <motion.div
      className={`w-full ${className}`}
      initial={{ scale: 0 }}
      animate={{ rotate: 360, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FramerSpringRotate;
