import card from "./picture/card.svg";
import useStoredValue from "../components/useStoredValue";

export default function Card({
  name,
  usedAccount,
  lockedBalance,
  unlockedBalance,
}) {
  const typography = useStoredValue("typography");
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
        <p
          style={{
            fontSize: typography?.size.fontSize + 0.5,
            letterSpacing: typography?.size.lineHeight,
          }}
        >
          Your Balance
        </p>
        <h2
          className="absolute"
          style={{
            fontSize: typography?.size.fontSize,
            letterSpacing: typography?.size.lineHeight,
          }}
        >
          Locked {lockedBalance}{" "}
          <span className="ml-36">Unlocked {unlockedBalance}</span>
        </h2>
      </div>
      <div className="visa_crinfo">
        <p
          style={{
            fontSize: typography?.size.fontSize,
            letterSpacing: typography?.size.lineHeight,
          }}
        >
          {usedAccount}
        </p>
        <p
          style={{
            fontSize: typography?.size.fontSize + 1,
            letterSpacing: typography?.size.lineHeight,
          }}
        >
          {name}
        </p>
      </div>
    </div>
  );
}
