import React, { useState } from 'react';

import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

const ControlledCarousel = (props) => {
  const [index, setIndex] = useState(0);
  const { images } = props;

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />}
      nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}
      interval={null}
    >
      {images.map((image, key) => {
        const {
          thumbnails: {
            full: { url }
          }
        } = image;
        return (
          <Carousel.Item style={{textAlign: 'center'}}>
            <Image alt={`Image ${key}`} src={url} fluid />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export { ControlledCarousel };
