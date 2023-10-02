import React from "react";
import styles from "./Spinner.module.css";

// Source: https://github.com/n3r4zzurr0/svg-spinners/blob/main/svg-css/6-dots-rotate.svg?short_path=6727f19
const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <svg
        className={styles.spinner}
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'>
        <style>
          {`
            .spinner_Wezc {
              transform-origin: center;
              animation: spinner_Oiah 0.75s step-end infinite;
            }
            @keyframes spinner_Oiah {
              8.3% {
                transform: rotate(30deg);
              }
              16.6% {
                transform: rotate(60deg);
              }
              25% {
                transform: rotate(90deg);
              }
              33.3% {
                transform: rotate(120deg);
              }
              41.6% {
                transform: rotate(150deg);
              }
              50% {
                transform: rotate(180deg);
              }
              58.3% {
                transform: rotate(210deg);
              }
              66.6% {
                transform: rotate(240deg);
              }
              75% {
                transform: rotate(270deg);
              }
              83.3% {
                transform: rotate(300deg);
              }
              91.6% {
                transform: rotate(330deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
        <g className='spinner_Wezc'>
          <circle cx='12' cy='2.5' r='1.5' opacity='0.14' />
          <circle cx='16.75' cy='3.77' r='1.5' opacity='0.29' />
          <circle cx='20.23' cy='7.25' r='1.5' opacity='0.43' />
          <circle cx='21.50' cy='12.00' r='1.5' opacity='0.57' />
          <circle cx='20.23' cy='16.75' r='1.5' opacity='0.71' />
          <circle cx='16.75' cy='20.23' r='1.5' opacity='0.86' />
          <circle cx='12' cy='21.5' r='1.5' />
        </g>
      </svg>
    </div>
  );
};

export default Spinner;
