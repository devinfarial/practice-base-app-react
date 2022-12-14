import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import productService from "../services/product-service";
import { OrderList } from "primereact/orderlist";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [formCreate, setFormCreate] = useState({
    foodName: "",
    quantity: "",
  });
  const [formUpdate, setFormUpdate] = useState({
    id: "",
    foodName: "",
    quantity: "",
  });

  useEffect(() => {
    productService.getAll().then((response) => {
      setProducts(response.data);
    });
  }, []);

  function handleEdit(id) {
    // cari data di state
    // isi data ke state form
    let data = [...products];
    let foundData = data.find((product) => product.id === id);
    setFormUpdate({
      id: id,
      foodName: foundData.foodName,
      quantity: foundData.quantity,
    });
  }

  function handleCreate(e) {
    e.preventDefault();
    productService.createProduct(formCreate).then(() => {
      productService.getAll().then((response) => {
        setProducts(response.data);
      });
    });
  }

  function handleUpdate(e) {
    e.preventDefault();
    productService.updateProduct(formUpdate).then(() => {
      productService.getAll().then((response) => {
        setProducts(response.data);
      });
    });
  }

  function handleDelete(e) {
    e.preventDefault();
    productService.deleteProduct(formUpdate).then(() => {
      productService.getAll().then((response) => {
        setProducts(response.data);
      });
    });
  }

  const itemTemplate = (item) => {
    return (
      <div className="product-item" onClick={() => handleEdit(item.id)}>
        <div className="product-list-detail">
          <h5 className="mb-2">{item.foodName}</h5>
        </div>
        <div className="product-list-action">
          <h6 className="mb-2">Qty: {item.quantity}</h6>
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
          <h1>Create Product</h1>
          <span className="p-float-label">
            <InputText
              className="w-full mb-3"
              style={{ "margin-bottom": "8px" }}
              onChange={(e) =>
                setFormCreate((oldState) => ({
                  ...oldState,
                  foodName: e.target.value,
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
                quantity: e.target.value,
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
            value={formUpdate.foodName}
            onChange={(e) =>
              setFormUpdate((previousState) => {
                return { ...previousState, foodName: e.target.value };
              })
            }
          />
          <InputText
            className="w-full mb-3"
            style={{ "margin-bottom": "8px" }}
            value={formUpdate.quantity}
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
          value={products}
          header="List of Products"
          dragdrop
          listStyle={{ height: "auto" }}
          dataKey="id"
          itemTemplate={itemTemplate}
        ></OrderList>
      </div>
    </div>
  );
};

export default ProductPage;
