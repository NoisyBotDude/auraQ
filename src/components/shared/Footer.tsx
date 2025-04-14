import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord } from 'react-icons/fa';
const GithubIcon = FaGithub as React.FC<React.SVGProps<SVGSVGElement>>;
const TwitterIcon = FaTwitter as React.FC<React.SVGProps<SVGSVGElement>>;
const LinkedInIcon = FaLinkedin as React.FC<React.SVGProps<SVGSVGElement>>;
const DiscordIcon = FaDiscord as React.FC<React.SVGProps<SVGSVGElement>>;

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: GithubIcon, url: 'https://github.com', label: 'GitHub' },
    { icon: TwitterIcon, url: 'https://twitter.com', label: 'Twitter' },
    { icon: LinkedInIcon, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: DiscordIcon, url: 'https://discord.com', label: 'Discord' },
  ];

  

  return (
    <footer className="bg-[#1c1f2e]/80 backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899]">
              AuraQ
            </h3>
            <p className="text-gray-400 mt-2">Explore the universe of knowledge</p>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map(({ icon: Icon, url, label }) => (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300 relative group"
                whileHover={{ y: -2 }}
              >
                <Icon className="w-6 h-6" />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-[#1c1f2e] text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {label}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1]/20 via-[#8b5cf6]/20 to-[#ec4899]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} AuraQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 