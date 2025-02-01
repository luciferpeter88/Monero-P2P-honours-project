export default function Card() {
  return (
    <div className="card">
      <div className="visa_logo">
        <img
          src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
          alt=""
        />
      </div>
      <div className="visa_info">
        <img
          src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
          alt=""
        />
        <p>Your Balance</p>
        <h2 className="absolute">9.377160181</h2>
      </div>
      <div className="visa_crinfo">
        <p>Primary</p>
        <p>Peter Kaszap-Nagy</p>
      </div>
    </div>
  );
}
