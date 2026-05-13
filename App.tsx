import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Menu, X, MapPin, Phone, MessageCircle } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md py-4 shadow-lg shadow-black/50" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="text-2xl font-serif font-bold text-primary tracking-wider uppercase">
          KCM
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {["About", "Gallery", "Facilities", "Booking", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-sm font-medium text-gray-300 hover:text-primary transition-colors tracking-wide uppercase"
              data-testid={`nav-${item.toLowerCase()}`}
            >
              {item}
            </button>
          ))}
          <a
            href="https://wa.me/919848868383"
            target="_blank"
            rel="noreferrer"
            className="bg-primary text-primary-foreground px-5 py-2 rounded-full font-semibold text-sm hover:scale-105 transition-transform"
            data-testid="nav-whatsapp"
          >
            Inquire Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          data-testid="nav-mobile-toggle"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-border overflow-hidden"
          >
            <div className="flex flex-col items-center py-6 gap-6">
              {["About", "Gallery", "Facilities", "Booking", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-lg font-medium text-gray-300 hover:text-primary transition-colors tracking-wide uppercase"
                  data-testid={`nav-mobile-${item.toLowerCase()}`}
                >
                  {item}
                </button>
              ))}
              <a
                href="https://wa.me/919848868383"
                target="_blank"
                rel="noreferrer"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold text-sm w-4/5 text-center mt-4"
                data-testid="nav-mobile-whatsapp"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center text-center px-6 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/kcm-building.jpeg"
          alt="KCM Convention building exterior"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background"></div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 bg-black/40 p-8 md:p-14 rounded-3xl max-w-4xl backdrop-blur-md border border-primary/20 shadow-2xl shadow-primary/5"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-primary mb-6 drop-shadow-lg"
        >
          KCM Convention
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="text-xl md:text-3xl mb-4 font-light text-foreground/90 tracking-wide"
        >
          Premium Wedding & Event Venue
        </motion.p>
        <motion.p
          variants={fadeInUp}
          className="text-md md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          Where Grand Celebrations Become Timeless Memories in Shankarpally
        </motion.p>
        <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6">
          <a
            href="tel:+919848868383"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/20"
            data-testid="hero-call"
          >
            <Phone size={20} />
            Call Now
          </a>
          <a
            href="https://wa.me/919848868383"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
            data-testid="hero-whatsapp"
          >
            <MessageCircle size={20} />
            WhatsApp
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-32 px-6 max-w-5xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="text-center"
      >
        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif font-bold text-primary mb-10">
          About KCM Convention
        </motion.h2>
        <motion.div variants={fadeInUp} className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
          <p>
            KCM Convention is a luxury wedding and event venue located in the serene surroundings of Shankarpally, Telangana. We provide a magnificent canvas for your most cherished moments.
          </p>
          <p>
            Perfect for weddings, grand receptions, engagements, milestone birthday celebrations, corporate events, and large family gatherings. Experience our elegant ambience, sprawling spacious interiors, and a premium atmosphere designed to host unforgettable celebrations.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

type GalleryItem = { type: "image"; src: string; alt: string } | { type: "video"; src: string };

