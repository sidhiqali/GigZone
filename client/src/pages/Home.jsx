import React, { lazy, Suspense } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { cards, projects } from '../constants/data';
import Loader from '../components/Loader';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../utils/newRequest';
import qs from 'qs';
const TrustLogos = lazy(() => import('../components/trustLogos'));
const CardSlider = lazy(() => import('../components/CardSlider'));
const CategoryCard = lazy(() => import('../components/CategoryCard'));
const CategorySection = lazy(() => import('../components/CategorySection'));
const Feature = lazy(() => import('../components/Feature'));
const ProjectCard = lazy(() => import('../components/ProjectCard'));

const Home = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['gigData'],
    queryFn: () => {
      return newRequest(`/gigs`).then((res) => res.data);
    },
  });
  console.log(data);
  return (
    <div className='min-h-[calc(100vh-140px)]'>
      <Suspense
        fallback={
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        }
      >
        <Feature />
        <TrustLogos />
        <CardSlider>
          {cards.map((card, index) => {
            return <CategoryCard key={index} card={card} />;
          })}
        </CardSlider>
        <CategorySection />

        {isLoading ? (
          <Loader />
        ) : error ? (
          'something went wrong '
        ) : (
          <CardSlider>
            {data.map((project, index) => {
              return <ProjectCard key={index} project={project} />;
            })}
          </CardSlider>
        )}
      </Suspense>
    </div>
  );
};

export default Home;
