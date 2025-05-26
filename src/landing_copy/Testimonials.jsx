import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "PeerTask helped me find a programming partner for my final project. Not only did we complete the task successfully, but I also made a great friend who continues to collaborate with me on side projects!",
    author: "Kartik Namdev",
    role: "Student",
    company: "Computer Science",
    rating: 5
  },
  {
    quote: "As someone who struggles with time management, PeerTask has been a lifesaver. I found a peer who helped me organize my study schedule, and in return, I helped them with aptitude problems",
    author: "Durgesh Kumar",
    role: "Student",
    company: "Computer Science",
    rating: 4
  },
  {
    quote: "I needed help creating slides for a marketing presentation. Through PeerTask, I connected with a design student who created amazing visuals for me. The platform made the entire process safe and easy!",
    author: "Priyam",
    role: "Student",
    company: "Computer Science",
    rating: 4
  },
  {
    quote: "Stuck on a complex physics problem, I turned to PeerTask. I found a tutor who explained the concepts clearly, and we worked through it together. It was much more effective than just reading textbooks!",
    author: "Anjali Sharma",
    role: "Student",
    company: "Physics",
    rating: 5
  },
  {
    quote: "PeerTask is fantastic for getting diverse perspectives. I needed feedback on my creative writing piece, and I received insightful critiques from peers with different writing styles. It really helped me refine my work.",
    author: "Rohit Verma",
    role: "Student",
    company: "Literature",
    rating: 4
  },
  {
    quote: "I was looking for someone to practice my spoken English with before an interview. PeerTask connected me with a patient and encouraging partner. Our practice sessions significantly boosted my confidence.",
    author: "Sneha Patel",
    role: "Student",
    company: "Business Administration",
    rating: 5
  }
];

const Testimonial = ({ quote, author, role, company, rating }) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200 flex flex-col items-center text-center h-full">
      <div className="w-20 h-20 rounded-full bg-indigo-100 mb-4 flex items-center justify-center">
        <span className="text-indigo-500 text-xl font-bold">👤</span>
      </div>
      <div className="mb-4 flex justify-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            size={20}
            className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} mr-1`}
          />
        ))}
      </div>
      <p className="text-gray-700 italic text-lg mb-6">"{quote}"</p>
      <div className="mt-auto">
        <p className="font-semibold text-gray-900">{author}</p>
        <p className="text-gray-600 text-sm">{role}, {company}</p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reviews, setReviews] = useState(testimonials);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isDesktop) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % reviews.length);
      }, 3000); // Slide every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isDesktop, reviews.length]);

  const handleAddReview = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newReview = {
      quote: formData.get('quote'),
      author: formData.get('author'),
      role: formData.get('role'),
      company: formData.get('company'),
      rating: parseInt(formData.get('rating')),
    };
    setReviews((prev) => [...prev, newReview]);
    setShowForm(false);
    e.target.reset();
  };

  return (
    <section id="testimonials" className="relative min-h-screen flex flex-col items-center py-24 bg-gray-50 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-200 to-indigo-300 opacity-40 blur-2xl z-0 ${showForm ? 'filter blur-sm' : ''}`} />
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full opacity-30 blur-3xl z-0 ${showForm ? 'filter blur-sm' : ''}`} />
      <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500 rounded-full opacity-30 blur-3xl z-0 ${showForm ? 'filter blur-sm' : ''}`} />

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${showForm ? 'filter blur-sm' : ''}`}>
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-indigo-600 font-semibold tracking-wider uppercase">Hear it from them</span>
          <h2 className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-900">
            What Our Users Say
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how PeerTask has helped students and professionals achieve their goals.
          </p>
        </div>

        <div className="relative mb-12">
          {/* Mobile Carousel */}
          <div className="block md:hidden">
            <div className="relative">
              <Testimonial {...reviews[currentSlide]} />
              <div className="absolute top-1/2 -translate-y-1/2 -left-4">
                <button 
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))}
                  className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                >
                  <ChevronLeft size={24} className="text-gray-700" />
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-4">
                <button 
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % reviews.length)}
                  className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                >
                  <ChevronRight size={24} className="text-gray-700" />
                </button>
              </div>
              <div className="flex justify-center mt-6 space-x-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentSlide ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Sliding Carousel */}
          <div className="hidden md:block">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {reviews.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Testimonial {...testimonial} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white py-3 px-6 rounded-full hover:bg-indigo-700 transition duration-300 mx-auto block"
        >
          Add Your Review
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <form
            onSubmit={handleAddReview}
            className="bg-white p-6 rounded-lg shadow-md max-w-md w-full transform transition-transform duration-300 scale-100"
          >
            <h3 className="text-lg font-semibold mb-4">How Are You Feeling?😉</h3>
            <div className="grid grid-cols-1 gap-4">
              <input name="author" type="text" placeholder="Your Name" className="p-2 border rounded" required />
              <input name="role" type="text" placeholder="Your Role" className="p-2 border rounded" required />
              <input name="company" type="text" placeholder="Your Course?" className="p-2 border rounded" required />
              <textarea name="quote" placeholder="Please share your thoughts.." className="p-2 border rounded" required></textarea>
              <input name="rating" type="number" min="1" max="5" placeholder="Rating (1-5)" className="p-2 border rounded" required />
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="mr-4 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
