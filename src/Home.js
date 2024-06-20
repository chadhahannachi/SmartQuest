import React from 'react';
import logo from './images/logo2.png'; // Importez votre image
import { Button } from '@chakra-ui/react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import right from './images/designright.png'; // Importez votre image
import left from './images/left.png';
import Background from './Background';
import { Link } from "react-router-dom";

const containerStyle = {
  display: 'flex',
  flexDirection: 'column', // Pour aligner les éléments verticalement
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // Pour centrer verticalement sur toute la hauteur de la fenêtre
  position: 'relative', // Ajout de la position relative pour positionner l'image right
};

const imageStyle = {
  width: '350px', // Largeur de l'image (modifiable selon vos préférences)
  height: 'auto', // La hauteur s'ajuste automatiquement en fonction de la largeur
};

// const rightImageStyle = {
//   position: 'fixed', // Position fixe pour rester à l'extrémité droite
//   top: '0', // Collé en haut de la fenêtre
//   right: '0', // Collé à droite de la fenêtre
//   height: '100vh', // Hauteur de l'image couvrant toute la page
// };

// const leftImageStyle = {
//   position: 'fixed', // Position fixe pour rester à l'extrémité droite
//   top: '0', // Collé en haut de la fenêtre
//   left: '0', // Collé à droite de la fenêtre
//   height: '100vh', // Hauteur de l'image couvrant toute la page
// };


const textStyle = {
  fontWeight: '200',
  color: 'black',
  fontSize: '40px', // Ajustez cette valeur pour augmenter la taille du texte
  textAlign: 'center', // Pour centrer le texte
};

function Home() {
  const [typeEffect] = useTypewriter({
    words: ['Le futur de la science commence aujourd\'hui'],
    loop: {},
    typeSpeed: 50,
    delaySpeed: 2000
  });

  const splitText = (text) => {
    const parts = text.split(' ');
    return (
      <>
        <span>{parts[0]}</span>{' '}
        <span style={{ color: '#EF4346', fontWeight: 'bold' }}>{parts[1]}</span>{' '}
        <span>{parts[2]}</span>{' '}
        <span>{parts[3]}</span>{' '}
        <span>{parts[4]}</span>{' '}
        <span>{parts[5]}</span>{' '}
        <span style={{ color: '#4D6466', fontStyle: 'italic' }}>{parts.slice(6).join(' ')}</span>
      </>
    );
  };

  return (
    
    <div style={containerStyle}>
      {/* <img src={left} alt="left" style={leftImageStyle} />
      
      <img src={right} alt="Right" style={rightImageStyle} /> */}
      <Background/>
      <div>
        <img src={logo} alt="Home" style={imageStyle} />
      </div>
      <div>
        <span style={textStyle}>
          {splitText(typeEffect)}
        </span>
        <span style={{ color: '#EF4346', fontSize: '24px' }}>
          <Cursor />
        </span>
      </div>
      <p style={{
        fontWeight: '500',
        fontSize: '20px',
        margin: '0 auto',
        width: '80%',
        maxWidth: '800px',
        textAlign: 'center',
        margin: '35px auto 35px',
        display: 'inline-block',
        color: '#4B4949'
      }}>
        Une plateforme complète pour tous vos besoins de recherche scientifique,
        assurant la sûreté et la rapidité la fiabilité et la lisibilité des données
        et la sécurité et la facilité d'utilisation.
      </p>
      <Button variant='outline' borderRadius={50}><Link to="/registration">
        Commencer maintenant avec{' '}
        <span style={{ color: '#4D6466' }}>Smart</span>
        <span style={{ color: '#EF4346' }}>Quest</span></Link>
      </Button>

      <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '35px auto',
      width: '80%',
      maxWidth: '800px',
      color: '#4D6466',
      textAlign: 'center',
      fontSize: '15px',
      fontWeight: '500'
    }}>
      <p style={{ margin: '0' }}>
        J'ai déjà un compte
      </p>
      <Link to="/login" style={{ marginLeft: '6px' }}>
        <button style={{ color: '#EF4346' }}>se connecter</button>
      </Link>
    </div>
    </div>
  );
}

export default Home;
