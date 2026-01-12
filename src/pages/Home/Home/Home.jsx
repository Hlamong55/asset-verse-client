import React from 'react';
import Banner from '../Banner/Banner';
import About from '../About/About';
import Feature from '../Feature/Feature';
import Testimonials from '../Testimonials/Testimonials';
import FAQ from '../FAQ/FAQ';
import ContactCTA from '../ContactCTA/ContactCTA';
import PackagesSection from '../Packages/PackagesSection';
import Newsletter from '../NewsLetter/Newsletter';

const testimonialsPromise = fetch('/testimonials.json').then(res => res.json());

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <div className="w-full h-[px] bg-gray-900 my-1"></div>
            <PackagesSection></PackagesSection>
            <Feature></Feature>
            <Testimonials testimonialsPromise={testimonialsPromise}></Testimonials>
            <div className="w-full h-[px] bg-gray-900 my-1"></div>
            <Newsletter></Newsletter>
            <FAQ></FAQ>
            <ContactCTA></ContactCTA>
        </div>
    );
};

export default Home;