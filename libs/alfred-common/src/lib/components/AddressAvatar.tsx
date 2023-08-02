import jazzicon from '@metamask/jazzicon';
import { useEffect } from 'react';
import Box from '@mui/material/Box';

interface AddressAvatarProps {
  address: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'rounded' | 'rect' | 'circle';
}

const charMapper = (function getCharMapper() {
  const chars: any = {};
  String('abcdefghijklmnopqrstuvwxyz')
    .split('')
    .forEach((char, _index) => {
      chars[char] = _index + 1;
    });
  return chars;
})();

function is_numeric(str: any) {
  return /^\d+$/.test(str);
}

function toHexSum(hex: string) {
  let hexSum = 0;
  if (hex) {
    for (const i of hex) {
      if (is_numeric(i)) {
        hexSum += Number(i);
      } else {
        hexSum += charMapper[i.toLowerCase()];
      }
    }
  }
  return hexSum;
}

export default function AddressAvatar({
  address,
  size = 'sm',
  variant = 'rounded',
}: AddressAvatarProps) {
  const rand = Math.floor(Math.random() * 100);
  function generate() {
    const root = document.getElementById(`${address}-icon-${rand}`);

    if (root) {
      root.innerHTML = '';
      const el = jazzicon(getSize().height, Math.round(toHexSum(address) * 10000));
      root.appendChild(el);
    }
  }

  useEffect(() => {
    generate();
  }, [address, size, variant]);

  function getSize() {
    switch (size) {
      case 'sm':
        return { height: 24, width: 24 };
      case 'md':
        return { height: 36, width: 36 };
      case 'lg':
        return { height: 48, width: 48 };
      case 'xl':
        return { height: 64, width: 64 };
      default:
        return { height: 24, width: 24 };
    }
  }

  function getBorder() {
    switch (variant) {
      case 'rounded':
        return { borderRadius: 1 };
      case 'rect':
        return { borderRadius: 0 };
      case 'circle':
        return { borderRadius: '50%' };
      default:
        return { borderRadius: 0 };
    }
  }

  return <Box id={`${address}-icon-${rand}`} sx={{ ...getSize(), ...getBorder() }}></Box>;
}
