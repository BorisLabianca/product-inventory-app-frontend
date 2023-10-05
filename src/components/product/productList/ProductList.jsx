import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { SpinnerImg } from "../../loader/Loader";
import "./ProductList.scss";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProducts,
  selectFilteredProducts,
} from "../../../redux/features/product/filterSlice";

const ProductList = ({ products, isLoading }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredProducts);

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  useEffect(() => {
    dispatch(filterProducts({ products, search }));
  }, [products, search]);

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </span>
        </div>
        {isLoading && <SpinnerImg />}
        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>No products found. Please add a product.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => {
                  const {
                    _id,
                    name,
                    category,
                    price,
                    quantity,
                    description,
                    sku,
                  } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 15)}</td>
                      <td>{category}</td>
                      <td>$ {price}</td>
                      <td>{quantity}</td>
                      <td>$ {price * quantity}</td>
                      <td className="icons">
                        <AiOutlineEye color="purple" size={25} />
                        <FaEdit color="green" size={20} />
                        <FaTrashAlt color="red" size={20} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
