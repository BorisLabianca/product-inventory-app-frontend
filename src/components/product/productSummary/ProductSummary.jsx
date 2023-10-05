import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import "./ProductSummary.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  calcOutOfStock,
  calcStoreValue,
  calcCategories,
  selectOutOfStock,
  selectTotalStoreValue,
  selectCategories,
} from "../../../redux/features/product/productSlice";
import { useEffect } from "react";

const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({ products }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const categories = useSelector(selectCategories);

  const dashboardCategories = [
    {
      key: 1,
      title: "Total Products",
      icon: <BsCart4 size={40} color="#fff" />,
      count: products.length,
      bgColor: "card1",
    },
    {
      key: 2,
      title: "Total Store Value",
      icon: <AiFillDollarCircle size={40} color="#fff" />,
      count: "$ " + formatNumbers(totalStoreValue.toFixed(2)),
      bgColor: "card2",
    },
    {
      key: 3,
      title: "Out of Stock",
      icon: <BsCartX size={40} color="#fff" />,
      count: outOfStock,
      bgColor: "card3",
    },
    {
      key: 4,
      title: "All Categories",
      icon: <BiCategory size={40} color="#fff" />,
      count: categories,
      bgColor: "card4",
    },
  ];
  //   const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
  //   const productIcon = <BsCart4 size={40} color="#fff" />;
  //   const categoryIcon = <BiCategory size={40} color="#fff" />;
  //   const outOfStockIcon = <BsCartX size={40} color="#fff" />;

  useEffect(() => {
    dispatch(calcStoreValue(products));
    dispatch(calcOutOfStock(products));
    dispatch(calcCategories(products));
  }, [products]);

  return (
    <div className="product-summary">
      <h3 className="--mt">Inventory Stats</h3>
      <div className="info-summary">
        {dashboardCategories.map((cat) => {
          return (
            <InfoBox
              key={cat.key}
              icon={cat.icon}
              title={cat.title}
              count={cat.count}
              bgColor={cat.bgColor}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductSummary;
