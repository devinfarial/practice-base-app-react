import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { logout } from "../actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import menuService from "../services/menu-service";
import { Dialog } from "primereact/dialog";
import { OrderList } from "primereact/orderlist";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [menu, setMenu] = useState([]);
  const [listMenu, setListMenu] = useState([]);
  const [dialogCreate, setDialogCreate] = useState(false);
  const [dialogUpdate, setDialogUpdate] = useState(false);
  const [formCreateMenu, setFormCreateMenu] = useState({
    menuName: ""
  });
  const [formUpdateMenu, setFormUpdateMenu] = useState({
    id: "",
    menuName: ""
  });

  function handleSignout() {
    dispatch(logout());
  }

  function handleCreateMenu() {
    menuService.createMenu(formCreateMenu).then(
      setDialogCreate(false)
    )
  }

  function handleUpdateMenu() {
    menuService.updateMenu(formUpdateMenu).then(
      setDialogUpdate(false)
    )
  }

  function handleDeleteMenu() {
    menuService.deleteMenu(formUpdateMenu).then(
      setDialogUpdate(false)
    )
  }

  function handleEdit(id) {
    // cari data di state
    // isi data ke state form
    let data = [...menu];
    let foundData = data.find((menu) => menu.id === id);
    setFormUpdateMenu({
      id: id,
      menuName: foundData.label,
    });
  }

  useEffect(() => {
    menuService.getAll().then((response) => {
      setMenu(response.data);
      setListMenu(response.data);
      if (user.roles.includes("ROLE_ADMIN")) {
        items.push({
          label: "Admin",
          icon: "pi pi-fw pi-pencil",
          command: () => navigate("/admin"),
        });
        setMenu((oldState) => [
          ...oldState, { separator: true }, { label: "Update Item", command: () => setDialogUpdate(true) }, { label: "Add Item", command: () => setDialogCreate(true) }
        ]);
      }
    });

  }, [dialogCreate, dialogUpdate]);

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


  const footerDialog = () => {
    return (
      <div>
        <Button label="No" icon="pi pi-times" onClick={() => setDialogCreate(false)} className="p-button-text" />
        <Button label="Yes" icon="pi pi-check" onClick={() => handleCreateMenu()} autoFocus />
      </div>
    );
  }
  const end = <Button label="Logout" onClick={handleSignout}></Button>;

  const itemTemplate = (item) => {
    return (
      <div className="product-item" onClick={() => handleEdit(item.id)}>
        <div className="product-list-detail">
          <h5 className="mb-2">{item.label}</h5>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Dialog header="Add new menu " visible={dialogCreate} onHide={() => setDialogCreate(false)} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }} footer={footerDialog}>
        <span className="p-float-label">
          <InputText
            className="w-full mb-3"
            onChange={(e) =>
              setFormCreateMenu((oldState) => ({
                ...oldState,
                menuName: e.target.value,
              }))
            }
          />
        </span>
      </Dialog>
      <Dialog header="Update menu " visible={dialogUpdate} onHide={() => setDialogUpdate(false)} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }}>
        <span className="p-float-label">
          <div className="card ">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4" >
              <InputText
              value={formUpdateMenu.menuName}
                className="w-full mb-3"
                style={{ "margin-bottom": "8px" }}
                onChange={(e) =>
                  setFormUpdateMenu((oldState) => ({
                    ...oldState,
                    menuName: e.target.value,
                  }))
                }
              />
              <Button label="Update" className="w-full" onClick={handleUpdateMenu}/>
              <Button label="Delete" className="mt-3 w-full" onClick={handleDeleteMenu}/>
            </div>
          </div>
          <OrderList
            value={listMenu}
            header="List of Menus"
            dragdrop
            listStyle={{ height: "auto" }}
            dataKey="id"
            itemTemplate={itemTemplate}
          ></OrderList>
        </span>
      </Dialog>
      <div className="card">
        <Menubar model={items} end={end} />
      </div>
    </div>
  );
};

export default Navigation;
