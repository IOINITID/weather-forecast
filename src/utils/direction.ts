const getDirectionDescription = (direction: string): string => {
  switch (direction) {
    case `NNE`:
      return `ССВ`;
    case `NE`:
      return `СВ`;
    case `ENE`:
      return `ВСВ`;
    case `E`:
      return `В`;
    case `ESE`:
      return `ВЮВ`;
    case `SE`:
      return `ЮВ`;
    case `SSE`:
      return `ЮЮВ`;
    case `S`:
      return `Ю`;
    case `SSW`:
      return `ЮЮЗ`;
    case `SW`:
      return `ЮЗ`;
    case `WSW`:
      return `ЗЮЗ`;
    case `W`:
      return `З`;
    case `WNW`:
      return `ЗСЗ`;
    case `NW`:
      return `СЗ`;
    case `NNW`:
      return `ССЗ`;
    case `N`:
      return `С`;
    default:
      return `С`;
  }
};

export { getDirectionDescription };
