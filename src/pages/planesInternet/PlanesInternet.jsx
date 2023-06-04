import Sidebar from "../../components/account/sidebar/Sidebar";
import PlanesInternetTable from "./PlanesInternetTable";

export default function Home() {
  return (
    <div className="wrapper">
      <Sidebar/>
      <PlanesInternetTable/>
    </div>
  );
}
