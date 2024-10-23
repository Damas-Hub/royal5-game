"use client";

import React, { useEffect, useState } from "react";
import styles from "./Royal.module.css";
import Round from './Round';

interface DataItem {
  label: string;
  labelid: number;
  key: string;
  odds: string;
  gameid: number;
  isSpecial: string;
}

interface ApiResponse {
  [key: number]: {
    Rapido: {
      data: DataItem[];
    };
    all_kinds: object;
  };
}

const DataComponent: React.FC<{ title: string; odds: string }> = ({ title, odds }) => {
  const [apiData, setApiData] = useState("");

  return (
    <div className={styles.dataComponent}>
      <div className={styles.title}>{title}</div>
      <div className={styles.number}>{odds}</div>   
      <input
        type="text"
        placeholder="elementary"
        className={styles.inputField}
        value={apiData}
        onChange={(e) => setApiData(e.target.value)}
      />
    </div>
  );
};

const Royal: React.FC = () => {
  const [activeTabs, setActiveTabs] = useState<number[]>([]);
  const [titlesAndOdds, setTitlesAndOdds] = useState<DataItem[]>([]);  // Storing both label and odds

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "http://192.168.1.51/task/apis/twosides.php?lottery_type_id=1"
        );
        const data: ApiResponse = await response.json();
        console.log("Fetched data:", JSON.stringify(data, null, 2));

        const labelsAndOdds = data[1]?.Rapido?.data?.slice(0, 6) || [];
        setTitlesAndOdds(labelsAndOdds);  // Storing the label and odds
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  const handleTabClick = (index: number) =>
    setActiveTabs((prev) =>
      prev.includes(index)
        ? prev.filter((tab) => tab !== index)
        : [...prev, index]
    );

  return (
    <div className={styles.main}>
      <div className={styles.first}>
        <div className={styles.tabsContainer}>
          {["1st", "2nd", "3rd", "4th", "5th"].map((label, index) => (
            <div
              key={index}
              className={`${styles.tab} ${
                activeTabs.includes(index) ? styles.active : ""
              }`}
              onClick={() => handleTabClick(index)}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.second}>
        <div className={styles.componentsContainer}>
          {titlesAndOdds.map((item, index) => (
            <DataComponent key={index} title={item.label} odds={item.odds} />  // Passing odds
          ))}
        </div>
        <hr className={styles.hr} />
      </div>
      <Round />
    </div>
  );
};

export default Royal;
