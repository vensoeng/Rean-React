import React from 'react';
import '../../assets/css/Marquee.css';

const ProjectBackground = () => {
  const list1 = [
    "Student Management System",
    "Static Website Project",
    "E-Library Management System",
    "Pagoda Management System",
    "E-Portfolio Website",
    "NGConvertor",
    "NGAlert",
    "zuAcar",
    "zuAhouse",
    "LuAcar",
  ];

  const list2 = [
    "Pagoda Management System",
    "E-commerce Website",
  ];

  // Helper component to prevent repeating markup
  const RenderList = ({ items }) => (
    <ul className="df-c">
      {items.map((item, index) => (
        <li key={index} className="df-c">
          <blockquote>
            <p>{item}</p>
          </blockquote>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="rn-con">
      {/* Track 1: First set of projects */}
      <div className="rncon-track">
        <div className="rncon-cn">
          <RenderList items={list1} />
          {/* Duplicated for seamless loop */}
          <RenderList items={list1} />
        </div>
      </div>

      {/* Track 2: Second set of projects */}
      <div className="rncon-track">
        <div className="rncon-cn">
          <RenderList items={list2} />
          {/* Duplicated for seamless loop */}
          <RenderList items={list2} />
        </div>
      </div>
    </div>
  );
};

export default ProjectBackground;