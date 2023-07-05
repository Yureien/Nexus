import React from "react";
import item1 from "./images/item-1.jpeg";
import item2 from "./images/item-2.jpeg";
import item3 from "./images/item-3.jpeg";
import item4 from "./images/item-4.jpeg";
import item5 from "./images/item-5.jpeg";
import item6 from "./images/item-6.jpeg";
import item7 from "./images/item-7.jpeg";
import item8 from "./images/item-8.jpeg";
import item9 from "./images/item-9.jpeg";
import item10 from "./images/item-10.jpeg";

const imagesMap = {
  "item-1.jpeg": item1,
  "item-2.jpeg": item2,
  "item-3.jpeg": item3,
  "item-4.jpeg": item4,
  "item-5.jpeg": item5,
  "item-6.jpeg": item6,
  "item-7.jpeg": item7,
  "item-8.jpeg": item8,
  "item-9.jpeg": item9,
  "item-10.jpeg": item10,
};

const Menu = ({ items, onClick }) => {
  return (
    <div className="section-center">
      {items.map((item) => {
        const { id, title, img, desc, price } = item;
        return (
          <article key={id} className="menu-item">
            <img src={imagesMap[img]} alt={title} className="photo" />
            <div className="item-info">
              <header>
                <h4>{title}</h4>
                <h4 className="price">
                  {price} SUI
                  <button onClick={() => onClick(title)}>Buy now</button>
                </h4>
              </header>
              <p className="item-text">{desc}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Menu;
