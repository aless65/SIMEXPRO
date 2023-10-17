import { motion } from 'framer-motion';
import MonthlyExpensesWidget from '../budget/widgets/MonthlyExpensesWidget';
import WeeklyExpensesWidget from '../budget/widgets/WeeklyExpensesWidget';
import YearlyExpensesWidget from '../budget/widgets/YearlyExpensesWidget';
import FeaturesWidget from './widgets/FeaturesWidget';
import GithubIssuesWidget from './widgets/GithubIssuesWidget';
import IssuesWidget from './widgets/IssuesWidget';
import OverdueWidget from './widgets/OverdueWidget';

function HomeTab() {
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

  return (
    <motion.div
      className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-24 w-full min-w-0 p-24"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} className="col-span-3 sm:col-span-2 md:col-span-4">
        <OverdueWidget />
      </motion.div>
      <motion.div variants={item} className="col-span-3 sm:col-span-2 md:col-span-4">
        <IssuesWidget />
      </motion.div>
      <motion.div variants={item} className="col-span-3 sm:col-span-2 md:col-span-4">
        <FeaturesWidget />
      </motion.div>
      <motion.div variants={item} className="sm:col-span-6 md:col-span-8">
        <GithubIssuesWidget />
      </motion.div>

      <div className="sm:col-span-6 lg:col-span-4 grid grid-cols-1 gap-y-24">
        <motion.div variants={item} className="sm:col-span-2 md:col-span-4">
          <WeeklyExpensesWidget />
        </motion.div>
        <motion.div variants={item} className="sm:col-span-2 md:col-span-4">
          <MonthlyExpensesWidget />
        </motion.div>
        <motion.div variants={item} className="sm:col-span-2 md:col-span-4">
          <YearlyExpensesWidget />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default HomeTab;
