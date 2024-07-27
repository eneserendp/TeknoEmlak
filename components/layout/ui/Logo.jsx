import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2"> {/* Flex düzeni ve boşluk */}
       <Image src="/images/logoQR4.png" width={100} height={40}  />
      <span className="text-[2rem] font-dancing font-bold cursor-pointer">
        Demirpolat Emlak
      </span>
    </Link>
  );
};

export default Logo;
