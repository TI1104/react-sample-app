import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Confetti from "react-confetti";

const TreeDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tree = location.state?.tree;
  const [pushCount, setPushCount] = useState(0);
  const [currentImage, setCurrentImage] = useState(tree?.image || '');
  const [decorations, setDecorations] = useState([]);
  const [uiElements, setUiElements] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiDimensions, setConfettiDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Redirect if no tree data
  useEffect(() => {
    if (!tree) {
      navigate('/', { replace: true });
    }
  }, [tree, navigate]);

  // Handle window resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setConfettiDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const treeImages = [
    "/first_tree1.png",
    "/change_tree1.png",
    "/change_tree2.png",
  ];

  const decorationImages = [
    "/decoration1.png",
    "/decoration2.png",
    "/decoration3.png",
    "/decoration4.png",
    "/decoration5.png",
    "/decoration6.png",
    "/decoration7.png",
    "/decoration8.png",
    "/decoration9.png",
    "/decoration10.png",
    "/decoration11.png",
    "/decoration12.png",
    "/decoration13.png",
    "/decoration14.png",
  ];

  useEffect(() => {
    const elements = [
      { top: 4, left: 4, width: 120, height: 40 },
      { top: window.innerHeight / 2 - 64, left: window.innerWidth / 2 - 32, width: 64, height: 64 },
      { top: window.innerHeight / 2 + 100, left: window.innerWidth / 2 - 100, width: 200, height: 50 },
      { top: 20, left: 20, width: 250, height: 50 },
    ];
    setUiElements(elements);
  }, []);

  const getRandomPosition = (imageWidth, imageHeight) => {
    const minX = 0;
    const minY = 0;
    const maxX = window.innerWidth - imageWidth;
    const maxY = window.innerHeight - imageHeight;
    let randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    let randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    for (let i = 0; i < uiElements.length; i++) {
      const element = uiElements[i];
      if (
        randomX < element.left + element.width &&
        randomX + imageWidth > element.left &&
        randomY < element.top + element.height &&
        randomY + imageHeight > element.top
      ) {
        return getRandomPosition(imageWidth, imageHeight);
      }
    }
    return { x: randomX, y: randomY };
  };

  const handlePush = () => {
    // Audio setup
    let PushAudio = new Audio('/button.mp3');
    let PushAudioDiv = new Audio('/tada-fan.mp3');
    let PushAudioCat = new Audio('/cat-meow.mp3');
    let PushAudioBells = new Audio('/christmas-bells.mp3');
    const newCount = pushCount + 1;
    setPushCount(newCount);

    // Play appropriate sound and show confetti based on push count
    if (newCount === 15) {
      PushAudioCat.play();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } else if (newCount === 20) {
      PushAudioBells.play();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } else if (newCount % 5 === 0) {
      PushAudioDiv.play();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } else {
      PushAudio.play();
    }

    // Update tree image
    if (newCount <= 10 && newCount % 5 === 0) {
      const nextImageIndex = newCount / 5;
      if (treeImages[nextImageIndex]) {
        setCurrentImage(treeImages[nextImageIndex]);
      }
    }

    // Add decorations
    if (newCount >= 15 && newCount % 5 === 0) {
      const decorationIndex = Math.floor(Math.random() * decorationImages.length);
      const imageWidth = 100;
      const imageHeight = 100;
      const { x, y } = getRandomPosition(imageWidth, imageHeight);
      setDecorations([
        ...decorations,
        { src: decorationImages[decorationIndex], x, y, width: imageWidth, height: imageHeight },
      ]);
    }
  };

  if (!tree) {
    return null;
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/house.jpg')" }}
    >
      {showConfetti && (
        <Confetti
          numberOfPieces={300}
          width={confettiDimensions.width}
          height={confettiDimensions.height}
          colors={["#FF0000", "#00FF00", "#0000FF"]}
        />
      )}
      {decorations.map((decoration, index) => (
        <img
          key={index}
          src={decoration.src}
          alt={`Decoration ${index + 1}`}
          className="absolute"
          style={{
            top: decoration.y,
            left: decoration.x,
            width: decoration.width,
            height: decoration.height,
            zIndex: 1,
          }}
        />
      ))}
      <div className="absolute top-4 left-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => navigate(-1)}
        >
          ホームに戻る
        </button>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white px-4 py-0.1 rounded-full text-black">
            {pushCount} 回
          </div>
          <img src={currentImage} alt={tree.name} className="w-64 h-64 mb-4" />
        </div>
        <div className="flex items-center mb-4">
          <img src="/chara.png" alt="Icon" className="w-16 h-16 mr-4" />
          <h1 className="text-3xl font-bold">紅葉なつき</h1> {/* 木の名前を固定 */}
        </div>
        <button
          onClick={handlePush}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700"
        >
          推す
        </button>
      </div>
    </div>
  );
};

export default TreeDetailPage;
