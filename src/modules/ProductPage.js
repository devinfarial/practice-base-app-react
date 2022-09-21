import { useState } from "react"
import productService from "../services/product-service";
import PickList from "primereact";

export default function ProductPage(){
    const[products, setProducts] = useState([]);
    const [isUpdate, setIsUpdate] = useState({ id: null, status: false });
    const [formData, setFormData] = useState({
        name: "",
        quantity: "",
      });

      useEffect(() => {
        // fetch data dsini dan set contact
        productService.getAll().then(
            (response) => {
                setProducts(response.data);
            }
        )
      }, []);

      const itemTemplate = (item) => {
        return (
            <div className="product-item">
                <div className="image-container">
                    <img src={`images/product/${item.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.name} />
                </div>
                <div className="product-list-detail">
                    <h5 className="mb-2">{item.name}</h5>
                    <i className="pi pi-tag product-category-icon"></i>
                    <span className="product-category">{item.category}</span>
                </div>
                <div className="product-list-action">
                    <h6 className="mb-2">${item.price}</h6>
                    <span className={`product-badge status-${item.inventoryStatus.toLowerCase()}`}>{item.inventoryStatus}</span>
                </div>
            </div>
        );
    }

      return (
        <div className="picklist-demo">
            <div className="fixed-top bg-white pb-3 mx-auto" style={{ width: 400 }}>
        <h1 className="px-3 py-3 font-weight-bold">My Contact List</h1>
        <form onSubmit={handleSubmit} className="px-3 py-4">
          <div className="form-group">
            <label htmlFor="">Name</label>
            <input
              type="text"
              onChange={handleChange}
              className="form-control"
              value={formData.name}
              name="name"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="">No. Telp</label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.telp}
              className="form-control"
              name="telp"
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Save
            </button>
          </div>
        </form>
      </div>
            <div className="card">
                <PickList source={products} target={target} itemTemplate={itemTemplate} sourceHeader="Available" targetHeader="Selected"
                    sourceStyle={{ height: '342px' }} targetStyle={{ height: '342px' }} onChange={onChange}
                    filterBy="name" sourceFilterPlaceholder="Search by name" targetFilterPlaceholder="Search by name" />
            </div>
        </div>
    );


}