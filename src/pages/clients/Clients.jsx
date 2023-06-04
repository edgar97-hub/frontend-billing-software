import Sidebar from "../../components/account/sidebar/Sidebar";
import UserTable from "./ClientsTable.js.jsx";

export default function Home() {
  return (
    <div className="wrapper">
      <Sidebar/>
      <UserTable/>
    </div>
  );
}
