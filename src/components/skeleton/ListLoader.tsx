import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonListLoader = ({ ...rest }) => (
  <ContentLoader
    height="100%"
    width="100%"
    viewBox="0 0 265 230"
    backgroundColor="#F5F5F5"
    backgroundOpacity={0.55}
    {...rest}
  >
    <rect x="10" y="0" rx="4" ry="4" width="350" height="25" />
    <rect x="10" y="35" rx="2" ry="2" width="350" height="150" />
  </ContentLoader>
);

export default SkeletonListLoader;
