import { motion } from "framer-motion";
import { ArrowUpCircle } from "lucide-react";
interface MotionArrowProps {
  isOpen: boolean;
}

const MotionArrow = ({ isOpen }: MotionArrowProps) => {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: isOpen ? -180 : 0 }}
      transition={{ duration: 1 }}
    >
      <ArrowUpCircle className="w-5" />
    </motion.div>
  );
};

export default MotionArrow;
