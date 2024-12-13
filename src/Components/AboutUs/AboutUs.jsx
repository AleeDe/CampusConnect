import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="aboutUsContainer">
      <header className="aboutUsHero">
        <h1>About Campus Connect</h1>
        <p className="aboutUsTagline">Bridging gaps, connecting futures</p>
      </header>
      
      <section className="aboutUsOriginStory">
        <h2>Our Origin Story</h2>
        <div className="aboutUsStoryContent">
          <p>
            Campus Connect was born from a university project on Object-Oriented Programming (OOP). As students, we identified several challenges our peers face:
          </p>
          <ul className="aboutUsChallengesList">
            <li>Difficulty accessing notes and past papers</li>
            <li>Lack of connection with seniors and alumni</li>
            <li>Limited awareness of upcoming events</li>
            <li>Insufficient access to tech news, job opportunities, and internships</li>
          </ul>
          <p>
            Inspired by these challenges, we envisioned a platform to bridge these gaps and create a more connected campus community. Thus, Campus Connect came into existence.
          </p>
          <p>
            While our website is in its initial stages, we see this as just the beginning. We are committed to continuous improvement and look forward to introducing more updates and features in the future.
          </p>
        </div>
      </section>
      
      <section className="aboutUsTeamSection">
        <h2>Meet Our Team</h2>
        <div className="aboutUsTeamGrid">
          <div className="aboutUsTeamMember">
            <div className="aboutUsMemberPhoto" style={{backgroundImage: "url('https://img.freepik.com/premium-vector/young-man-face-avater-vector-illustration-design_968209-15.jpg?ga=GA1.1.1905367760.1733826404&semt=ais_hybrid')"}}></div>
            <h3>Muhammad Ali</h3>
            <p>Team Lead</p>
          </div>
          <div className="aboutUsTeamMember">
            <div className="aboutUsMemberPhoto" style={{backgroundImage: "url('https://img.freepik.com/free-vector/mysterious-mafia-man-wearing-hat_52683-34829.jpg?ga=GA1.1.1905367760.1733826404&semt=ais_hybrid"}}></div>
            <h3>Shareer</h3>
            <p>Designer, Developer, and Backbone</p>
          </div>
          <div className="aboutUsTeamMember">
            <div className="aboutUsMemberPhoto" style={{backgroundImage: "url('https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?ga=GA1.1.1905367760.1733826404&semt=ais_hybrid"}}></div>
            <h3>Muzzam</h3>
            <p>Idea Catcher and Supporter</p>
          </div>
          <div className="aboutUsTeamMember">
            <div className="aboutUsMemberPhoto" style={{backgroundImage: "url('https://img.freepik.com/free-vector/young-man-with-glasses-avatar_1308-175763.jpg?ga=GA1.1.1905367760.1733826404&semt=ais_hybrid"}}></div>
            <h3>Abdullah</h3>
            <p>Idea Catcher and Supporter</p>
          </div>
        </div>
      </section>
      
      <section className="aboutUsVision">
        <h2>Our Vision</h2>
        <p>
          At Campus Connect, we strive to create a comprehensive platform that enhances the university experience for all students. By providing easy access to resources, fostering connections, and keeping our community informed, we aim to empower students to make the most of their academic journey.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
