import React from 'react';
import TrustLogos from '../components/trustLogos';
import CardSlider from '../components/CardSlider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CategoryCard from '../components/CategoryCard';
import { cards, projects } from '../constants/data';
import CategorySection from '../components/CategorySection';
import Feature from '../components/Feature';
import ProjectCard from '../components/ProjectCard';
const Home = () => {
  return (
    <div className=''>
      <Feature />
      <TrustLogos />
      <CardSlider>
        {cards.map((card, index) => {
          return <CategoryCard key={index} card={card} />;
        })}
      </CardSlider>
      <CategorySection />

      <CardSlider>
        {projects.map((project, index) => {
          return <ProjectCard key={index} project={project} />;
        })}
      </CardSlider>
    </div>
  );
};

export default Home;
