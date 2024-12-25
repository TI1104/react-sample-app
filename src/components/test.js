import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './snow.css';
const Test = () => {
  const navigate = useNavigate();
  const treeImageSrc = '/first_tree1.png';
  const backgroundImageSrc = '/OIP.jpg';
  const characterImageSrcs = [
    '/chara.png',
    '/chara2.png',
    '/chara3.png',
    '/Vtuber1.png',
    '/Vtuber2.png',
  ];
  const [selectedTree, setSelectedTree] = useState(null);
  const [hoveredTree, setHoveredTree] = useState(null);
  useEffect(() => {
    const snowContainer = document.querySelector('.snow-container');
    if (!snowContainer) return;
    snowContainer.innerHTML = '';
    const numberOfSnowflakes = 50;
    for (let i = 0; i < numberOfSnowflakes; i++) {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      snowflake.style.left = `${Math.random() * 100}vw`;
      snowflake.style.top = `-13px`;
      snowflake.style.animationDuration = `${Math.random() * 6 + 4}s`;
      snowflake.style.animationDelay = `${Math.random() * 5}s`;
      snowflake.style.setProperty('--random-x', `${Math.random() * 20 - 10}vw`);
      snowContainer.appendChild(snowflake);
    }
    return () => {
      if (snowContainer) {
        snowContainer.innerHTML = '';
      }
    };
  }, []);
  const handleTreeClick = (index, event) => {
    setSelectedTree(index);
  };
  const handleBackgroundClick = (event) => {
    if (event.target.className === 'snow-container' || event.target.tagName === 'DIV') {
      setSelectedTree(null);
    }
  };
  const handleMouseEnter = (index) => {
    setHoveredTree(index);
  };
  const handleMouseLeave = () => {
    setHoveredTree(null);
  };
  const handlePushTree = (index) => {
    navigate('/tree-detail', {
      state: {
        tree: {
          name: `クリスマスツリー${index + 1}`,
          image: treeImageSrc
        }
      }
    });
  };
  return (
    <div
      style={{ ...styles.outerContainer, backgroundImage: `url(${backgroundImageSrc})` }}
      onClick={handleBackgroundClick}
    >
      <div className="snow-container" style={styles.snowContainer}></div>
      <div style={styles.innerContainer}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            style={styles.treeContainer}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={characterImageSrcs[index]}
              alt={`Character ${index + 1}`}
              style={
                selectedTree === null
                  ? hoveredTree === index
                    ? { ...styles.characterImage, ...styles.characterHover }
                    : styles.characterImage
                  : { ...styles.characterImage, ...styles.hiddenImage }
              }
            />
            <img
              src={treeImageSrc}
              alt={`Christmas Tree ${index + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                handleTreeClick(index, e);
              }}
              style={
                selectedTree === null
                  ? styles.image
                  : { ...styles.hiddenImage, ...styles.image }
              }
            />
            {selectedTree === index && (
              <>
                <img
                  src={characterImageSrcs[index]}
                  alt={`Selected Character ${index + 1}`}
                  style={styles.selectedCharacterImage}
                />
                <img
                  src={treeImageSrc}
                  alt={`Selected Tree ${index + 1}`}
                  style={styles.selectedImage}
                />
                <button
                  style={styles.button}
                  onClick={() => handlePushTree(index)}
                >
                  この木を推す！！
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
const styles = {
  outerContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '100vh',
    width: 'calc(7 * 150px + 4 * 750px)',
    backgroundColor: '#F7F7F7',
    paddingBottom: '0px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  snowContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: 1,
  },
  innerContainer: {
    display: 'flex',
    gap: '750px',
    position: 'relative',
    zIndex: 2,
    width: 'calc(5 * 150px + 4 * 750px)',
    paddingLeft: '150px',
    paddingRight: '150px',
    margin: '0 auto',
  },
  treeContainer: {
    position: 'relative',
    textAlign: 'center',
  },
  characterImage: {
    width: '100px',
    height: 'auto',
    position: 'absolute',
    top: '-120px',
    left: '50%',
    transform: 'translateX(-50%)',
    transition: 'transform 0.5s ease',
  },
  characterHover: {
    animation: 'shake 0.6s ease-in-out infinite',
  },
  image: {
    width: '150px',
    height: 'auto',
    cursor: 'pointer',
    transition: 'transform 0.5s ease',
  },
  selectedImage: {
    width: '400px',
    height: 'auto',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 3,
    transition: 'transform 0.5s ease',
  },
  hiddenImage: {
    width: '150px',
    height: 'auto',
    opacity: 0,
    pointerEvents: 'none',
    transform: 'translateX(-100vw)',
    transition: 'transform 0.5s ease, opacity 0.5s ease',
  },
  selectedCharacterImage: {
    width: '250px',
    height: 'auto',
    position: 'fixed',
    top: '40%',
    left: '70%',
    transform: 'translateX(-50%)',
    zIndex: 4,
    transition: 'transform 0.5s ease',
  },
  button: {
    position: 'fixed',
    top: '80%',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    zIndex: 5,
    fontSize: '32px',
  },
};
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes shake {
    0% { transform: translateX(-50%) rotate(-5deg); }
    25% { transform: translateX(-50%) rotate(5deg); }
    50% { transform: translateX(-50%) rotate(-5deg); }
    75% { transform: translateX(-50%) rotate(5deg); }
    100% { transform: translateX(-50%) rotate(0deg); }
  }
`, styleSheet.cssRules.length);
export default Test;