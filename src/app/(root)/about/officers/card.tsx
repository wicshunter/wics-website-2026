import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Mail } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  major: string;
  imageUrl: string;
  linkedin: string;
  github: string;
  email: string;
}

const OfficerCard: React.FC<CardProps> = ({
  title,
  description,
  major,
  imageUrl,
  linkedin,
  github,
  email,
}) => {
  return (
    <div className="relative flex flex-col w-[45%] h-80 rounded-lg text-center mb-10 shadow-card">
      {/* Background gradients */}
      <span className="absolute inset-0 w-[101%] h-[101%] bg-gradient-to-r from-[#ec4899] to-[#f472b6] rounded-lg blur-lg opacity-25 transition-opacity group-hover:opacity-40"></span>
      <span className="absolute inset-0 w-[98%] h-full bg-white/50 backdrop-blur-sm rounded-lg"></span>

      {/* Image */}
      <Image
        src={imageUrl}
        alt={`${title} headshot`}
        width={300}
        height={300}
        className="z-10 w-32 h-32 rounded-full object-cover shadow-card mx-auto mt-4"
        style={{ imageOrientation: 'from-image' }}
      />

      {/* Content */}
      <div className="z-10 mt-3">
        <h2 className="text-xl font-bold text-black">{title}</h2>
        <p className="mt-2 text-sm font-normal text-[#f9679d]">{description}</p>
        <p className="mt-1 text-sm font-normal text-[#4B5563]">{major}</p>

        {/* Links */}
        <div className="flex justify-center mt-3 space-x-4">
          <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
            <Mail className="w-6 h-6 hover:scale-150 hover:text-hotpink transition-transform duration-300" />
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faLinkedin}
              className="w-6 h-6 hover:scale-150 hover:text-hotpink transition-transform duration-300"
            />
          </a>
          <a href={github} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faGithub}
              className="w-6 h-6 hover:scale-150 hover:text-hotpink transition-transform duration-300"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default OfficerCard;