function Gallery() {
  const items: GalleryItem[] = [
    { type: "image", src: "/gallery-1.jpeg", alt: "KCM Convention decorated stage with floral arrangements" },
    { type: "video", src: "/gallery-video-1.mp4" },
  ];

  return (
    <section id="gallery" className="py-32 px-6 bg-card border-y border-border">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto"
      >
        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif font-bold text-primary mb-16 text-center">
          Our Grandeur
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="overflow-hidden rounded-2xl group border border-border/50 shadow-xl"
              data-testid={`gallery-item-${index}`}
            >
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-96 w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              ) : (
                <video
                  src={item.src}
                  className="h-96 w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Facilities() {
  const facilities = [
    { title: "Spacious Convention Hall", desc: "Pillar-less grand design for unobstructed views." },
    { title: "Central Air Conditioning", desc: "Optimal comfort for all guests regardless of the season." },
    { title: "Large Parking Area", desc: "Ample, secure parking space for hundreds of vehicles." },
    { title: "Grand Dining Hall", desc: "Separate expansive area for catering and dining." },
    { title: "Premium Bridal Rooms", desc: "Luxurious, fully-equipped suites for the hosts." },
    { title: "Luxury Lighting", desc: "Customizable, cinematic lighting to set the perfect mood." },
  ];

  return (
    <section id="facilities" className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif font-bold text-primary mb-16 text-center">
          Premium Facilities
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-card p-10 rounded-2xl border border-border hover:border-primary/50 transition-colors duration-300 group"
            >
              <h3 className="text-2xl font-serif font-semibold text-foreground group-hover:text-primary transition-colors mb-4">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventType: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*New Booking Inquiry - KCM Convention*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Event Type:* ${formData.eventType}%0A*Details:* ${formData.details}`;
    
    window.open(`https://wa.me/919848868383?text=${message}`, "_blank");
    setSubmitted(true);
    setFormData({ name: "", phone: "", eventType: "", details: "" });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="booking" className="py-32 px-6 bg-card border-y border-border">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-3xl mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Booking Inquiry</h2>
          <p className="text-muted-foreground text-lg">Reach out to us to check availability and discuss your event requirements.</p>
        </motion.div>

        <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-6 bg-background p-8 md:p-10 rounded-3xl border border-border shadow-2xl">
          {submitted && (
            <div className="bg-primary/10 border border-primary/30 text-primary p-4 rounded-xl text-center font-medium" data-testid="booking-success">
              Redirecting to WhatsApp to complete your inquiry...
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground ml-1">Full Name</label>
              <input
                required
                type="text"
                placeholder="John Doe"
                className="w-full p-4 rounded-xl bg-input/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                data-testid="input-name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground ml-1">Phone Number</label>
              <input
                required
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full p-4 rounded-xl bg-input/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                data-testid="input-phone"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground ml-1">Event Type</label>
            <input
              required
              type="text"
              placeholder="e.g. Wedding, Reception, Corporate"
              className="w-full p-4 rounded-xl bg-input/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
              value={formData.eventType}
              onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
              data-testid="input-event-type"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground ml-1">Event Details & Dates</label>
            <textarea
              required
              placeholder="Tell us about your expected guest count and preferred dates..."
              rows={5}
              className="w-full p-4 rounded-xl bg-input/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-muted-foreground/50"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              data-testid="input-details"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2"
            data-testid="button-submit-inquiry"
          >
            <MessageCircle size={20} />
            Send Inquiry via WhatsApp
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="grid md:grid-cols-2 gap-16 items-center"
      >
        <motion.div variants={fadeInUp} className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Contact & Location</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We invite you to visit KCM Convention to experience our luxury venue firsthand. Our team is ready to assist you.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-card rounded-full border border-border shrink-0">
                <MapPin className="text-primary" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-foreground">Address</h4>
                <p className="text-muted-foreground mt-1">
                  KCM Convention<br />
                  Shankarpally, Telangana 501203
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-card rounded-full border border-border shrink-0">
                <Phone className="text-primary" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-foreground">Phone</h4>
                <p className="text-muted-foreground mt-1">
                  <a href="tel:+919848868383" className="hover:text-primary transition-colors">+91 98488 68383</a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-card rounded-full border border-border shrink-0">
                <MessageCircle className="text-primary" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-foreground">Availability</h4>
                <p className="text-muted-foreground mt-1">
                  Open 24 Hours
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-4 flex flex-wrap gap-4">
            <a
              href="https://wa.me/919848868383"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
              data-testid="contact-whatsapp"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>
            <a
              href="https://www.instagram.com/kcm_convention"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
              data-testid="contact-instagram"
            >
              <SiInstagram size={20} />
              @kcm_convention
            </a>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="h-[500px] w-full rounded-3xl overflow-hidden border border-border shadow-xl">
          <iframe
            title="KCM Convention Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121855.9328221808!2d78.04870020120762!3d17.43385472856411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbefc405a308c3%3A0x6a0f681d89868ba8!2sShankarpalle%2C%20Telangana!5e0!3m2!1sen!2sin!4v1714000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale invert opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
          ></iframe>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-black py-12 px-6 text-center text-muted-foreground">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xl font-serif font-bold text-primary tracking-wider">
          KCM
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} KCM Convention. All Rights Reserved.
        </p>
        <a
          href="https://www.instagram.com/kcm_convention"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          data-testid="footer-instagram"
        >
          <SiInstagram size={18} />
          @kcm_convention
        </a>
      </div>
    </footer>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
          <Navbar />
          <Hero />
          <About />
          <Gallery />
          <Facilities />
          <Booking />
          <Contact />
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
