import { motion } from 'framer-motion';
import BudgetDistributionWidget from './widgets/BudgetDistributionWidget';
import ClientesGrafica from './widgets/ClientesGrafica';
import Prendas from './widgets/Prendas';

function BudgetTab() {
  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const sameHeightVariants = {
    hidden: { height: '100%' },
    show: { height: '100%' },
  };

  return (
    <motion.div
      className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-24 w-full min-w-0 p-24"
      variants={container}
      initial="hidden"
      animate="show"
      style={{
        gridTemplateRows: 'auto', // Set the rows to adjust automatically
        alignItems: 'stretch', // Stretch items vertically to match height
      }}
    >
      <motion.div variants={item} className="sm:col-span-6 md:col-span-8">
        <motion.div variants={sameHeightVariants}>
          <BudgetDistributionWidget />
        </motion.div>
      </motion.div>

      <motion.div variants={item} className="col-span-3 sm:col-span-2 md:col-span-4">
        <motion.div variants={sameHeightVariants}>
          <Prendas />
        </motion.div>
      </motion.div>

      <motion.div variants={item} className="sm:col-span-6 md:col-span-8">
        <motion.div variants={sameHeightVariants}>
          <ClientesGrafica />
        </motion.div>
      </motion.div>
      {/* Other elements... */}
    </motion.div>
  );
}

export default BudgetTab;
