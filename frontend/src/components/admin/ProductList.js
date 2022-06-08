import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import { useAlert } from "react-alert";

import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { getAdminProduct, clearErrors, deleteProduct } from "../../actions/productAction"
import { Fragment } from "react";
import SideBar from "./SideBar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
    const alert = useAlert();
  const dispatch = useDispatch();
    const navigate = useNavigate();

  const { loading, error, products } = useSelector((state) => state.products);
  const { error : deleteError , isDeleted } = useSelector((state) => state.delUpdateProduct);

  useEffect(() => {
    dispatch(getAdminProduct());

    if (error) {
      alert.error(error)
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Your product deleted successfully.")
      navigate("/admin/products")
      dispatch({ type : DELETE_PRODUCT_RESET});
    }
  }, [dispatch, error, alert, isDeleted, deleteError, navigate]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
       stock : product.stock,
        actions: ( <Fragment>
          <Link to={`/admin/products/${product._id}`} className="btn btn-primary py-1 px-2">
            <i className="fa fa-pencil"></i>
          </Link>
          <button className="btn btn-danger py-1 px-2 ml-2" onClick={()=> (deleteHandler(product._id))}>
                        <i className="fa fa-trash"></i>
          </button>
          </Fragment>),
      });
    });


    return data;
  };

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id))
  }
  return (
    <Fragment>
        <MetaData title={'All Products'} />
        <div className="row">
            <div className="col-12 col-md-2">
                <SideBar/>
            </div>

            <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Products</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setProducts()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>

        </div>
    </Fragment>
  )
}

export default ProductList