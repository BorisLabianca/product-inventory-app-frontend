import { MdKeyboardArrowRight } from "react-icons/md";
import "./Sidebar.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { iconDealer } from "../../utils/iconDealer";

const activeSubLink = ({ isActive }) => (isActive ? "active" : "link");
const activeLink = ({ isActive }) => (isActive ? "active" : "link");

const SidebarItem = ({ item, isOpen }) => {
  const [expandMenu, setExpandMenu] = useState(false);
  if (item.children) {
    return (
      <div
        className={
          expandMenu && isOpen
            ? "sidebar-item s-parent open"
            : "sidebar-item s-parent"
        }
      >
        <div className="sidebar-title">
          <span>
            {item.icon && (
              <div className="icon">{iconDealer(item, item.icon)}</div>
            )}
            {isOpen && <div>{item.title}</div>}
          </span>
          <MdKeyboardArrowRight
            size={25}
            className="arrow-icon"
            onClick={() => {
              setExpandMenu(!expandMenu);
            }}
          />
        </div>
        <div className="sidebar-content">
          {item.children.map((child, index) => {
            return (
              <div className="s-child" key={index}>
                <NavLink to={child.path} className={activeSubLink}>
                  <div className="sidebar-item">
                    <div className="sidebar-title">
                      <span>
                        {child.icon && (
                          <div className="icon">
                            {iconDealer(child, child.icon)}
                          </div>
                        )}
                        {isOpen && <div>{child.title}</div>}
                      </span>
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <NavLink to={item.path} className={activeLink}>
        <div className="sidebar-item parent">
          <div className="sidebar-title">
            <span>
              {item.icon && (
                <div className="icon">{iconDealer(item, item.icon)}</div>
              )}
              {isOpen && <div>{item.title}</div>}
            </span>
          </div>
        </div>
      </NavLink>
    );
  }
};

export default SidebarItem;
