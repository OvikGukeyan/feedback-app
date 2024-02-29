import React from 'react';
import ContentLoader from 'react-content-loader';
import { useLocation } from 'react-router-dom';


const ItemLoader: React.FC = () => {
  const location = useLocation();
  const display = window.innerWidth;
  let width = 757;
  let hight = 183;
  if (location.pathname.includes('detail') ) {
    width = 730
  } else 
  if (
    display < 767
  ) {
    hight = 237
    width = display - 30
  } else if (
    display < 1000
  ) {
    width = display - 60
  }

  return (
    <ContentLoader
      speed={2}
      width={width}
      height={hight}
      viewBox={`0 0 ${width} ${hight}`}
      backgroundColor="#ffffff"
      foregroundColor="#e0e0e0"
    >
      <rect x="" y="25" rx="10" ry="10" width={width} height={hight} />
    </ContentLoader>
  )
}

export default ItemLoader;