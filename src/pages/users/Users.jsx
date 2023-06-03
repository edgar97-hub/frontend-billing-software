import Sidebar from "../../components/account/sidebar/Sidebar";
import UserTable from "./UserTable.js";

export default function Home() {
  return (
    <div class="wrapper">
      <Sidebar/>
      <UserTable/>
    </div>
  );
}
