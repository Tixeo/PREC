const THEMES = {
  default: {
    primary: 'beige',
    secondary: '#ffffff',
    text: '#333333',
    accent: '#000000',
    searchIcon: '🔍',
    titleFirstPart: '#333333',
    titleSecondPart: '#333333',
    pageTitle: '',
    background: `
      linear-gradient(45deg, transparent 25%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.05) 50%, transparent 50%),
      linear-gradient(-45deg, transparent 25%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.05) 50%, transparent 50%),
      beige
    `
  },
  christmas: {
    primary: '#f0e6e6',
    secondary: '#ffffff',
    text: '#333333',
    accent: '#8b0000',
    searchIcon: '🎅',
    titleFirstPart: '#c41e3a',
    titleSecondPart: '#cccccc',
    pageTitle: ' 🎄',
    background: '#f0e6e6'
  },
  halloween: {
    primary: '#f5e6d3',
    secondary: '#ffffff',
    text: '#333333',
    accent: '#c17817',
    searchIcon: '🎃',
    titleFirstPart: '#ff6b1a',
    titleSecondPart: '#cccccc',
    pageTitle: ' 🕯️',
    background: '#f5e6d3'
  },
  easter: {
    primary: '#f0f0ff',
    secondary: '#ffffff',
    text: '#333333',
    accent: '#9b7bb8',
    searchIcon: '🐰',
    titleFirstPart: '#9b7bb8',
    titleSecondPart: '#cccccc',
    pageTitle: ' 🐇',
    background: '#f0f0ff'
  },
  newYear: {
    primary: '#ffffff',
    secondary: '#000000',
    text: '#333333',
    accent: '#ffcc00',
    searchIcon: '🎉',
    titleFirstPart: '#ffcc00',
    titleSecondPart: '#333333',
    pageTitle: ' 🎆',
    background: '#ffffff'
  },
  poissonDAvril: {
    primary: '#f2c464',
    secondary: '#ffffff',
    text: '#333333',
    accent: '#007bff',
    searchIcon: '🐟',
    titleFirstPart: '#007bff',
    titleSecondPart: '#cccccc',
    pageTitle: ' 🐟',
    background: '#f2c464'
  }
};

export const getThemeForDate = () => {
  const date = new Date();
  const month = date.getMonth();
  const day = date.getDate();

  // Noël (1-25 décembre)
  if (month === 11 && day >= 1 && day <= 25) {
    console.log("Thème de Noël activé");
    return THEMES.christmas;
  }
  // Jour de l'An (26-31 décembre)
  if (month === 11 && day >= 26 || month === 0 && day <= 1) {
    console.log("Thème du Jour de l'An activé");
    return THEMES.newYear;
  }
  
  // Halloween (15-31 octobre)
  if (month === 9 && day >= 15) {
    console.log("Thème d'Halloween activé");
    return THEMES.halloween;
  }

  // Poisson d'Avril (1er avril)
  if (month === 3 && day === 1) {
    console.log("Thème du Poisson d'Avril activé");
    return THEMES.poissonDAvril;
  }
  
  // Pâques (2 semaines autour de la date)
  const easterDates = {
    2024: { month: 2, day: 31 }, // 31 mars 2024
    2025: { month: 3, day: 20 }, // 20 avril 2025
    2026: { month: 3, day: 5 }   // 5 avril 2026
  };
  
  const year = date.getFullYear();
  const easter = easterDates[year];
  if (easter && month === easter.month && Math.abs(day - easter.day) <= 7) {
    console.log("Thème de Pâques activé");
    return THEMES.easter;
  }

  return THEMES.default;
};

export const applyTheme = () => {
  const theme = getThemeForDate();
  const root = document.documentElement;
  
  root.style.setProperty('--primary-color', theme.primary);
  root.style.setProperty('--secondary-color', theme.secondary);
  root.style.setProperty('--text-color', theme.text);
  root.style.setProperty('--accent-color', theme.accent);
  root.style.setProperty('--background', theme.background);
  root.style.setProperty('--title-first-part', theme.titleFirstPart);
  root.style.setProperty('--title-second-part', theme.titleSecondPart);
  
  // Mise à jour du titre de la page
  const currentTitle = document.title;
  if (!currentTitle.endsWith(theme.pageTitle)) {
    document.title = currentTitle.split(' 🎄')[0].split(' 🐇')[0].split(' 🕯️')[0] + theme.pageTitle;
  }
}; 