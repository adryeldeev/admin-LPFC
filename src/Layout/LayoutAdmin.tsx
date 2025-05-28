import { Outlet } from "react-router-dom";
import { Main } from "./LayoutAdminStyled";
import NavbarAdmin from "../Components/NavbarAdmin";

export function LayoutAdmin() {
  return (
    <div>
      <NavbarAdmin />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}
