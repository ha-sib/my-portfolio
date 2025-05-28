// src/App.js
import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome icons CSS
import profilePic from './assets/profile_pic.png';


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const companyName = 'UCB Investment Limited.';
  const companyWebsite = 'https://ucb-investment.com/'; // Replace with the actual URL


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen font-inter ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        .gradient-text {
          background-image: linear-gradient(to right, #6366f1, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          transition: background-image 0.3s ease-in-out;
          padding-bottom: 0.1em;
          line-height: 1.2;
        }
        .gradient-text:hover {
          background-image: linear-gradient(to right, #4f46e5, #9333ea);
        }
        .hero-parallax-bg {
          background-image: url('https://placehold.co/1920x1080/4f46e5/ffffff/20?text=Hero+Background');
          background-attachment: fixed;
          background-position: center center;
          background-size: cover;
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 0;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.75s step-end infinite;
        }
      
      `}</style>

      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="container mx-auto px-4 py-8">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Testimonials />
        <Blog />
        <Contact />
      </main>

      <Footer darkMode={darkMode} />

      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
}

const Header = ({ darkMode, setDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textColor = isScrolled ? 'text-white' : 'text-gray-800 dark:text-gray-100';
  const hoverTextColor = isScrolled
    ? 'hover:text-violet-200'
    : 'hover:text-indigo-600 dark:hover:text-indigo-400';

  return (
    <header
      className={`py-4 px-6 md:px-8 sticky top-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? `bg-violet-600 shadow-md rounded-b-lg ${darkMode ? 'dark:bg-violet-900 dark:shadow-lg' : ''}`
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a
          href="/"
           className={`text-2xl font-serif mb-4 md:mb-0 transition-colors duration-300 ${textColor} ${hoverTextColor}`}
        >
          HRH
        </a>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-lg font-medium">
          <a href="#about" className={`${textColor} ${hoverTextColor} transition-colors duration-300`}>
            About
          </a>
          <a href="#experience" className={`${textColor} ${hoverTextColor} transition-colors duration-300`}>
            Experience
          </a>
          <a href="#skills" className={`${textColor} ${hoverTextColor} transition-colors duration-300`}>
            Skills
          </a>
          <a href="#projects" className={`${textColor} ${hoverTextColor} transition-colors duration-300`}>
            Projects
          </a>
          <a href="#testimonials" className={`${textColor} ${hoverTextColor} transition-colors duration-300`}>
            Testimonials
          </a>
          <a href="#blog" className={`${textColor} ${hoverTextColor} transition-colors duration-300`}>
            Blog
          </a>
          <a href="#contact" className={`${textColor} ${hoverTextColor} transition-colors duration-300`}>
            Contact
          </a>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? (
              <i className="fas fa-sun text-yellow-400"></i>
            ) : (
              <i className="fas fa-moon text-gray-700"></i>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

const Hero = () => {
  const professions = [ 'IT Engineer','Problem Solver', 'Researcher', 'SQA Engineer','Front-End Developer','Data Scientist',];
  const [currentProfessionIndex, setCurrentProfessionIndex] = useState(0);
  const [displayedProfession, setDisplayedProfession] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const i = currentProfessionIndex % professions.length;
      const fullProfession = professions[i];

      setDisplayedProfession(
        isDeleting
          ? fullProfession.substring(0, displayedProfession.length - 1)
          : fullProfession.substring(0, displayedProfession.length + 1)
      );

      setTypingSpeed(isDeleting ? 70 : 150);

      if (!isDeleting && displayedProfession === fullProfession) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayedProfession === '') {
        setIsDeleting(false);
        setCurrentProfessionIndex(currentProfessionIndex + 1);
      }
    };

    const typeTimeout = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(typeTimeout);
  }, [displayedProfession, isDeleting, currentProfessionIndex, professions, typingSpeed]);

  return (
    <section
      id="hero"
      className="relative flex flex-col md:flex-row items-center justify-center text-center md:text-left py-20 text-white rounded-xl shadow-lg mb-12 overflow-hidden"
    >
      {/* Parallax Background */}
      <div className="hero-parallax-bg"></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-90 rounded-xl z-0"></div>

      <div className="relative z-10 md:w-1/2 p-6 md:pl-20"> {/* This is the line that was changed */}
        {/* Profile Image with Zoom-in Effect on Hover */}
        <div className="w-49 h-49 rounded-full mx-auto md:mx-0 overflow-hidden group border-4 border-white shadow-md">
          <img
            src={profilePic}
            alt="Profile"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/200x200/cccccc/333333?text=Profile';
            }}
          />
        </div>
      </div>

      <div className="relative z-10 md:w-1/2 p-6">
        <h1 className="text-5xl font-extrabold leading-tight mb-4">
          Hi, I'm <span className="text-yellow-300">Md. Hasibur Rahman</span>
        </h1>
        <p className="text-xl mb-6">
          A passionate <span className="font-semibold">{displayedProfession}</span>
          <span className="animate-blink">|</span> dedicated to building amazing web experiences.
        </p>
        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
          <a
            href="https://drive.google.com/file/d/1GNdx1LSCs96YKtnFKKNFq1uFyLXJ7NNO/view?usp=sharing"
            download="Md. Hasibur_Rahman_CV.pdf"
            className="inline-block bg-white text-indigo-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Download Resume
          </a>
          <a
            href="#contact"
            className="inline-block bg-white text-indigo-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Let's Connect!
          </a>
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="bg-white p-8 rounded-xl shadow-lg mb-12 dark:bg-gray-800">
    <h2 className="text-4xl font-bold text-center gradient-text mb-8">About Me</h2>
    <div className="prose max-w-none text-lg leading-relaxed text-gray-800 dark:text-gray-200">
      <p className="mb-4" style={{ textAlign: 'justify' }}>
    Hello! I'm <span className="font-semibold">Md. Hasibur Rahman</span>, a Computer Science and Engineering graduate (BSc & MSc) and an IT Officer
  with hands-on experience in operational software management and vendor relations. My skills include data science, Python, machine learning, web development (HTML, CSS, React), C++, manual testing, networking, and MS 365 administration. I'm passionate about leveraging technology to drive innovation.
     </p>
      <p className="mb-4" style={{ textAlign: 'justify' }}>
        My comprehensive academic background, combined with practical experience, has equipped me to tackle diverse challenges in the tech landscape. 
        I am eager to apply my robust skill set and problem-solving abilities to contribute to a forward-thinking organization, particularly in areas where I can drive efficiency, enhance systems, or develop cutting-edge solutions.
      </p>
    </div>
    <div className="text-center mt-8">
      <a
        href="#projects"
        className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
      >
        See My Projects
      </a>
    </div>
  </section>
);

