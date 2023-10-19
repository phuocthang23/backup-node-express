import ChartCOmpoent from "./Chart";
import { CardTop } from "./CardTop";
import BestSeller from "./BestSeller";
import Discount from "./Discount";
const DashBoardPage = () => {
  return (
    <div className="">
      <div className="flex flex-grow gap-7 pb-7">
        <CardTop />
      </div>
      <div className="border-solid border border-1  rounded-3xl">
        <div className=" m-4">
          <ChartCOmpoent />
        </div>
      </div>
      <div className="flex gap-5 mt-8">
        <div className="w-3/5">
          <BestSeller />
        </div>
        <div className="w-2/5">
          <Discount />
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
