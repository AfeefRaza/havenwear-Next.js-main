module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {boxShadow: {
      retro: '4px 7px 0px 3px rgba(28,28,25,0.89)',
      
    },
    
    colors: {
      'text': '#1C1C19',
      'primary': '#617498',
      'secondary': '#DEE0E8',
      'accent': '#958A65',
      'background': '#FCF6EA',
      
    },
    fontFamily: {
      market: ['market'],
    },},
    
    
  },
  plugins: [],
}