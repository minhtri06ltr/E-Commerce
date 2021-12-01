import "./featuredInfo.css";
import {
  ArrowDownward,
  ArrowUpward,
  Person,
  Store,
  Assignment,
} from "@material-ui/icons";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllOrders,
  getAllProducts,
  getAllUsers,
} from "../../redux/apiRequest";
import { userRequest } from "../../helper/requestMethods";
export default function FeaturedInfo() {
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => state.product.products,
  );
  const users = useSelector(
    (state) => state.userList.users,
  );
  const orders = useSelector(
    (state) => state.order.orders,
  );
  const [income, setIncome] = useState([]);
  const [percent, setPercent] = useState(0);
  const [salePercent, setSalePercent] =
    useState(0);
  useEffect(() => {
    const getIncome = async () => {
      try {
        const response = await userRequest.get(
          "/orders/income",
        );
        setIncome(
          response.data.income.sort((a, b) => {
            return a._id - b._id;
          }),
        );
        setPercent(
          (response.data.income[1].total * 100) /
            response.data.income[0].total -
            100,
        );
        setSalePercent(
          (response.data.income[1].quantity *
            100) /
            response.data.income[0].quantity -
            100,
        );
      } catch (error) {
        console.log(error);
      }
    };
    getIncome();

    getAllUsers(dispatch);
    getAllProducts(dispatch);
    getAllOrders(dispatch);
  }, []);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">
          Money
        </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            ${income[1]?.total}
          </span>
          <span className="featuredMoneyRate">
            {Math.floor(percent)} %
            {percent < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">
          Compared to last month
        </span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">
          Sales
        </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {income[1]?.quantity}
          </span>
          <span className="featuredMoneyRate">
            {Math.floor(salePercent)} %
            {salePercent < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">
          Compared to last month
        </span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">
          Summary
        </span>
        <div
          className="featuredMoneyContainer"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span className="featuredMoney">
            <Person /> {products.length}
          </span>
          <span className="featuredMoney">
            <Store />
            {users.length}
          </span>
          <span className="featuredMoney">
            <Assignment /> {orders.length}
          </span>
        </div>
      </div>
    </div>
  );
}
