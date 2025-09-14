
import React from 'react';

const WelcomeBanner: React.FC = () => (
  <div className="text-green-400">
    <pre className="whitespace-pre-wrap font-mono">
{`
 ▄▀▀▄ ▄▀▄  ▄▀▀▄▀▀▀▄  ▄▀▀█▄▄   ▄▀▀▀▀▄   
█  █ ▀  █ █   █   █ ▐ ▄▀   █ █     ▄▀  
▐  █    █ ▐  █▀▀█▀    █▄▄▄▀  ▐ ▄▄▀▀    
  █    █   ▄▀    █    █   █    █       
▄▀   ▄▀   █     █    ▄▀▄▄▄▀     ▀▄▄▄▄▀ 
█    █    ▐     ▐   █    ▐          ▐  
▐    ▐              ▐                                                                                                                      
`}
    </pre>
    <p>Welcome to MRBZ's Interactive Portfolio Terminal.</p>
    <p>Type <span className="text-yellow-400">'help'</span> to see a list of available commands.</p>
  </div>
);

const Help: React.FC = () => (
  <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
    <span className="text-yellow-400">help</span><span>Show this list of commands.</span>
    <span className="text-yellow-400">about</span><span>Display information about me.</span>
    <span className="text-yellow-400">skills</span><span>List my technical and design skills.</span>
    <span className="text-yellow-400">portfolio</span><span>Showcase my projects.</span>
    <span className="text-yellow-400">contact</span><span>Show my contact information.</span>
    <span className="text-yellow-400">clear</span><span>Clear the terminal screen.</span>
  </div>
);

const About: React.FC = () => (
    <div>
        <h2 className="text-xl text-cyan-400 font-bold mb-2">About MRBZ</h2>
        <p>I am a passionate and experienced Graphic and Web Designer with a keen eye for detail and a love for creating beautiful, functional digital experiences.</p>
        <p className="mt-2">With over a decade in the industry, I bridge the gap between aesthetics and usability, ensuring every project is not only visually stunning but also intuitive for the end-user.</p>
    </div>
);

const Skills: React.FC = () => (
    <div>
        <h2 className="text-xl text-cyan-400 font-bold mb-2">Core Competencies</h2>
        <ul className="list-disc list-inside">
            <li><span className="font-bold text-yellow-400">Graphic Design:</span> 15 years with Adobe Photoshop</li>
            <li><span className="font-bold text-yellow-400">Vector Art:</span> 9 years with Adobe Illustrator</li>
            <li><span className="font-bold text-yellow-400">Web Development:</span> 13 years with WordPress</li>
            <li><span className="font-bold">UI/UX Design:</span> Crafting user-centric interfaces.</li>
            <li><span className="font-bold">Branding:</span> Developing strong brand identities.</li>
            <li><span className="font-bold">Frontend Tech:</span> Proficient in HTML, CSS, and modern JavaScript.</li>
        </ul>
    </div>
);

const Portfolio: React.FC = () => (
    <div>
        <h2 className="text-xl text-cyan-400 font-bold mb-2">Project Showcase</h2>
        <div className="space-y-3">
            <div>
                <h3 className="font-bold text-yellow-400">Project Alpha - Corporate Rebranding</h3>
                <p>A complete visual overhaul for a tech startup, including a new logo, brand guidelines, and a WordPress-powered marketing site. Resulted in a 40% increase in user engagement.</p>
            </div>
            <div>
                <h3 className="font-bold text-yellow-400">Project Beta - E-commerce Platform</h3>
                <p>Designed and developed a custom WooCommerce theme for a boutique fashion retailer, focusing on a mobile-first, visually rich shopping experience.</p>
            </div>
            <div>
                <h3 className="font-bold text-yellow-400">Project Gamma - Digital Art Series</h3>
                <p>A personal project consisting of a series of intricate illustrations created in Photoshop and Illustrator, showcased on a minimalist portfolio website.</p>
            </div>
        </div>
    </div>
);


const Contact: React.FC = () => (
  <div>
      <h2 className="text-xl text-cyan-400 font-bold mb-2">Get In Touch</h2>
      <p>Email: <a href="mailto:hello@mrbz.dev" className="text-green-400 underline">hello@mrbz.dev</a></p>
      <p>LinkedIn: <a href="#" target="_blank" rel="noopener noreferrer" className="text-green-400 underline">linkedin.com/in/mrbz</a></p>
      <p>GitHub: <a href="#" target="_blank" rel="noopener noreferrer" className="text-green-400 underline">github.com/misterbuzzee</a></p>
  </div>
);


export const getCommandOutput = (command: string): React.ReactNode => {
  switch (command.toLowerCase().trim()) {
    case 'help':
      return <Help />;
    case 'about':
        return <About />;
    case 'skills':
        return <Skills />;
    case 'portfolio':
        return <Portfolio />;
    case 'contact':
        return <Contact />;
    case 'welcome':
      return <WelcomeBanner />;
    case '':
      return null;
    default:
      return <span>Command not found: '{command}'. Type 'help' for a list of commands.</span>;
  }
};

export const initialHistory = [
  { command: 'welcome', output: <WelcomeBanner /> },
];
