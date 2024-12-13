import { Link } from 'react-router-dom';
import './Home.css'
export default function Home() {
    return (
        <>
        <div className="maincontent">
            <h1>Welcome to Campus Connect</h1>
            <h3>Your gateway to knowledge, resources, and community.</h3>
            <div className="maincontentbtn">
                <button><Link to="/contactus">Join Us</Link></button>
                <button><Link to="/aboutus">Learn More</Link></button>
            
            </div>
        </div> 
         {/* <div className="explore">
            <h3>Explore Campus</h3>
            <div className="explorecardsection">
                <div className="explorecards">
                    <img src="" alt="" />
                    <h5>Resource Libaray</h5>
                    <p>Access notes, past papers, and study materials for all your courses.</p>
                </div>
                <div className="explorecards">
                    <img src="" alt="" />
                    <h5>Job Board</h5>
                    <p>Explore job openings, internships, and career advice from industry experts.</p>
                </div>
                <div className="explorecards">
                    <img src="" alt="" />
                    <h5>Project Showcase</h5>
                    <p>Discover and showcase innovative student projects from various disciplines.</p>
                </div>
                
               
            </div>
        </div>
        <div className="project">
            <h3>Featured Projects</h3>
            <div className="projectcardsection">
                <div className="projectcards">
                    <img src="" alt="" />
                    <h5>Autonomous Robot</h5>
                    <p>Access notes, past papers, and study materials for all your courses.</p>
                </div>
                <div className="projectcards">
                    <img src="" alt="" />
                    <h5>Campus Navigator App</h5>
                    <p>Explore job openings, internships, and career advice from industry experts.</p>
                </div>
                <div className="projectcards">
                    <img src="" alt="" />
                    <h5>Green Campus Initiative</h5>
                    <p>Discover and showcase innovative student projects from various disciplines.</p>
                </div>
                
                
            </div>
        </div>  */}
        </>
    );
}
