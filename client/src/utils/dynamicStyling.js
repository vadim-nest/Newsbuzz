function dynamicStyling() {
  let differentFonts = [`'Inter', sans-serif`, `'Playfair Display', serif`, `'Raleway', sans-serif`, `'Roboto', sans-serif`, `'Sono', sans-serif`, `'Zilla Slab', serif`];
  let differentColors =         ['#172cd3', '#FF7F11', '#FF1B1C', '#F58F29', '#c4fa70', '#fc42e3', '#fe1d01', '#31CB00', '#45F0DF', '#F7DD72', '#ff479d']
  let differentColorsOnHover =  ['#102093', '#CC5F00', '#CC0000', '#C36609', '#A7F726', '#DD03C0', '#B71601', '#1D7A00', '#11D0BC', '#F2C618', '#E00069']

  let allHashtags = document.querySelectorAll('.theMarker');

  allHashtags.forEach(element => {
    // Set random fonts
    let randomFont = differentFonts[Math.floor(Math.random() * differentFonts.length)];
    element.style.fontFamily = randomFont;

    // Set random colours
    let colorIndex = Math.floor(Math.random() * differentColors.length);
    let randomColor = differentColors[colorIndex];
    let randomColorhover = differentColorsOnHover[colorIndex]
    element.style.color = randomColor;
    element.addEventListener('mouseover', function handleMouseover() {
      element.style.color = randomColorhover;
    })
    element.addEventListener('mouseout', function handleMouseover() {
      element.style.color = randomColor;
    })
  })
}

module.exports = { dynamicStyling };
