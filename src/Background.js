import React from 'react';
import right from './images/designright.png'; // Importez votre image
import left from './images/left.png';

const rightImageStyle = {
  position: 'fixed', // Position fixe pour rester à l'extrémité droite
  top: '0', // Collé en haut de la fenêtre
  right: '0', // Collé à droite de la fenêtre
  height: '100vh', // Hauteur de l'image couvrant toute la page
};

const leftImageStyle = {
  position: 'fixed', // Position fixe pour rester à l'extrémité droite
  top: '0', // Collé en haut de la fenêtre
  left: '0', // Collé à droite de la fenêtre
  height: '100vh', // Hauteur de l'image couvrant toute la page
};



function Background() {
  

  return (
    <div>
      <img src={left} alt="left" style={leftImageStyle} />
      
      <img src={right} alt="Right" style={rightImageStyle} />
      </div>
  );
}

export default Background;



// import React from 'react';
// import right from './images/designright.png'; // Importez votre image
// import left from './images/left.png';

// const containerStyle = {
//   position: 'relative',
//   width: '100%',
//   height: '100%',
// };

// const leftBackgroundStyle = {
//   position: 'fixed',
//   top: '0',
//   left: '0',
//   width: '30%', // Ajuster la largeur pour s'adapter à la moitié de l'écran
//   height: '100vh',
//   backgroundImage: `url(${left})`,
//   backgroundSize: 'cover',
//   backgroundRepeat: 'no-repeat',
//   backgroundPosition: 'left top',
// };

// const rightBackgroundStyle = {
//   position: 'fixed',
//   top: '0',
//   right: '0',
//   width: '30%', // Ajuster la largeur pour s'adapter à la moitié de l'écran
//   height: '100vh',
//   backgroundImage: `url(${right})`,
//   backgroundSize: 'cover',
//   backgroundRepeat: 'no-repeat',
//   backgroundPosition: 'right top',
// };

// function Background() {
//   return (
//     <div style={containerStyle}>
//       <div style={leftBackgroundStyle}></div>
//       <div style={rightBackgroundStyle}></div>
//     </div>
//   );
// }

// export default Background;
