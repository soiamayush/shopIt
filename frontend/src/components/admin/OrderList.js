import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import { useAlert } from "react-alert";

import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { allOrders, clearErrors, delteOrder } from "../../actions/orderActions"
import { Fragment } from "react";
import SideBar from "./SideBar";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";

const OrderList = () => {

    const alert = useAlert();
  const dispatch = useDispatch();
    const navigate = useNavigate();

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.delUpdateOrder);

  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      alert.error(error)
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order deleted successfully.")
      navigate("/admin/orders")
      dispatch({ type : DELETE_ORDER_RESET});
    }

  }, [dispatch, error, alert, navigate, isDeleted]);

  const delOrderHandler = (id) => {
    dispatch(delteOrder(id))
  }

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num of Items",
          field: "numofItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numofItems : order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: ( <Fragment>
          <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
            <i className="fa fa-eye"></i>
          </Link>
          <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => {delOrderHandler(order._id)}}>
                        <i className="fa fa-trash"></i>
          </button>
          </Fragment>),
      });
    });


    return data;
  };
  return (
    <Fragment>
        <MetaData title={'All orders'} />
        <div className="row">
            <div className="col-12 col-md-2">
                <SideBar/>
            </div>

            <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Orders</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setOrders()}
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

export default OrderList