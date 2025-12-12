import React from 'react';
import Banner from '../Banner/Banner';
import About from '../About/About';
import Feature from '../Feature/Feature';
import Testimonials from '../Testimonials/Testimonials';

const testimonialsPromise = fetch('/testimonials.json').then(res => res.json());

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <Feature></Feature>
            <Testimonials testimonialsPromise={testimonialsPromise}></Testimonials>
        </div>
    );
};

export default Home;