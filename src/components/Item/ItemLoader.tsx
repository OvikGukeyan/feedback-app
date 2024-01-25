import React from 'react';
import ContentLoader from 'react-content-loader';

const ItemLoader: React.FC = () => {
  return (
    <ContentLoader 
    speed={2}
    width={832}
    height={183}
    viewBox="0 0 832 183"
    backgroundColor="#ffffff"
    foregroundColor="#e0e0e0"
  >
    <rect x="650" y="273" rx="0" ry="0" width="445" height="343" /> 
    <rect x="0" y="25" rx="10" ry="10" width="832" height="158" />
  </ContentLoader>
  )
}

export default ItemLoader;