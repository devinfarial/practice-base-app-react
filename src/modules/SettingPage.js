import React, { useState, useEffect } from "react";
import userService from "../services/user-service";
import { OrderList } from "primereact/orderlist";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const SettingPage = () => {
  const [users, setUsers] = useState([]);
  const [formUpdate, setFormUpdate] = useState({
    id: "",
    username: "",
    email: "",
  });
  const [formCreate, setFormCreate] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    userService.getAll().then((response) => {
      setUsers(response.data);
    });
  }, []);

  function handleEdit(id) {
    // cari data di state
    // isi data ke state form
    let data = [...users];
    let foundData = data.find((user) => user.id === id);
    setFormUpdate({
      id: id,
      username: foundData.username,
      email: foundData.email,
    });
  }

  function handleUpdate(e) {
    e.preventDefault();
    userService.updateUser(formUpdate).then(() => {
      userService.getAll().then((response) => {
        setUsers(response.data);
      });
    });
  }

  function handleCreate(e) {
    e.preventDefault();
    userService.createUser(formCreate).then(() => {
      userService.getAll().then((response) => {
        setUsers(response.data);
      });
    });
  }

  function handleDelete(e) {
    e.preventDefault();
    userService.deleteUser(formUpdate.id).then(() => {
      userService.getAll().then((response) => {
        setUsers(response.data);
      });
    });
  }

  const itemTemplate = (item) => {
    return (
      <div className="product-item" onClick={() => handleEdit(item.id)}>
        <div className="product-list-detail">
          <h5 className="mb-2">Username: {item.username}</h5>
        </div>
        <div className="product-list-action">
          <h6 className="mb-2">Email: {item.email}</h6>
        </div>
      </div>
    );
  };

  return (
    <div className="orderlist">
      <div className="card mr-12 ml-12 px-64">
        <form
          onSubmit={handleCreate}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4"
        >
          <h1>Create User</h1>
          <span className="p-float-label">
            <InputText
              className="w-full mb-3"
              style={{ "margin-bottom": "8px" }}
              onChange={(e) =>
                setFormCreate((oldState) => ({
                  ...oldState,
                  username: e.target.value,
                }))
              }
            />
          </span>
          <InputText
            className="w-full mb-3"
            style={{ "margin-bottom": "8px" }}
            onChange={(e) =>
              setFormCreate((oldState) => ({
                ...oldState,
                email: e.target.value,
              }))
            }
          />
          <InputText
            password
            className="w-full mb-3"
            style={{ "margin-bottom": "8px" }}
            onChange={(e) =>
              setFormCreate((oldState) => ({
                ...oldState,
                password: e.target.value,
              }))
            }
          />
          <Button label="Create" className="w-full" />
        </form>
        <form
          onSubmit={handleUpdate}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1>Update Data</h1>
          <InputText
            className="w-full mb-3"
            value={formUpdate.id}
            style={{ "margin-bottom": "8px" }}
          />
          <InputText
            className="w-full mb-3"
            style={{ "margin-bottom": "8px" }}
            value={formUpdate.username}
            onChange={(e) =>
              setFormUpdate((previousState) => {
                return { ...previousState, username: e.target.value };
              })
            }
          />
          <InputText
            className="w-full mb-3"
            style={{ "margin-bottom": "8px" }}
            value={formUpdate.email}
            onChange={(e) =>
              setFormUpdate((previousState) => {
                return { ...previousState, quantity: e.target.value };
              })
            }
          />
          <Button
            label="Update"
            className="w-full"
            style={{ "margin-bottom": "8px" }}
          />
          <Button
            label="Delete"
              onClick={handleDelete}
            style={{ "margin-bottom": "8px" }}
            className="w-full"
          />
        </form>
      </div>
      <div className="card mr-12 ml-12">
        <OrderList
          value={users}
          header="List of Users"
          dragdrop
          listStyle={{ height: "auto" }}
          dataKey="id"
          itemTemplate={itemTemplate}
        ></OrderList>
      </div>
    </div>
  );
};

export default SettingPage;
