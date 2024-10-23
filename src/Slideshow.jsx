import React, { useState } from 'react';
import './Slideshow.css';  // Import file CSS
import { FaRandom, FaExpandArrowsAlt } from 'react-icons/fa';  // Import các icon

const Slideshow = () => {
  // Tạo mảng chứa 50 ảnh với kích thước 500x300
  const images = [];
  for (let i = 0; i < 50; i++) {
    images.push(`https://picsum.photos/500/300?image=${i}`);
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageSize, setImageSize] = useState({ width: 500, height: 300 });  // Quản lý trạng thái kích thước ảnh
  const [previewImage, setPreviewImage] = useState(null); // Quản lý ảnh thumbnail
  const [previewPosition, setPreviewPosition] = useState({ top: 0, left: 0 }); // Quản lý vị trí thumbnail

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToStart = () => {
    setCurrentIndex(0);
  };

  const randomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentIndex(randomIndex);
  };

  const changeImageSize = () => {
    setImageSize((prevSize) => {
      if (prevSize.width === 500) {
        return { width: 700, height: 400 };  // Phóng to
      } else {
        return { width: 500, height: 300 };  // Thu nhỏ lại
      }
    });
  };

  // Hàm để hiển thị thumbnail
  const showThumbnail = (index, position) => {
    setPreviewImage(images[index]);
    setPreviewPosition(position); // Cập nhật vị trí thumbnail
  };

  // Hàm để ẩn thumbnail
  const hideThumbnail = () => {
    setPreviewImage(null);
  };

  return (
    <div className="slideshow-container">
      <div className="image-container">
        <img
          src={`https://picsum.photos/${imageSize.width}/${imageSize.height}?image=${currentIndex}`}
          alt="Slideshow"
        />
        <div className="top-buttons">
          <button className="random-button" onClick={randomImage}>
            <FaRandom size={20} /> {/* Sử dụng icon cho nút Random */}
          </button>
          <button className="resize-button" onClick={changeImageSize}>
            <FaExpandArrowsAlt size={20} /> {/* Sử dụng icon cho nút Thay đổi kích thước */}
          </button>
        </div>
      </div>

      <div className="slideshow-controls">
        <button 
          onMouseEnter={() => showThumbnail(currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1, { top: '60px', left: '10px' })} 
          onMouseLeave={hideThumbnail}
          onClick={() => setCurrentIndex(currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1)}
        >
          Prev
        </button>
        <button onClick={goToStart} className="start-button">Back to Start</button>
        <button 
          onMouseEnter={() => showThumbnail((currentIndex + 1) % images.length, { top: '60px', left: '10px' })} 
          onMouseLeave={hideThumbnail}
          onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
        >
          Next
        </button>
      </div>

      <p className="slideshow-indicator">
        Image {currentIndex + 1} of {images.length}
      </p>

      {/* Thumbnail hiển thị ảnh */}
      {previewImage && (
        <div className="thumbnail-container" style={{ top: previewPosition.top, left: previewPosition.left }}>
          <img src={previewImage} alt="Thumbnail" className="thumbnail-image" />
        </div>
      )}
    </div>
  );
};

export default Slideshow;
