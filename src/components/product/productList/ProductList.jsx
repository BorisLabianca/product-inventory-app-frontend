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
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteProduct,
  getProducts,
} from "../../../redux/features/product/productSlice";

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

  const delProduct = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm delete product",
      message: "Are you sure you want to delete this product?",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          //   onClick: () => alert("Click No"),
        },
      ],
    });
  };

  // Pagination beginning
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  // Pagination end

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
                {currentItems?.map((product, index) => {
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
                        <FaTrashAlt
                          color="red"
                          size={20}
                          onClick={() => {
                            confirmDelete(_id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="NEXT"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="PREV"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          //   activeClassName="activePage"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default ProductList;
