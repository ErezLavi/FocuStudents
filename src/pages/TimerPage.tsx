import TimerForm from "../components/timer/_timerForm/TimerForm";
import TimerLayout from "../components/layout/timerLayout/TimerLayout";
import DndList from "../components/timer/dndList/DndList";

const TimerPage = () => {
  return (
    <TimerLayout>
      <TimerForm  />
      <DndList />
    </TimerLayout>
  );
};

export default TimerPage;