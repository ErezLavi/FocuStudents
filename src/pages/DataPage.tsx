import TimerLayout from "../components/layout/timerLayout/TimerLayout";
import Goal from "../components/data/Goal";
import DataChart from "../components/data/DataChart";

const DataPage = () => {
  return (
    <TimerLayout>
      <Goal />
      <DataChart/>
    </TimerLayout>
  );
};

export default DataPage;
