import React from 'react';
import { GlobeLoader } from 'components/styles/Images'
import { LoaderBackground } from 'components/styles/Containers';
import globe from '../../images/173986775earth-spinning-rotating-animation-15-2.gif'

export const Loader = () => {
  return (
    <LoaderBackground>
      <GlobeLoader
        src={globe}
        alt="globe loader" />
    </LoaderBackground>
  );
}