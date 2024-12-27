import React from 'react';
import Slider from '../components/Slider';
import Stats from '../components/Stats';
import LanguageCategories from '../components/LanguageCategories';
import InspireStories from '../components/InspireStories';
import OneMinuteLessons from '../components/OneMinuteLessons';
import LanguageLeaderboard from '../components/LanguageLeaderboard ';

const HomeLayout = () => {
    return (
        <div className=''>
            <Slider></Slider>
            <div className='w-11/12 mx-auto'>
            <Stats></Stats>
            <LanguageCategories></LanguageCategories> 
            <LanguageLeaderboard></LanguageLeaderboard>
            <InspireStories></InspireStories>
            <OneMinuteLessons/>
            
            </div>
        </div>
    );
};

export default HomeLayout;