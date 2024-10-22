"use client";

import React, { useEffect, useState } from "react";
import styles from "./Royal.module.css";

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
    all_kinds: object; // Replace with a more specific type if known
  };
}

const DataComponent: React.FC<{ title: string }> = ({ title }) => {
  const [apiData, setApiData] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setApiData(event.target.value);
  };

  return (
    <div className={styles.dataComponent}>
      <div className={styles.title}>{title}</div>
      <div className={styles.number}>0</div>
      <input
        type="text"
        placeholder="elementary"
        className={styles.inputField}
        value={apiData}
        onChange={handleInputChange}
      />
    </div>
  );
};

const Royal: React.FC = () => {
  const [activeTabs, setActiveTabs] = useState<number[]>([]);
  const [titles, setTitles] = useState<string[]>([]);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await fetch("http://192.168.1.51/task/apis/twosides.php?lottery_type_id=1");
        const data: ApiResponse = await response.json();

        console.log("Fetched data:", JSON.stringify(data, null, 2));

        if (data[1] && data[1].Rapido && data[1].Rapido.data && Array.isArray(data[1].Rapido.data)) {
          const labelsArray = data[1].Rapido.data;
          const extractedTitles = labelsArray.map((item) => item.label);
          setTitles(extractedTitles.slice(0, 6));
        } else {
          console.error("Unexpected data format:", data);
           
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTitles();
  }, []);

  const handleTabClick = (index: number): void => {
    setActiveTabs((prevActiveTabs) => {
      if (prevActiveTabs.includes(index)) {
        return prevActiveTabs.filter((tab) => tab !== index);
      } else {
        return [...prevActiveTabs, index];
      }
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.first}>
        <div className={styles.tabsContainer}>
          {["1st", "2nd", "3rd", "4th", "5th"].map((label, index) => (
            <div
              key={index}
              className={`${styles.tab} ${activeTabs.includes(index) ? styles.active : ""}`}
              onClick={() => handleTabClick(index)}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.second}>
        <div className={styles.componentsContainer}>
          {titles.map((title, index) => (
            <DataComponent key={index} title={title} />
          ))}
        </div>
        <hr className={styles.hr} />
      </div>
    </div>
  );
};

export default Royal;
