import React from 'react';
import Banner from '../Banner/Banner';
import About from '../About/About';
import Feature from '../Feature/Feature';
import Testimonials from '../Testimonials/Testimonials';
import FAQ from '../FAQ/FAQ';

const testimonialsPromise = fetch('/testimonials.json').then(res => res.json());

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <Feature></Feature>
            <Testimonials testimonialsPromise={testimonialsPromise}></Testimonials>
          <div className="w-full h-[px] bg-linear-to-r from-transparent via-gray-800 to-transparent my-1"></div>


            <FAQ></FAQ>
        </div>
    );
};

export default Home;