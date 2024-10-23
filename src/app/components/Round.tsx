"use client";

import React, { useEffect, useState } from "react";
import styles from "./Round.module.css";

interface DataItem {
  label: string;
  odds: string;
}

const Round: React.FC<{ label: string; odds: string }> = ({ label, odds }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected((prev) => !prev);
  };

  return (
    <div
      className={`${styles.roundWrapper} ${isSelected ? styles.selected : ""}`}
      onClick={handleClick}
    >
      <div className={styles.horizontalContainer}>
        <button className={styles.roundButton}>
          <span className={styles.innerNumber}>{label}</span>  
        </button>
        <span className={styles.secondNumber}>{odds}</span>  
        <input
          type="text"
          placeholder="real numbers"
          className={styles.inputField}
        />
      </div>
    </div>
  );
};

const RoundList: React.FC = () => {
  const [roundData, setRoundData] = useState<DataItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "http://192.168.1.51/task/apis/twosides.php?lottery_type_id=1"
        );
        const data = await response.json();
        const fetchedData = data[1]?.Rapido?.data || [];
        const roundsToDisplay = fetchedData.slice(6, 16).map((item: DataItem) => ({
          label: item.label,
          odds: item.odds,
        }));

        setRoundData(roundsToDisplay);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    <div className={styles.roundList}>
      {roundData.map((item, index) => (
        <Round key={index} label={item.label} odds={item.odds} />
      ))}
    </div>
  );
};

export default RoundList;
