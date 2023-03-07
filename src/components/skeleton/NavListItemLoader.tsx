import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonNavListItemLoader = ({ ...rest }) => (
  <ContentLoader
    height="250"
    width="100%"
    viewBox="0 0 265 230"
    backgroundColor="#F5F5F5"
    backgroundOpacity={0.85}
    {...rest}
  >
    <rect x="5" y="0" rx="4" ry="4" width="100%" height="50" />
    <rect x="5" y="60" rx="2" ry="2" width="100%" height="50" />
    <rect x="5" y="120" rx="2" ry="2" width="100%" height="50" />
  </ContentLoader>
);

export default SkeletonNavListItemLoader;
