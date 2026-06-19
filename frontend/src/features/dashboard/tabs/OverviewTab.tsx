import SummaryCard from '../components/SummaryCard';
import RecentTask from '../components/RecentTask';
import { motion } from 'framer-motion';
import { useGetTasks } from '@/hooks/task/useGetTasks';
import { useDashboardStore } from '@/store/dashboardStore';
import { getFilteredTasks } from '@/lib/utils';
import Loader from '../components/Loader';

export default function OverviewTab() {
  const { data: tasks = [], isLoading: isLoadingTasks, isError: isErrorTasks } = useGetTasks();

  const search = useDashboardStore((state) => state.search);
  const filter = useDashboardStore((state) => state.filter);
  const setFilter = useDashboardStore((state) => state.setFilter);

  const buttonFilters = ["all", "pending", "completed"] as const  
  const filteredTasks = getFilteredTasks(tasks, search, filter);

  const totalTasks = filteredTasks.length;

  const completedTasks = filteredTasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = filteredTasks.filter(
    (task) => !task.completed
  ).length;


  if(isLoadingTasks) {return <Loader />}
  if(isErrorTasks) return <div>Error</div>

  return (
   <>
    <section aria-label='Task summary' 
      className='
      grid
      grid-cols-1
      sm:grid-cols-1
      lg:grid-cols-3
      gap-4
      dark:bg-black dark:text-white p-2 rounded-lg
    '>
          <SummaryCard type={'total'} value={totalTasks} />
          <SummaryCard type={'pending'} value={pendingTasks} />
          <SummaryCard type={'completed'} value={completedTasks} />
      </section>
      <section aria-labelledby='task-heading' className='space-y-4 dark:bg-black dark:text-white p-2 rounded-lg'>
          <div className=''>
            <div className='flex items-center justify-between mb-6'>
              <header>
                <h1 id='task-heading' className='text-2xl font-bold tracking-tight mb-2'>Tasks</h1>
                <p className='text-sm text-muted-foreground'>
                    Manage, track your tasks
                </p>
              </header>
            <motion.nav
                layout
                aria-label="Task filters"
                className="flex items-center gap-2"
              >
                {buttonFilters.map((item) => {
                  const isActive = filter === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFilter(item)}
                      className="px-3 py-1 text-sm rounded-full relative"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeFilter"
                          className="absolute inset-0 rounded-full bg-gray-800 font-semibold"
                        />
                      )}
                      <span className={`relative z-10 capitalize ${isActive ? "text-white" : "text-muted-foreground"}`}>
                        {item}
                      </span>
                    </button>
                  );
                })}
              </motion.nav>
          </div>
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 mx-auto">
              <h3 className="font-semibold text-lg">No tasks found</h3>
              <p className="text-muted-foreground">
                Try adding one on Task tab.
              </p>
            </div>
          ) : (
            <RecentTask tasks={filteredTasks} />
          )}
        </div>
      </section>
    </>
  )
}
