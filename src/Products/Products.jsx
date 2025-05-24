import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";

import { Dialog } from "primereact/dialog";
import ViewProducts from "./ViewProducts";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showViewMode, setShowViewMode] = useState(false);
  const [selectProductId, setSelectProductId] = useState(null);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "https://mock-data-josw.onrender.com/products"
      );
      if (!response.ok) {
        console.log("something went wrong");
      }
      setProducts(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const actionTemplate = (rowDate) => {
    return (
      <div className="flex items-center gap-4">
        <button
          className="cursor-pointer hover:scale-120"
          onClick={() => {
            setSelectProductId(rowDate.id);
            setShowViewMode(true);
          }}
        >
          <i className="pi pi-eye h-4 w-4"></i>
        </button>
        <button
          className="cursor-pointer hover:scale-120"
          onClick={() => console.log(rowDate.id)}
        >
          <i className="pi pi-file-edit h-4 w-4"></i>
        </button>
        <button
          className="cursor-pointer hover:scale-120"
          onClick={() => console.log(rowDate.id)}
        >
          <i className="pi pi-trash h-4 w-4"></i>
        </button>
      </div>
    );
  };

  return (
    <div className="py-15 px-24 flex flex-col gap-5 h-screen">
      <h2 className="text-3xl font-bold">All Products</h2>
      <div className="bg-[#fff] p-[20px] shadow-xl rounded-xl">
        <DataTable
          value={products}
          paginator
          rows={10}
          dataKey="id"
          // filters={filters}
          filterDisplay="row"
          globalFilterFields={[
            "name",
            "country.name",
            "representative.name",
            "status",
          ]}
          // header={header}
          emptyMessage="No customers found."
        >
          <Column
            field="name"
            header="Name"
            filter
            showFilterMenu={false}
            filterPlaceholder="Search by name"
            style={{ minWidth: "12rem" }}
          />
          <Column
            header="Price"
            field="price"
            style={{ minWidth: "12rem" }}
            //   body={}

            filterPlaceholder="Search by country"
          />
          <Column
            header="Category"
            field="category"
            filterField="category"
            showFilterMenu={true}
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "14rem" }}
            //   body={representativeBodyTemplate}
            filter
            //   filterElement={representativeRowFilterTemplate}
          />
          <Column
            field="rating"
            header="Rating"
            showFilterMenu={false}
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "12rem" }}
            //   body={statusBodyTemplate}
            //   filterElement={statusRowFilterTemplate}
          />
          <Column
            header="Actions"
            style={{ minWidth: "6rem" }}
            body={actionTemplate}
            //   filterElement={verifiedRowFilterTemplate}
          />
        </DataTable>
      </div>
      <Dialog
        header="View Product"
        visible={showViewMode}
        style={{ width: "40vw" }}
        onHide={() => setShowViewMode(false)}
      >
        <ViewProducts productId={selectProductId} />
      </Dialog>
    </div>
  );
}
