import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  FiArrowRight,
  FiPhone,
  FiMail,
  FiMapPin,
  FiUser,
  FiActivity,
  FiHeart,
  FiCalendar,
  FiAward,
  FiUsers,
  FiClock,
  FiShield,
  FiVolume2,
  FiVolumeX,
  FiMaximize,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import api from '../utils/api';
import hmoPartnersImg from '../assets/hmo-partners.jpg';
import hospitalAerialImg from '../assets/hospital-aerial.jpg';
import doctor1Img from '../assets/doctor1.jpg';
import doctor2Img from '../assets/doctor2.jpg';
import doctor3Img from '../assets/doctor3.jpg';
import doctor4Img from '../assets/doctor4.jpg';
import doctor5Img from '../assets/doctor5.jpg';
import doctor6Img from '../assets/doctor6.jpg';
import hero1Img from '../assets/hero1.jpg';
import hero3Img from '../assets/hero3.jpg';
import hero4Img from '../assets/hero4.jpg';
import hero5Img from '../assets/hero5.jpg';
import hero6Img from '../assets/hero6.jpg';
import schStoriesVideo from '../assets/video1.mp4';

const Home = () => {
  // Hero slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Video state and ref
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };
  const heroSlides = [
    {
      image: hero1Img,
      alt: 'Catheterization Lab',
      facility: 'Catheterization Lab',
      description: 'State-of-the-art cardiac care with minimally invasive diagnostic tests and treatment procedures.',
      link: '/services'
    },
    {
      image: hero3Img,
      alt: 'Emergency Room',
      facility: 'Emergency Room',
      description: '24/7 Emergency Department equipped with advanced life-saving equipment and experienced physicians.',
      link: '/services'
    },
    {
      image: hero4Img,
      alt: 'Intensive Care Unit',
      facility: 'Intensive Care Unit',
      description: 'Advanced ICU with monitoring systems, ventilators, and round-the-clock specialized care.',
      link: '/services'
    },
    {
      image: hero5Img,
      alt: 'Operating Rooms',
      facility: 'Operating Rooms',
      description: 'Modern surgical suites with cutting-edge technology for various procedures.',
      link: '/services'
    },
    {
      image: hero6Img,
      alt: 'Diagnostic Imaging',
      facility: 'Diagnostic Imaging',
      description: 'Complete imaging services including CT Scan, MRI, X-Ray, and Ultrasound.',
      link: '/services'
    }
  ];

  // Navigation functions
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  // Auto-slide effect for hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Fetch featured services from API
  const { data: servicesData, isLoading: servicesLoading } = useQuery({
    queryKey: ['services', 'featured'],
    queryFn: () => api.get('/services/featured').then(res => res.data).catch((error) => {
      console.error('Failed to fetch services:', error);
      return null;
    })
  });

  // Service icons mapping
  const getServiceIcon = (iconName) => {
    const icons = {
      'emergency': <FiActivity className="w-8 h-8" />,
      'outpatient': <FiUser className="w-8 h-8" />,
      'lab': <FiShield className="w-8 h-8" />,
      'radiology': <FiActivity className="w-8 h-8" />,
      'pharmacy': <FiHeart className="w-8 h-8" />,
      'surgery': <FiActivity className="w-8 h-8" />,
      'cardiology': <FiHeart className="w-8 h-8" />,
      'pediatrics': <FiUsers className="w-8 h-8" />,
      'obstetrics': <FiHeart className="w-8 h-8" />,
      'icu': <FiActivity className="w-8 h-8" />,
      'default': <FiActivity className="w-8 h-8" />
    };
    return icons[iconName] || icons['default'];
  };

  // Doctor categories
  const doctorCategories = [
    'Admitting Physician',
    'Anesthesiologist',
    'Attending Physician',
    'Resident on Duty',
    'Surgeon',
    'Referral'
  ];

  // Featured doctors
  const featuredDoctors = [
    { id: 1, name: 'Dr. Maria Santos', specialty: 'Cardiologist', image: doctor1Img },
    { id: 2, name: 'Dr. Jose Garcia', specialty: 'Internal Medicine', image: doctor2Img },
    { id: 3, name: 'Dr. Ana Reyes', specialty: 'Pediatrician', image: doctor3Img },
    { id: 4, name: 'Dr. Miguel Cruz', specialty: 'Surgeon', image: doctor4Img },
    { id: 5, name: 'Dr. Rosa Dela Cruz', specialty: 'OB-GYN', image: doctor5Img },
    { id: 6, name: 'Dr. Carlos Mendoza', specialty: 'Anesthesiologist', image: doctor6Img }
  ];

  // Health packages
  const healthPackages = [
    {
      id: 1,
      title: '2-Benefit Heart Surgery Package',
      description: 'Comprehensive cardiac care including surgery and post-operative care',
      icon: <FiHeart className="w-10 h-10" />
    },
    {
      id: 2,
      title: 'Z-Benefit Package for Breast Cancer',
      description: 'Complete breast cancer treatment and support services',
      icon: <FiShield className="w-10 h-10" />
    },
    {
      id: 3,
      title: 'All-Inclusive Maternity Package',
      description: 'Full maternity care from prenatal to postnatal services',
      icon: <FiUsers className="w-10 h-10" />
    },
    {
      id: 4,
      title: 'Angiogram Package',
      description: 'Diagnostic imaging for cardiovascular assessment',
      icon: <FiActivity className="w-10 h-10" />
    }
  ];

  // Fetch news from API (get more for featured slider + card carousel)
  const { data: newsData, isLoading: newsLoading } = useQuery({
    queryKey: ['news', 'home'],
    queryFn: () => api.get('/news?limit=10').then(res => res.data).catch((error) => {
      console.error('Failed to fetch news:', error);
      return null;
    })
  });

  // Format date helper
  const formatNewsDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="overflow-hidden">
      {/* Section 1: Hero Section with Slideshow - Full viewport height */}
      <section className="relative h-[calc(100vh-100px)] min-h-[500px] overflow-hidden">
        {/* Slideshow Images */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover scale-100"
              style={{ objectPosition: 'center 30%' }}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          </div>
        ))}

        {/* Content */}
        <div className="absolute inset-0 flex items-center z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Welcome to Socsargen County Hospital
              </h1>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 inline-block">
                <p className="text-accent-400 font-semibold text-sm uppercase tracking-wider mb-1">
                  Featured Facility
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {heroSlides[currentSlide].facility}
                </h2>
              </div>
              <p className="text-lg md:text-xl text-gray-200 mb-8 font-light">
                {heroSlides[currentSlide].description}
              </p>
              <Link
                to={heroSlides[currentSlide].link}
                className="inline-flex items-center gap-2 bg-primary-600 text-white hover:bg-primary-700 font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore {heroSlides[currentSlide].facility}
                <FiArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Left Arrow Button - Hidden on mobile */}
        <button
          onClick={goToPrevSlide}
          className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full items-center justify-center text-white transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <FiChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* Right Arrow Button - Hidden on mobile */}
        <button
          onClick={goToNextSlide}
          className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full items-center justify-center text-white transition-all duration-300 group"
          aria-label="Next slide"
        >
          <FiChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* Slide Indicators (Dots) */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Section 2: Quick Help Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Get high-quality healthcare in the heart of General Santos City
            </h2>
            <p className="text-lg text-gray-600">
              How can we help you today?
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Find a Doctor Card */}
            <Link
              to="/doctors"
              className="group bg-white border-2 border-gray-100 rounded-xl p-8 text-center hover:border-primary-500 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-300">
                <FiUser className="w-10 h-10 text-primary-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-primary-600">
                Find a Doctor
              </h3>
              <p className="text-gray-500 text-sm">
                Search our medical specialists
              </p>
            </Link>

            {/* Book Executive Check Up Card */}
            <Link
              to="/services"
              className="group bg-white border-2 border-gray-100 rounded-xl p-8 text-center hover:border-primary-500 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-300">
                <FiActivity className="w-10 h-10 text-primary-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-primary-600">
                Book an Executive Check Up
              </h3>
              <p className="text-gray-500 text-sm">
                Comprehensive health screening
              </p>
            </Link>

            {/* Wellness Packages Card */}
            <Link
              to="/services"
              className="group bg-white border-2 border-gray-100 rounded-xl p-8 text-center hover:border-primary-500 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-300">
                <FiHeart className="w-10 h-10 text-primary-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-primary-600">
                Learn about our Wellness Packages
              </h3>
              <p className="text-gray-500 text-sm">
                Preventive care programs
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: Our Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              With a full range of services and advanced treatments, we're here to make sure every patient receives the care they need with heart, skill, and commitment.
            </p>
          </div>

          {servicesLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {(servicesData?.data || servicesData || []).slice(0, 10).map((service, index) => {
                const slug = (service?.name || 'service')
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)/g, '');
                return (
                  <Link
                    key={service?.id || index}
                    to={`/services/${slug}`}
                    className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 group block"
                  >
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4 text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                      {getServiceIcon(service?.icon)}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                      {service?.name || 'Service'}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {service?.description || 'Quality healthcare service'}
                    </p>
                  </Link>
                );
              })}
              {/* Fallback services if API returns empty */}
              {(!servicesData || (servicesData?.data || servicesData || []).length === 0) && (
                <>
                  {[
                    { id: 'fallback-emergency', name: 'Emergency Care', icon: 'emergency', description: '24/7 emergency medical services' },
                    { id: 'fallback-outpatient', name: 'Outpatient Services', icon: 'outpatient', description: 'Comprehensive outpatient care' },
                    { id: 'fallback-lab', name: 'Laboratory', icon: 'lab', description: 'Advanced diagnostic testing' },
                    { id: 'fallback-radiology', name: 'Radiology', icon: 'radiology', description: 'Medical imaging services' },
                    { id: 'fallback-pharmacy', name: 'Pharmacy', icon: 'pharmacy', description: 'In-hospital pharmacy' },
                    { id: 'fallback-surgery', name: 'Surgery', icon: 'surgery', description: 'Surgical procedures' },
                    { id: 'fallback-cardiology', name: 'Cardiology', icon: 'cardiology', description: 'Heart care services' },
                    { id: 'fallback-pediatrics', name: 'Pediatrics', icon: 'pediatrics', description: 'Child healthcare' },
                    { id: 'fallback-obstetrics', name: 'Obstetrics', icon: 'obstetrics', description: 'Maternity services' },
                    { id: 'fallback-icu', name: 'ICU', icon: 'icu', description: 'Intensive care unit' }
                  ].map((service) => {
                    const slug = service.name
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/(^-|-$)/g, '');
                    return (
                      <Link
                        key={service.id}
                        to={`/services/${slug}`}
                        className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 group block"
                      >
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4 text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                          {getServiceIcon(service.icon)}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {service.description}
                        </p>
                      </Link>
                    );
                  })}
                </>
              )}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 text-lg"
            >
              View All Services
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Facilities Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              World-Class Facilities
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our hospital is equipped with state-of-the-art facilities to provide you with the best healthcare experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {heroSlides.map((slide, index) => (
              <Link
                key={index}
                to={slide.link}
                className="group bg-white border-2 border-gray-100 rounded-xl p-6 text-center hover:border-primary-500 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-300">
                  <FiActivity className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-primary-600">
                  {slide.facility}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Meet Our Doctors Section */}
      <section className="py-16 bg-primary-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet our Doctors
            </h2>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto">
              Meet the seasoned experts of Socsargen County Hospital.
            </p>
          </div>

          {/* Doctor Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {doctorCategories.map((category, index) => (
              <button
                key={index}
                type="button"
                className="bg-white/10 border-2 border-white/30 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-primary-700 hover:border-white transition-all duration-300 cursor-pointer"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Doctor Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto mb-10">
            {featuredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{ objectPosition: 'center 20%' }}
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-primary-600 text-xs font-medium">
                    {doctor.specialty}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 bg-white text-primary-700 hover:bg-primary-50 font-semibold px-8 py-3 rounded-lg text-lg transition-all duration-300"
            >
              View All Doctors
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6: Health Packages Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Health Packages
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              With a full range of services and advanced treatments, we're here to make sure every patient receives the care they need with heart, skill, and commitment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {healthPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-gradient-to-br from-primary-50 to-white border border-primary-100 rounded-xl p-6 hover:shadow-lg hover:border-primary-300 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-4 text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                  {pkg.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {pkg.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {pkg.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 text-lg"
            >
              View All Health Packages
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7: About Hospital Section */}
      <section className="py-16 bg-gradient-to-r from-primary-700 to-primary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Socsargen County Hospital is a private and an ISO-accredited tertiary hospital located in General Santos City.
            </h2>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <p className="text-primary-600 text-lg leading-relaxed mb-6">
                    Serving the people of General Santos City and setting the standards of healthcare in Region 12
                  </p>
                  <Link
                    to="/about/history"
                    className="text-6xl md:text-7xl font-bold text-primary-700 mb-4 block hover:text-primary-500 transition-colors cursor-pointer"
                  >
                    1992
                  </Link>
                  <Link
                    to="/about/history"
                    className="inline-flex items-center gap-2 bg-primary-600 text-white hover:bg-primary-700 font-semibold px-6 py-3 rounded-lg transition-all duration-300 w-fit"
                  >
                    History & Milestones
                    <FiArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                <div className="h-64 md:h-auto">
                  <img
                    src={hospitalAerialImg}
                    alt="Socsargen County Hospital Aerial View"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Patient Stories/Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our SCH Stories
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Featuring real patients whose journeys remind us that healing starts with compassion and care.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* LEFT: Video */}
                <div className="relative aspect-video md:aspect-auto md:h-full bg-black">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={schStoriesVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {/* Video controls */}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <button
                      onClick={toggleVideoMute}
                      className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                      aria-label={isVideoMuted ? 'Unmute video' : 'Mute video'}
                    >
                      {isVideoMuted ? (
                        <FiVolumeX className="w-5 h-5 text-gray-700" />
                      ) : (
                        <FiVolume2 className="w-5 h-5 text-primary-600" />
                      )}
                    </button>
                    <button
                      onClick={toggleFullscreen}
                      className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                      aria-label="Fullscreen"
                    >
                      <FiMaximize className="w-5 h-5 text-gray-700 hover:text-primary-600" />
                    </button>
                  </div>
                </div>

                {/* RIGHT: Content */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <span className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 w-fit">
                    Patient Highlight
                  </span>
                  <blockquote className="text-xl md:text-2xl text-gray-700 italic mb-8 leading-relaxed relative">
                    <span className="absolute -top-4 -left-2 text-6xl text-primary-200 font-serif leading-none">"</span>
                    <span className="relative z-10">
                      I am deeply Grateful to Socsargen County Hospital, it was here that I Truly Experienced genuine compassion and care.
                    </span>
                  </blockquote>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center">
                      <FiUser className="w-7 h-7 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-lg">KARELLE M. RABIA</p>
                      <p className="text-gray-500 text-sm">Patient</p>
                    </div>
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-primary-600 text-white hover:bg-primary-700 font-semibold px-6 py-3 rounded-lg transition-all duration-300 w-fit"
                  >
                    Contact Us
                    <FiArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: HMO Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              HMO &amp; Insurance Partners
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              We take pride in partnering with various Health Maintenance Organizations (HMOs) to make quality healthcare more accessible to our community.
            </p>
          </div>

          {/* Partner logos */}
          <div className="max-w-4xl mx-auto">
            <img
              src={hmoPartnersImg}
              alt="Affiliated Health Maintenance Organization (HMO) Partners"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Facebook Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left text-white lg:pr-8 mb-8 lg:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Connected with <br className="hidden md:block" />Socsargen County Hospital!
              </h2>
              <p className="text-primary-100 text-lg leading-relaxed">
                Don't miss out on the latest hospital news, health tips,
                and upcoming events. Like our Facebook page to stay
                informed and be part of our growing community!
              </p>
              <a
                href="https://www.facebook.com/SocsargenCountyHospitalOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 bg-white text-primary-700 hover:bg-primary-50 font-semibold px-6 py-3 rounded-lg transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Follow Us on Facebook
              </a>
            </div>

            {/* Right Facebook Embed */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FSocsargenCountyHospitalOfficial&tabs=timeline&width=550&height=480&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
                width="1350"
                height="500"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="Socsargen County Hospital Facebook Page"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: News and Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            News and Events
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay updated on Socsargen County Hospital latest news, events, and wellness initiatives.
          </p>
        </div>

        {newsLoading ? (
          <div className="space-y-8">
            <div className="relative h-[400px] md:h-[500px] bg-gray-200 animate-pulse rounded-xl max-w-6xl mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 h-64 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        ) : (newsData?.data || []).length > 0 ? (
          <div className="space-y-12">
            {/* Featured News Slider - Top */}
            <FeaturedNewsSlider newsItems={(newsData?.data || []).slice(0, 3)} />

            {/* News Cards - Bottom */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 text-center mb-6">Latest Updates</h3>
              <NewsSlider newsItems={newsData?.data || []} />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <FiCalendar className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No News Yet</h3>
            <p className="text-gray-500">Check back later for updates and announcements.</p>
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 text-lg"
          >
            View All News &amp; Events
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Section 11: Contact Preview Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Contact Us
              </h2>
              <p className="text-primary-100 text-lg">
                We are here to take care of you
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiPhone className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Phone</h3>
                <p className="text-primary-100">553-8906 / 553-8907</p>
                <p className="text-primary-100">0932-692-4708</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMail className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <p className="text-primary-100">edpsocsargen@gmail.com</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMapPin className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Address</h3>
                <p className="text-primary-100 text-sm">L. Arradaza St., Bula-Lagao Road, Lagao, General Santos City</p>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary-700 hover:bg-primary-50 font-semibold px-8 py-3 rounded-lg transition-all duration-300"
              >
                Get in Touch
                <FiArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency CTA Bar */}
      <section className="py-6 bg-accent-500">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <FiClock className="w-6 h-6 text-accent-900" />
              <span className="font-semibold text-accent-900">24/7 Emergency Services Available</span>
            </div>
            <span className="hidden md:inline text-accent-700">|</span>
            <div className="flex items-center gap-2">
              <FiPhone className="w-6 h-6 text-accent-900" />
              <span className="font-bold text-accent-900 text-lg">Emergency Hotline: 553-8906 / 0932-692-4708</span>
            </div>
          </div>
        </div>
      </section>

      {/* Find Us on the Map Section */}
      <section className="bg-white">
        <div className="text-center py-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Find Us on the Map</h2>
          <p className="text-gray-600 max-w-2xl mx-auto px-4">
            Visit us at Socsargen County Hospital in Lagao, General Santos City
          </p>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5610.317122515964!2d125.18693377253548!3d6.118144569811807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f79fb707dc388d%3A0x3dc68b9d61e2c8c4!2sSocsargen%20County%20Hospital!5e0!3m2!1sen!2sph!4v1768029721585!5m2!1sen!2sph"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Socsargen County Hospital Location"
          className="w-full"
        ></iframe>
      </section>
    </div>
  );
};

// Featured News Slider - Full-width background image/video slider with auto-rotate
const FeaturedNewsSlider = ({ newsItems }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${API_URL}${imageUrl}`;
  };

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    if (newsItems.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [newsItems.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % newsItems.length);
  };

  if (newsItems.length === 0) return null;

  return (
    <div className="relative h-[350px] md:h-[450px] max-w-6xl mx-auto rounded-xl overflow-hidden shadow-xl">
      {/* Slides */}
      {newsItems.map((news, index) => (
        <div
          key={news.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          {news.imageUrl ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${getImageUrl(news.imageUrl)})` }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800" />
          )}

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
            <div className="max-w-2xl">
              <h3 className="text-xl md:text-3xl font-bold text-white mb-4 line-clamp-3">
                {news.title}
              </h3>
              <p className="text-gray-200 text-sm md:text-base mb-4 line-clamp-2 hidden md:block">
                {news.excerpt}
              </p>
              <Link
                to={`/news/${news.slug}`}
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-300"
              >
                Learn More
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={goToPrev}
        className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300"
        aria-label="Next slide"
      >
        <FiChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {newsItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-6 md:w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// News Carousel Component - Shows 3 cards on desktop, 1 on mobile with left/right navigation
const NewsSlider = ({ newsItems }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Update visible count based on screen size
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1); // Mobile: 1 card
      } else {
        setVisibleCount(3); // Desktop: 3 cards
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  // Reset startIndex when visibleCount changes to prevent out of bounds
  useEffect(() => {
    if (startIndex + visibleCount > newsItems.length) {
      setStartIndex(Math.max(0, newsItems.length - visibleCount));
    }
  }, [visibleCount, newsItems.length, startIndex]);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${API_URL}${imageUrl}`;
  };

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + visibleCount < newsItems.length;

  const prevSlide = () => {
    if (canGoPrev) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const nextSlide = () => {
    if (canGoNext) {
      setStartIndex((prev) => prev + 1);
    }
  };

  // Get visible news items
  const visibleNews = newsItems.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="relative max-w-6xl mx-auto px-4">
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        disabled={!canGoPrev}
        className={`absolute left-0 md:left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
          canGoPrev
            ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        aria-label="Previous news"
      >
        <FiChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* News Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-14 md:mx-16">
        {visibleNews.map((news) => (
          <article
            key={news.id}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            {/* News image */}
            {news.imageUrl ? (
              <div className="h-48 overflow-hidden">
                <img
                  src={getImageUrl(news.imageUrl)}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <FiAward className="w-16 h-16 text-white/50" />
              </div>
            )}
            <div className="p-6">
              <span className="inline-block bg-accent-100 text-accent-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                News
              </span>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                {news.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                {news.excerpt}
              </p>
              <Link
                to={`/news/${news.slug}`}
                className="inline-flex items-center gap-1 text-primary-600 font-medium text-sm hover:text-primary-700"
              >
                Learn More
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        disabled={!canGoNext}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
          canGoNext
            ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        aria-label="Next news"
      >
        <FiChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>
    </div>
  );
};

export default Home;
