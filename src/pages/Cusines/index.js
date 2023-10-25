import "./index.css";

export default function Cusine() {
  return (
    <div className="cusine-container">
      <div className="cusine-navigation">Recipes</div>

      <div className="content-name">Cuisines</div>

      <div className="cusine-list">
        <div className="cusine-type">
          <img alt="american" src="/Meals/america.svg" />
        </div>

        <div className="cusine-type">
          <img alt="asian" src="/Meals/asia.svg" />
        </div>

        <div className="cusine-type">
          <img alt="chinese" src="/Meals/china.svg" />
        </div>

        <div className="cusine-type">
          <img alt="continental" src="/Meals/continental.svg" />
        </div>

        <div className="cusine-type">
          <img alt="indian" src="/Meals/india.svg" />
        </div>

        <div className="cusine-type">
          <img alt="japanese" src="/Meals/japan.svg" />
        </div>

        <div className="cusine-type">
          <img alt="french" src="/Meals/french.svg" />
        </div>

        <div className="cusine-type">
          <img alt="italian" src="/Meals/italy.svg" />
        </div>

        <div className="cusine-type">
          <img alt="mexican" src="/Meals/mexico.svg" />
        </div>

        <div className="cusine-type">
          <img alt="spanish" src="/Meals/spain.svg" />
        </div>
      </div>

      <div className="content-name">Meals</div>

      <div className="cusine-list">
        <div className="cusine-type">
          <img alt="breakfast" src="/Meals/breakfast.svg" />
        </div>

        <div className="cusine-type">
          <img alt="brunch" src="/Meals/brunch.svg" />
        </div>

        <div className="cusine-type">
          <img alt="lunch" src="/Meals/lunch.svg" />
        </div>

        <div className="cusine-type">
          <img alt="snacks" src="/Meals/snacks.svg" />
        </div>

        <div className="cusine-type">
          <img alt="dinner" src="/Meals/dinner.svg" />
        </div>

        <div className="cusine-type">
          <img alt="latenight" src="/Meals/latenight.svg" />
        </div>
      </div>
    </div>
  );
}