const Experience = () => {
  const experiences = [
    {
      title: 'IT Officer',
      company: {
      name: 'UCB Investment Limited.',
      link: 'https://ucb-investment.com/'
       },
      duration: 'OCT 20224 - Present',
      description: 'Managed and maintained the company’s IT infrastructure to ensure seamless daily operations. Implemented new IT solutions to improve system efficiency and security. Provided technical support to enhance productivity',
      responsibilities: [
        'Troubleshot and resolved hardware, software, and network issues promptly to minimize downtime.',
        'Assisted in setting up and maintaining computer systems, networks, and hardware.',
        'Coordinated with vendors and service providers for hardware and software maintenance.',
        'Maintained inventory of IT equipment and software licenses.',
        'Supported installation and configuration of software applications',
      ],
    },
  ];

  return (
    <section id="experience" className="bg-white p-8 rounded-xl shadow-lg mb-12 dark:bg-gray-800">
      <h2 className="text-4xl font-bold text-center gradient-text mb-8">Experience</h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark:bg-gray-700 dark:text-gray-100"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{exp.title}</h3>
            <a href={exp.company.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-300 text-lg font-semibold hover:underline">
            {exp.company.name}
            </a>
            <p className="text-gray-500 dark:text-gray-300 text-md mb-4">{exp.duration}</p>
            <p className="text-gray-700 dark:text-gray-200 mb-4">{exp.description}</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
              {exp.responsibilities.map((res, resIndex) => (
                <li key={resIndex}>{res}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    { name: 'HTML5', icon: 'fab fa-html5', color: 'text-orange-500', level: 95 },
    { name: 'CSS3', icon: 'fab fa-css3-alt', color: 'text-blue-500', level: 90 },
    { name: 'JavaScript', icon: 'fab fa-js-square', color: 'text-yellow-500', level: 70 },
    { name: 'React', icon: 'fab fa-react', color: 'text-blue-400', level: 70 },
    { name: 'Tailwind CSS', icon: 'fas fa-wind', color: 'text-teal-500', level: 70 },
    { name: 'Node.js', icon: 'fab fa-node-js', color: 'text-green-600', level: 70 },
    { name: 'Git', icon: 'fab fa-git-alt', color: 'text-red-600', level: 85 },
    { name: 'Responsive Design', icon: 'fas fa-mobile-alt', color: 'text-gray-600', level: 92 },
    { name: 'Python', icon: 'fab fa-python', color: 'text-blue-700', level: 90 },
    { name: 'Figma', icon: 'fab fa-figma', color: 'text-purple-600', level: 65 },
    { name: 'Web Scrapping', icon: 'fas fa-code', color: 'text-black', level: 90 },
    { name: 'Data Science', icon: 'fas fa-brain', color: 'text-teal-600', level: 90 },
  ];

  return (
    <section id="skills" className="bg-white p-8 rounded-xl shadow-lg mb-12 dark:bg-gray-800">
      <h2 className="text-4xl font-bold text-center gradient-text mb-8">My Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-md dark:bg-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <i className={`${skill.icon} ${skill.color} text-5xl mb-3`}></i>
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-2">{skill.name}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${skill.level}%` }}
                aria-label={`${skill.name} skill level ${skill.level}%`}
              ></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{skill.level}%</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Projects = () => {
  const allProjects = [
    {
      title: 'Project One (Web App)',
      description: 'Project One is a modern, scalable web app built with React and Tailwind CSS, featuring responsive design and seamless performance. It demonstrates my skills in front-end development, API integration, and creating user-friendly interfaces..',
      technologies: ['React', 'Tailwind CSS', 'Firebase'],
      category: 'web-app',
      imageUrl: 'https://placehold.co/400x250/a78bfa/ffffff?text=Project+1',
      liveLink: '#',
      repoLink: '#',
    },
    {
      title: 'Project Two (Mobile App)',
      description: 'An in-depth look at Project Two, showcasing complex functionalities and problem-solving.[Comming Soon]',
      technologies: ['React Native', 'Node.js', 'MongoDB'],
      category: 'mobile-app',
      imageUrl: 'https://placehold.co/400x250/818cf8/ffffff?text=Project+2',
      liveLink: '#',
      repoLink: '#',
    },
    {
      title: 'Project Three (Machine Learning)',
      description: 'This project centers on applying Machine Learning techniques to solve complex problems.I gained valuable hands-on experience with Python programming, enhancing my skills in data analysis, model building, and algorithm optimization.[Comming Soon]',
      technologies: ['Python', 'Pandas', 'NumPy'],
      category: 'design',
      imageUrl: 'https://placehold.co/400x250/6366f1/ffffff?text=Project+3',
      liveLink: '#',
      repoLink: '#',
    },
    {
      title: 'Project Four (Web App)',
      description: 'Another web application demonstrating advanced state management and API integration.[ Coming Soon]',
      technologies: ['Vue.js', 'Express.js', 'PostgreSQL'],
      category: 'web-app',
      imageUrl: 'https://placehold.co/400x250/f9a8d4/ffffff?text=Project+4',
      liveLink: '#',
      repoLink: '#',
    },
  ];

  const [filter, setFilter] = useState('all');

  const filteredProjects = allProjects.filter(project => {
    if (filter === 'all') {
      return true;
    }
    return project.category === filter;
  });

  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Web Apps', value: 'web-app' },
    { name: 'Mobile Apps', value: 'mobile-app' },
    { name: 'Design', value: 'design' },
  ];

  return (
    <section id="projects" className="bg-white p-8 rounded-xl shadow-lg mb-12 dark:bg-gray-800">
      <h2 className="text-4xl font-bold text-center gradient-text mb-8">My Projects</h2>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`py-2 px-6 rounded-full text-lg font-semibold transition-all duration-300
              ${filter === cat.value
                ? 'bg-indigo-600 text-white shadow-md transform hover:scale-105'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transform hover:scale-105'
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <div key={index} className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark:bg-gray-700">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-48 object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/cccccc/333333?text=Project"; }}
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full dark:bg-indigo-700 dark:text-indigo-100">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
                >
                  Live Demo
                </a>
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-300 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 transform hover:scale-105"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Md.Hasibur Rahman is an exceptionally talented developer. Their attention to detail and problem-solving skills are top-notch. Highly recommended!",
      author: "Jane Doe",
      title: "CTO, TechCorp",
      avatar: "https://placehold.co/80x80/6366f1/ffffff?text=JD"
    },
    {
      quote: "Working with Hasib was a pleasure. They delivered high-quality code on time and were always open to feedback. A true professional.",
      author: "John Smith",
      title: "Project Manager, Innovate Ltd.",
      avatar: "https://placehold.co/80x80/a78bfa/ffffff?text=JS"
    },
    {
      quote: "The dedication and passion Md. Hasibur Rahman brings to their work are truly inspiring. They transformed our vision into a stunning reality.",
      author: "Emily White",
      title: "Founder, Creative Solutions",
      avatar: "https://placehold.co/80x80/818cf8/ffffff?text=EW"
    },
  ];

  return (
    <section id="testimonials" className="bg-white p-8 rounded-xl shadow-lg mb-12 dark:bg-gray-800">
      <h2 className="text-4xl font-bold text-center gradient-text mb-8">Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((test, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark:bg-gray-700 flex flex-col items-center text-center">
            <img
              src={test.avatar}
              alt={test.author}
              className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-indigo-500"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/80x80/cccccc/333333?text=Avatar"; }}
            />
            <p className="text-gray-700 dark:text-gray-200 text-lg italic mb-4">"{test.quote}"</p>
            <p className="font-bold text-gray-800 dark:text-gray-100">{test.author}</p>
            <p className="text-indigo-600 dark:text-indigo-300 text-sm">{test.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Blog = () => {
  const articles = [
    {
      title: "Understanding React Hooks",
      date: "May 15, 2025",
      excerpt: "A deep dive into the most essential React Hooks and how to use them effectively in your applications.",
      link: "https://drive.google.com/file/d/1_31GI5W1Vmjzcu8lMbT2JKSzZKWWI0Nw/view?usp=drive_link"
    },
    {
      title: "Mastering Tailwind CSS for Rapid UI Development",
      date: "April 28, 2025",
      excerpt: "Tips and tricks for leveraging Tailwind CSS to build beautiful and responsive user interfaces at lightning speed.",
      link: "https://drive.google.com/file/d/1hw6ywfa2_lklVgU2UfVFmrb4YBOMbMKX/view?usp=drive_link"
    },
    {
      title: "The Future of Web Development: AI and Beyond",
      date: "April 10, 2025",
      excerpt: "Exploring the impact of artificial intelligence on web development and what the future holds for developers.",
      link: "https://drive.google.com/file/d/1BWn04KFW3kyOjyTVHKOXzP99MyTcLqBW/view?usp=sharing"
    }
  ];

  return (
    <section id="blog" className="bg-white p-8 rounded-xl shadow-lg mb-12 dark:bg-gray-800">
      <h2 className="text-4xl font-bold text-center gradient-text mb-8">My Blog & Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <a key={index} href={article.link} className="block bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark:bg-gray-700 group">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors duration-300">{article.title}</h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm mb-3">{article.excerpt}</p>
            <span className="text-indigo-600 dark:text-indigo-300 font-semibold group-hover:underline">Read More &rarr;</span>
          </a>
        ))}
      </div>
      <div className="text-center mt-8">
        <p className="text-gray-700 dark:text-gray-200">More articles coming soon!</p>
      </div>
    </section>
  );
};



const Contact = () => {
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [statusMessage, setStatusMessage] = React.useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = 'service_lfavt9u';    // Replace with your EmailJS service ID
    const templateID = 'template_kuby20q';  // Replace with your EmailJS template ID
    const userID = 'bZP-6ZX6klBeP5TAL';       // Replace with your EmailJS public key

    emailjs.send(serviceID, templateID, formData, userID)
      .then(() => {
        setStatusMessage('Message sent successfully! 🎉');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => {
        setStatusMessage('Failed to send message. Please try again.');
      });
  };

  return (
    <section id="contact" className="bg-white p-8 rounded-xl shadow-lg mb-12 dark:bg-gray-800">
      <h2 className="text-4xl font-bold text-center gradient-text mb-8">Get In Touch</h2>
      <div className="max-w-xl mx-auto">
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-6">
          Have a question or want to work together? Feel free to reach out!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-md shadow-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
          >
            Send Message
          </button>
        </form>

        {statusMessage && (
          <p className="mt-4 text-center text-green-600 dark:text-green-400">{statusMessage}</p>
        )}

        <div className="mt-8 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">Or connect with me on social media:</p>
          <div className="flex justify-center gap-6 text-3xl">
            <a
              href="https://www.linkedin.com/in/md-hasibur-rh/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-500"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://github.com/ha-sib"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300 dark:text-gray-300 dark:hover:text-gray-100"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.facebook.com/hasib22062001/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-400 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-200"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook"></i>
            </a>
           <a
            href="https://wa.me/+8801631287884"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-green-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-green-400"
            aria-label="WhatsApp"
          >
           <i className="fab fa-whatsapp"></i>
          </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ darkMode }) => {
  return (
    <footer className={`py-6 text-center rounded-t-lg ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Md. Hasibur Rahman. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default App;
