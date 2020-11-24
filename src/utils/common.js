// /**
//  * @description Get wind direction by degrees.
//  * @param {Number} degrees Degrees in radian.
//  * @return {String} Wind direction.
//  */
// const getWindDirectionByDegrees = (degrees) => {
//   let windDirection;

//   switch (true) {
//     case degrees > 11.25 && degrees < 33.75:
//       windDirection = `NNE`;
//       break;
//     case degrees > 33.75 && degrees < 56.25:
//       windDirection = `NE`;
//       break;
//     case degrees > 56.25 && degrees < 78.75:
//       windDirection = `ENE`;
//       break;
//     case degrees > 78.75 && degrees < 101.25:
//       windDirection = `E`;
//       break;
//     case degrees > 101.25 && degrees < 123.75:
//       windDirection = `ESE`;
//       break;
//     case degrees > 123.75 && degrees < 146.25:
//       windDirection = `SE`;
//       break;
//     case degrees > 146.25 && degrees < 168.75:
//       windDirection = `SSE`;
//       break;
//     case degrees > 168.75 && degrees < 191.25:
//       windDirection = `S`;
//       break;
//     case degrees > 191.25 && degrees < 213.75:
//       windDirection = `SSW`;
//       break;
//     case degrees > 213.75 && degrees < 236.25:
//       windDirection = `SW`;
//       break;
//     case degrees > 236.25 && degrees < 258.75:
//       windDirection = `WSW`;
//       break;
//     case degrees > 258.75 && degrees < 281.25:
//       windDirection = `W`;
//       break;
//     case degrees > 281.25 && degrees < 303.75:
//       windDirection = `WNW`;
//       break;
//     case degrees > 303.75 && degrees < 326.25:
//       windDirection = `NW`;
//       break;
//     case degrees > 326.25 && degrees < 348.75:
//       windDirection = `NNW`;
//       break;
//     case degrees > 348.75 && degrees < 11.25:
//       windDirection = `N`;
//       break;
//     default:
//       windDirection = `N`;
//       break;
//   }

//   return windDirection;
// };

// export {
//   getWindDirectionByDegrees
// };
