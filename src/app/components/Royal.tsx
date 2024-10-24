"use client";

import React, { useEffect, useState } from "react";
import styles from "./Royal.module.css";
import Round from "./Round";

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

const DataComponent: React.FC<{
  title: string;
  odds: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ title, odds, isSelected, onClick }) => {
  const [apiData, setApiData] = useState("");

  return (
    <div
      className={`${styles.dataComponent} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
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

const Royal  = () => {
   
  const [activeTabs, setActiveTabs] = useState<number[]>([0]);
  const [titlesAndOdds, setTitlesAndOdds] = useState<DataItem[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "http://192.168.1.51/task/apis/twosides.php?lottery_type_id=1"
        );
        const data: ApiResponse = await response.json();
        console.log("Fetched data:", JSON.stringify(data, null, 2));

        const labelsAndOdds = data[1]?.Rapido?.data?.slice(0, 6) || [];
        setTitlesAndOdds(labelsAndOdds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);
 
  const handleTabClick = (index: number) =>
    //updates the state of activeTabs
    setActiveTabs((prev) =>
      //checks whether the clicked tab (represented by index) is already present in the activeTabs array
      prev.includes(index)
      // Remove the clicked tab's index from the activeTabs array by filtering out the index
        ? prev.filter((tab) => tab !== index)
        //index is added to the array, marking the tab as active.
        : [...prev, index]
    );

  const handleDataComponentClick = (index: number) => {
    setSelectedIndices((prevIndices) => {
      const newIndices = new Set(prevIndices);
      if (newIndices.has(index)) {
        newIndices.delete(index);
      } else {
        newIndices.add(index);
      }
      return newIndices;
    });
  };

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
            <DataComponent
              key={index}
              title={item.label}
              odds={item.odds}
              isSelected={selectedIndices.has(index)}
              onClick={() => handleDataComponentClick(index)}
            />
          ))}
        </div>
      </div>
      <hr className={styles.hr} />
      <Round />
    </div>
  );
};

export default Royal;
