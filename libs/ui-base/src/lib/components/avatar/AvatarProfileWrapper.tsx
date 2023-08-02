import dynamic from 'next/dynamic';
import { forwardRef } from 'react';

import { AvatarProfileProps } from './AvatarProfile';

const AvatarProfileComponent = dynamic(() => import('./AvatarProfile'), {
  ssr: false,
  loading: () => <>Loading...</>,
});

const AvatarProfile = forwardRef<HTMLDivElement, AvatarProfileProps>((props) => {
  return <AvatarProfileComponent {...props} />;
});

export default AvatarProfile;
