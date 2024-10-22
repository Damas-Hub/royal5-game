"use client"; // This directive enables client-side rendering for this component

import React, { useState } from 'react';
import styles from './Royal.module.css';

const DataComponent: React.FC<{ title: string }> = ({ title }) => {
  const [apiData, setApiData] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setApiData(event.target.value); // Update state with input value
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
  const [activeTabs, setActiveTabs] = useState<number[]>([]); // Array for active tabs

  const handleTabClick = (index: number): void => {
    setActiveTabs(prevActiveTabs => {
      if (prevActiveTabs.includes(index)) {
        // If tab is already active, remove it
        return prevActiveTabs.filter(tab => tab !== index);
      } else {
        // Otherwise, add it
        return [...prevActiveTabs, index];
      }
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.first}>
        <div className={styles.tabsContainer}>
          {['1st', '2nd', '3rd', '4th', '5th'].map((label, index) => (
            <div
              key={index}
              className={`${styles.tab} ${activeTabs.includes(index) ? styles.active : ''}`}
              onClick={() => handleTabClick(index)}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.second}>
        <div className={styles.componentsContainer}>
          <DataComponent title="Big" />
          <DataComponent title="Small" />
          <DataComponent title="Odd" />
          <DataComponent title="Even" />
          <DataComponent title="Prime" />
          <DataComponent title="Composite" />
        </div>
      </div>
    </div>
  );
}

export default Royal;
