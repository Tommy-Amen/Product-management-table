import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import axios from "axios";

import { Dialog } from "primereact/dialog";
import ViewProducts from "./ViewProducts";
import AddProducts from "./AddProduct";
import EditProducts from "./EditProduct";

import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showViewMode, setShowViewMode] = useState(false);
  const [showAddMode, setShowAddMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditMode, setShowEditMode] = useState(false);
  const [selectProductId, setSelectProductId] = useState(null);

  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://mock-data-josw.onrender.com/products"
      );
      if (!response.ok) {
        console.log("something went wrong");
      }

      setProducts(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const actionTemplate = (rowDate) => {
    return (
      <div className="flex items-center gap-4">
        <button
          className="cursor-pointer hover:scale-120 transition-all duration-200"
          onClick={() => {
            setSelectProductId(rowDate.id);
            setShowViewMode(true);
          }}
        >
          <i className="pi pi-eye h-4 w-4"></i>
        </button>
        <button
          className="cursor-pointer hover:scale-120 transition-all duration-200"
          onClick={() => {
            setSelectProductId(rowDate.id);
            setShowEditMode(true);
          }}
        >
          <i className="pi pi-file-edit h-4 w-4"></i>
        </button>
        <button
          className="cursor-pointer hover:scale-120 transition-all duration-200"
          onClick={() => deleteProductConfirm(rowDate.id)}
        >
          <i className="pi pi-trash h-4 w-4"></i>
        </button>
      </div>
    );
  };

  const deleteProductConfirm = (productId) => {
    confirmDialog({
      trigger: productId.currentTarget,
      message: "Are you sure you want to delete product?",
      header: "Confirmation",
      icon: "pi pi-trash",
      accept: () => {
        deleteUser(productId);
        setTimeout(() => {
          toast.success("Product Deleted", {
            style: {
              border: "1px solid #000",
              padding: "14px",
              color: "#000",
            },
            iconTheme: {
              primary: "#000",
              secondary: "#FFFAEE",
            },
          });
        }, 1500);
      },
      // reject: () => rejectFunc(),
    });
  };

  const deleteUser = async (productId) => {
    try {
      const response = await axios.delete(
        "https://mock-data-josw.onrender.com/products/" + productId
      );
      const products = await axios.get(
        "https://mock-data-josw.onrender.com/products"
      );
      if (response) {
        setProducts(products.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="py-10 px-24 flex flex-col gap-4 h-screen">
      <h2 className="text-3xl font-bold">All Products</h2>
      <div className="bg-[#fff] p-[20px] shadow-xl rounded-xl">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-y-3 border-black" />
          </div>
        ) : (
          <div>
            <div className="mb-4 text-right pt-3">
              <button
                onClick={() => {
                  setShowAddMode(true);
                }}
                className="bg-black hover:bg-black/85 transition-all duration-300 cursor-pointer shadow text-white text-sm px-3 py-2 rounded"
              >
                Add New Product <i className="pi pi-plus ml-2 "></i>
              </button>
            </div>

            <DataTable
              removableSort
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
                sortable
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
                showFilterMenu={false}
                filterMenuStyle={{ width: "12rem" }}
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
        )}
      </div>
      <Dialog
        header="View Product"
        visible={showViewMode}
        style={{ width: "40vw" }}
        onHide={() => setShowViewMode(false)}
      >
        <ViewProducts productId={selectProductId} />
      </Dialog>
      <Dialog
        header="Add New Product"
        visible={showAddMode}
        style={{ width: "40vw" }}
        onHide={() => setShowAddMode(false)}
      >
        <AddProducts
          setProducts={setProducts}
          setProductAdded={() => {
            setShowAddMode(false);
          }}
        />
      </Dialog>
      <Dialog
        header="Edit Product"
        visible={showEditMode}
        style={{ width: "40vw" }}
        onHide={() => setShowEditMode(false)}
      >
        <EditProducts
          productId={selectProductId}
          setProducts={setProducts}
          setProductEdited={() => {
            setShowEditMode(false);
          }}
        />
      </Dialog>
      <ConfirmDialog />
      <Toaster position="top-right" />
    </div>
  );
}
