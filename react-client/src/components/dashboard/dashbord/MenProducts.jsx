import React from "react";

const MenProducts = props => {
  return (
    <div>
      {props.data.map(el => {
        return (
          <div className="ui celled list" key={el._id}>
            <div className="item">
              <img
                className="ui image"
                src={el.image}
                width="120px"
                height="120px"
              />
              <div className="content">
                <div className="header">{el.title}</div>
              </div>
              <div>{el.description}</div>
              <div> {el.brand}</div>
              <div> {el.category}</div>
              <div>{el.price} €</div>
              <div>
                <div className="ui buttons">
                  <button className="ui red button">Delete</button>
                  <div className="or"></div>
                  <button className="ui positive button">Update</button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenProducts;
