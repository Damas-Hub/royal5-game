"use client";

import React, { useState } from "react";
import styles from "./Round.module.css";

const Round: React.FC = () => {
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
          <span className={styles.innerNumber}>0</span>
        </button>
        <span className={styles.secondNumber}>0</span>
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
  const rounds = Array.from({ length: 10 }).map((_, index) => (
    <Round key={index} />
  ));

  return <div className={styles.roundList}>{rounds}</div>;
};

export default RoundList;
