import card from "./picture/card.svg";
export default function Card({
  name,
  usedAccount,
  lockedBalance,
  unlockedBalance,
}) {
  return (
    <div className="card" style={{ backgroundImage: `url(${card})` }}>
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
        <h2 className="absolute">
          Locked {lockedBalance}{" "}
          <span className="ml-36">Unlocked {unlockedBalance}</span>
        </h2>
      </div>
      <div className="visa_crinfo">
        <p>{usedAccount}</p>
        <p>{name}</p>
      </div>
    </div>
  );
}
