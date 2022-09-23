import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { logout } from "../actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  function handleSignout() {
    dispatch(logout());
  }

  const menu = [
    {
      label: "Menu 1",
    },
    {
      label: "Menu 2",
    },
    {
      label: "Menu 3",
    },
  ];
  
  const items = [
    {
      label: "Home",
      command: () => navigate("/home"),
    },
    {
      label: "Products",
      command: () => navigate("/product"),
    },
    {
      label: "Menu",
      items: menu,
    },
  ];


  if (user.roles.includes("ROLE_ADMIN")) {
    items.push({
      label: "Admin",
      icon: "pi pi-fw pi-pencil",
      command: () => navigate("/admin"),
    });
  }
  const end = <Button label="Logout" onClick={handleSignout}></Button>;

  return (
    <div>
      <div className="card">
        <Menubar model={items} end={end} />
      </div>
    </div>
  );
};

export default Navigation;
