import React from "react";
import { 
  Briefcase, 
  Users, 
  MessageSquareHeart, 
  ChevronRight, 
  Heart, 
  Shield, 
  Coffee, 
  Lightbulb, 
  Target
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const navigate = useNavigate();
  
  // Team members data without images
  const teamMembers = [
    {
      name: "Anushree S P",
      title: "Lead Developer"
    },
    {
      name: "Aliya",
      title: "Member of Neo Hire"
    },
    {
      name: "Pavan Kumar T M",
      title: "Member of Neo Hire"
    },
    {
      name: "Balaji C P",
      title: "Member of Neo Hire"
    },
    {
      name: "Manasa",
      title: "Marketing Specialist"
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
    
      <div className="relative bg-gradient-to-r from-blue-700 to-indigo-800 pt-28 pb-36 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">About Neo Hire</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transforming the recruitment landscape with our cutting-edge platform that connects exceptional talent with visionary recruiters.
          </p>
       
        </div>
       
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path 
              fill="#f8faff" 
              fillOpacity="1" 
              d="M0,96L60,112C120,128,240,160,360,154.7C480,149,600,107,720,112C840,117,960,171,1080,176C1200,181,1320,139,1380,117.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
            </path>
          </svg>
        </div>
      </div>

     
      <div className="px-6 -mt-24 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-transform duration-300 border-t-4 border-blue-500">
            <div className="inline-flex items-center justify-center bg-blue-100 p-4 rounded-full mb-6">
              <Heart size={28} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              At Neo Hire, we're on a mission to revolutionize recruitment by creating a platform that eliminates friction, 
              increases transparency, and focuses on meaningful connections between talent and opportunities.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-transform duration-300 border-t-4 border-indigo-500">
            <div className="inline-flex items-center justify-center bg-indigo-100 p-4 rounded-full mb-6">
              <Lightbulb size={28} className="text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              We envision a future where finding the perfect job or candidate is intuitive, efficient, and enjoyable. 
              Neo Hire aims to be the catalyst that transforms how people think about career advancement.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-transform duration-300 border-t-4 border-purple-500">
            <div className="inline-flex items-center justify-center bg-purple-100 p-4 rounded-full mb-6">
              <Target size={28} className="text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-gray-600 leading-relaxed">
              Integrity, innovation, and human-centered design guide everything we do. We believe in creating technology
              that serves people, not the other way around, while fostering trust in the hiring ecosystem.
            </p>
          </div>
        </div>
      </div>

      
      <div className="px-6 py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900">Why Choose Neo Hire</h2>
            <div className="h-1 w-24 bg-indigo-500 mx-auto mt-5 rounded-full"></div>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with human-centered design to create the most effective recruitment experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <Briefcase className="text-blue-600" size={28} />,
                title: "Intelligent Job Matching",
                description: "Our AI-powered algorithms connect candidates with opportunities that align with their skills, experience, and career aspirations."
              },
              {
                icon: <Users className="text-blue-600" size={28} />,
                title: "Talent Community",
                description: "Build and nurture connections with potential employers and candidates in a professional networking environment."
              },
              {
                icon: <MessageSquareHeart className="text-blue-600" size={28} />,
                title: "Seamless Communication",
                description: "Our integrated messaging system streamlines interactions between recruiters and candidates."
              },
              {
                icon: <Coffee className="text-blue-600" size={28} />,
                title: "User-Centric Design",
                description: "Every feature is crafted with the user experience in mind, making recruitment enjoyable and efficient."
              },
              {
                icon: <Shield className="text-blue-600" size={28} />,
                title: "Data Privacy & Security",
                description: "Enterprise-grade security measures protect your information and maintain compliance with regulations."
              },
              {
                icon: <ChevronRight className="text-blue-600" size={28} />,
                title: "Continuous Innovation",
                description: "We're constantly evolving our platform based on user feedback and emerging recruitment trends."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="p-4 bg-blue-50 rounded-full inline-block mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div className="bg-gradient-to-b from-gray-900 to-indigo-900 text-white py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Meet Our Team</h2>
            <p className="text-gray-300 mt-5 max-w-2xl mx-auto text-lg">
              Our diverse team of innovators from Agile Achievers combines expertise in technology, HR, and user experience 
              to build a platform that transforms how people find their next opportunity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group bg-indigo-800/30 p-8 rounded-xl hover:bg-indigo-800/50 transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-indigo-300 mt-2">{member.title}</p>
                <div className="flex justify-center gap-4 mt-4">
                 
                  <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.12.83-.26.83-.57 0-.28 0-1.03-.02-2.03-3.33.72-4.03-1.6-4.03-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.84 2.8 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.3.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.3-1.23 3.3-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.9 1.23 3.22 0 4.6-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.3 0 .31.2.7.82.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button className="bg-blue-600 text-white px-10 py-4 rounded-lg font-medium hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-500/20 transform hover:scale-105 duration-300">
              Join Our Team
            </button>
          </div>
        </div>
      </div>

     
      <div className="py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900">Our Journey</h2>
            <div className="h-1 w-24 bg-blue-500 mx-auto mt-5 rounded-full"></div>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to reality, see how Neo Hire has evolved to become the platform it is today.
            </p>
          </div>
          
          <div className="relative">
         
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-200"></div>
            
            {[
              {
                year: "January 2025",
                title: "Inception",
                description: "Neo Hire was conceptualized by the Agile Achievers innovation team with the vision to transform the recruitment landscape."
              },
              {
                year: "March 2025",
                title: "Development",
                description: "Our platform was developed with cutting-edge technology, focusing on user experience and intelligent matching algorithms."
              },
              {
                year: "April 2025",
                title: "Beta Testing",
                description: "Select partners began testing the platform, providing valuable feedback for refinement and optimization."
              },
              {
                year: "May 2025",
                title: "Launch",
                description: "Official launch with hundreds of recruiters and job seekers joining the platform in the first week."
              }
            ].map((milestone, index) => (
              <div key={index} className={`relative flex md:items-center mb-20 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="flex-1 md:pr-10 md:pl-0 pl-10">
                  <div className={`p-8 rounded-xl shadow-lg ${index % 2 === 0 ? 'bg-blue-50' : 'bg-indigo-50'} transform transition-transform duration-300 hover:scale-105`}>
                    <div className="text-sm font-bold text-blue-600 mb-2">{milestone.year}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                    <p className="text-gray-600 text-lg">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-0 md:left-1/2 transform -translate-x-px md:-translate-x-1/2 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-blue-600 border-4 border-white shadow-md"></div>
                </div>
                
                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

    
      <div className="py-28 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900">What People Say</h2>
            <div className="h-1 w-24 bg-blue-500 mx-auto mt-5 rounded-full"></div>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from recruiters and job seekers who have experienced the Neo Hire difference.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                quote: "Neo Hire revolutionized our hiring process, making it 3x faster. We found outstanding talent within days that perfectly matched our company culture.",
                name: "Robert Chen",
                title: "HR Director",
                company: "TechCorp Inc."
              },
              {
                quote: "The platform's intuitive design and personalized recommendations made job hunting a breeze. I found my dream position in a week when I had been searching for months!",
                name: "Emma Rodriguez",
                title: "Software Engineer",
                company: "Recently Hired"
              },
              {
                quote: "The analytics and insights provided by Neo Hire have transformed how we approach recruitment. We now make data-driven decisions that improved our retention rates by 40%.",
                name: "David Kim",
                title: "Recruitment Lead",
                company: "Global Systems"
              }
              
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-10 rounded-xl shadow-xl transform transition-transform duration-300 hover:-translate-y-2 border-b-4 border-blue-400">
                <div className="mb-6">
                
                  <svg className="w-12 h-12 text-blue-200" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8v6c0 5.5-4.5 10-10 10v-2c2.2 0 4.3-0.9 5.8-2.4s2.2-3.6 2.2-5.6v-6h2zM30 8v6c0 5.5-4.5 10-10 10v-2c2.2 0 4.3-0.9 5.8-2.4s2.2-3.6 2.2-5.6v-6h2z" transform="rotate(180 16 16)"></path>
                  </svg>
                </div>
                <p className="text-gray-700 italic mb-10 text-lg leading-relaxed">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-800 text-lg">{testimonial.name}</p>
                    <p className="text-gray-500">{testimonial.title}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div className="py-28 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-10 max-w-3xl mx-auto text-xl leading-relaxed">
            Want to learn more about <span className="font-semibold text-blue-600">Neo Hire</span> or have questions about our platform? 
            Our team is ready to help you transform your recruitment experience.
          </p>

          <button
            onClick={() => navigate("/contact")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 shadow-xl transform hover:scale-105 font-medium text-lg"
          >
            Contact Our Team
          </button>
        </div>
      </div>

     
      <footer className="bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg text-indigo-200">
            &copy; {new Date().getFullYear()} Agile Achievers · Neo Hire. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}