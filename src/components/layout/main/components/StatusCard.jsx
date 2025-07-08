import React, { useEffect } from "react";

function StatusCard({ stats, i }) {
  const [cardBg, setCardBg] = React.useState("");

  useEffect(() => {
    switch (i) {
      case 0:
        setCardBg("var(--primary-color)");
        break;
      case 1:
        setCardBg("#44C2AA");
        break;
      case 2:
        setCardBg("#FE8C46");
        break;
      case 3:
        setCardBg("#7853EE");
        break;
      default:
        break;
    }
  }, [i]);

  return (
    <div
      style={{
        backgroundColor: cardBg,
      }}
      className={`rounded-lg shadow p-6`}
    >
      <div>
        {stats?.icon && <stats.icon />}
        <h1>{stats?.title}</h1>
        <h1>{stats?.number}</h1>
      </div>
    </div>
  );
}

export default StatusCard;
