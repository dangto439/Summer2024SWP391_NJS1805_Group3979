import { Link } from "react-router-dom";
import "./index.scss";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
} from "react-icons/bs";

function AdminHeader() {
  return (
    <header className="header">
      <div className="header-right">
        <BsFillBellFill className="icon bell" />
        <BsFillEnvelopeFill className="icon Envelope" />
        <Link to={"/admin/profile"}>
          <BsPersonCircle className="icon" />
        </Link>
      </div>
    </header>
  );
}

export default AdminHeader;
