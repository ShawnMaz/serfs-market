import React from "react";

import Weapon from "./Weapon";
import Food from "./Food";
import Luxury from "./Luxury";

const ManageStocks= ({stock}) => {

    const weapons = stock.filter(weapons => weapons.stockCategory === "weaponry" )
    const foods = stock.filter(weapons => weapons.stockCategory === "food" )
    const luxuries = stock.filter(weapons => weapons.stockCategory === "luxury" )


return (
    <section>
      <div className="category-contain">
      <h3 className="categories">Weapons</h3>
      {weapons.length && weapons.map(weapon => (
        <Weapon key={weapon._id} weapon={weapon} />
      ))}
      </div>
      <div className="category-contain">
      <h3 className="categories">Food</h3>
      {foods.length && foods.map(food => (
        <Food key={food._id} food={food} />
      ))}
      </div>
      <div className="category-contain">
      <h3 className="categories">Luxury</h3>
      {luxuries.length && luxuries.map(luxury => (
        <Luxury key={luxury._id} luxury={luxury} />
      ))}
      </div>
    </section>
)
}

export default ManageStocks;