import "./index.css";

export default function Cusine() {
  return (
    <div className="cusine-container">
      <div className="cusine-navigation">Recipes</div>

      <div className="content-name">Cuisines</div>

      <div className="cusine-list">
        <div className="cusine-type">
          <img alt="american" src="/Meals/america.svg" title="American" />
          <div className="cusine-name">American</div>
        </div>

        <div className="cusine-type">
          <img alt="asian" src="/Meals/asia.svg" title="asian" />
          <div className="cusine-name">Asian</div>
        </div>

        <div className="cusine-type">
          <img alt="chinese" src="/Meals/china.svg" />
          <div className="cusine-name">Chinese</div>
        </div>

        <div className="cusine-type">
          <img alt="continental" src="/Meals/continental.svg" />
          <div className="cusine-name">Continental</div>
        </div>

        <div className="cusine-type">
          <img alt="indian" src="/Meals/india.svg" />
          <div className="cusine-name">Indian</div>
        </div>

        <div className="cusine-type">
          <img alt="japanese" src="/Meals/japan.svg" />
          <div className="cusine-name">Japanese</div>
        </div>

        <div className="cusine-type">
          <img alt="french" src="/Meals/french.svg" />
          <div className="cusine-name">French</div>
        </div>

        <div className="cusine-type">
          <img alt="italian" src="/Meals/italy.svg" />
          <div className="cusine-name">Italian</div>
        </div>

        <div className="cusine-type">
          <img alt="mexican" src="/Meals/mexico.svg" />
          <div className="cusine-name"> Mexican</div>
        </div>

        <div className="cusine-type">
          <img alt="spanish" src="/Meals/spain.svg" />
          <div className="cusine-name">Spanish</div>
        </div>
      </div>

      <div className="content-name">Meals</div>

      <div className="cusine-list">
        <div className="cusine-type">
          <img alt="breakfast" src="/Meals/breakfast.svg" />
          <div className="cusine-name">Breakfast</div>
        </div>

        <div className="cusine-type">
          <img alt="brunch" src="/Meals/brunch.svg" />
          <div className="cusine-name">Brunch</div>
        </div>

        <div className="cusine-type">
          <img alt="lunch" src="/Meals/lunch.svg" />
          <div className="cusine-name">Lunch</div>
        </div>

        <div className="cusine-type">
          <img alt="snacks" src="/Meals/snacks.svg" />
          <div className="cusine-name">Snacks</div>
        </div>

        <div className="cusine-type">
          <img alt="dinner" src="/Meals/dinner.svg" />
          <div className="cusine-name">Dinner</div>
        </div>

        <div className="cusine-type">
          <img alt="latenight" src="/Meals/latenight.svg" />
          <div className="cusine-name">Late Night</div>
        </div>
      </div>
    </div>
  );
}
