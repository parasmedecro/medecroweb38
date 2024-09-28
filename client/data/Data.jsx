// Sidebar imports
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilSignOutAlt,
    UilHeartRate,
    UilBed,
    // UisAlignCenter,
  } from "@iconscout/react-unicons";

  import { HeartPulse } from 'lucide-react';








  // Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
// import { keyboard } from "@testing-library/user-event/dist/keyboard";











//   // Analytics Cards Data
// export const cardsData = [
//     {
//       title: "Sales",
//       color: {
//         backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
//         boxShadow: "0px 10px 20px 0px #e0c6f5",
//       },
//       barValue: 70,
//       value: "25,970",
//       png: UilUsdSquare,
//       series: [
//         {
//           name: "Sales",
//           data: [31, 40, 28, 51, 42, 109, 100],
//         },
//       ],
//     },
//     {
//       title: "Revenue",
//       color: {
//         backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
//         boxShadow: "0px 10px 20px 0px #FDC0C7",
//       },
//       barValue: 80,
//       value: "14,270",
//       png: UilMoneyWithdrawal,
//       series: [
//         {
//           name: "Revenue",
//           data: [10, 100, 50, 70, 80, 30, 40],
//         },
//       ],
//     },
//     {
//       title: "Expenses",
//       color: {
//         backGround:
//           "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
//         boxShadow: "0px 10px 20px 0px #F9D59B",
//       },
//       barValue: 60,
//       value: "4,270",
//       png: UilClipboardAlt,
//       series: [
//         {
//           name: "Expenses",
//           data: [10, 25, 15, 30, 12, 15, 20],
//         },
//       ],
//     },
//   ];





// Function to generate a random integer between min (inclusive) and max (inclusive)
const getRandomBarValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  // Example of cardsData with random barValues
  export const cardsData = [
    {
      title: "Vital Signs",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: getRandomBarValue(50, 70), // Random value between 70 and 90
      value: "Vital Signs Score",
      png: HeartPulse, // Assuming you have a heart rate icon
      series: [
        {
          name: "Vital Signs",
          data: [120, 118, 115, 121, 119, 117, 120], // Example data for systolic BP readings
        },
      ],
    },
    {
      title: "Metabolic Health",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      barValue: getRandomBarValue(85, 94), // Random value between 70 and 90
      value: "Metabolic Health Score",
      png: UilHeartRate, // Assuming a medical icon
      series: [
        {
          name: "Cholesterol",
          data: [190, 195, 185, 180, 195, 200, 190], // Example cholesterol level data
        },
      ],
    },
    {
      title: "Sleep Quality",
      color: {
        backGround:
          "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      barValue: getRandomBarValue(70, 80), // Random value between 70 and 90
      value: "Sleep Quality Score",
      png: UilBed, // Assuming a bed or sleep icon
      series: [
        {
          name: "Sleep Patterns",
          data: [7, 6.5, 8, 7.5, 6, 7, 7.5], // Example sleep hours over a week
        },
      ],
    },
  ];
  





