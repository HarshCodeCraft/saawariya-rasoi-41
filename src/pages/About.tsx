
import React from 'react';
import Layout from '@/components/Layout';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Layout>
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl font-bold">About Saawariya Rasoi</h1>
            <p className="text-lg text-muted-foreground">
              A journey of passion, tradition, and authentic flavors
            </p>
          </div>
          
          <div className="glass-morphism rounded-2xl overflow-hidden mb-16">
            <div className="aspect-[21/9] relative">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80" 
                alt="Saawariya Rasoi Restaurant"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold">Our Beginning</h2>
              <p className="text-muted-foreground leading-relaxed">
                Saawariya Rasoi began as a small family kitchen in 2005, where our founder, Chef Rajesh Kumar, would prepare traditional recipes passed down through generations of his family.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                What started as a passion project quickly gained recognition among friends and family, who encouraged Chef Rajesh to share his culinary creations with a wider audience.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                In 2010, we opened our first small restaurant with just 10 tables. Today, Saawariya Rasoi has grown into a beloved culinary destination, but our commitment to authentic flavors and family recipes remains unchanged.
              </p>
            </div>
            
            <div className="rounded-2xl overflow-hidden neo-shadow">
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Saawariya Rasoi early days"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl font-semibold">Our Philosophy</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Saawariya Rasoi, we believe that food is more than sustenance—it's a celebration of culture, tradition, and community. Every dish we prepare tells a story of our heritage and passion for authentic flavors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: "Authentic Recipes",
                description: "We stay true to traditional cooking methods and recipes that have been passed down through generations.",
                image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
              },
              {
                title: "Fresh Ingredients",
                description: "We source the freshest, highest-quality ingredients to ensure each dish achieves its full flavor potential.",
                image: "https://images.unsplash.com/photo-1467019972079-a273e1bc9173?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
              },
              {
                title: "Community Connection",
                description: "We believe in fostering community through food, creating experiences that bring people together.",
                image: "https://images.unsplash.com/photo-1543353071-087092ec393a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
              }
            ].map((value, index) => (
              <div key={index} className="glass-morphism rounded-xl overflow-hidden hover-lift">
                <div className="aspect-video">
                  <img 
                    src={value.image} 
                    alt={value.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
            <div className="rounded-2xl overflow-hidden neo-shadow order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Chef preparing food"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-3xl font-semibold">Meet Our Team</h2>
              <p className="text-muted-foreground leading-relaxed">
                Behind every delicious dish at Saawariya Rasoi is a team of passionate individuals dedicated to creating exceptional culinary experiences.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our chefs bring decades of combined experience, each specializing in different regional cuisines of India. Led by Chef Rajesh Kumar, they work together to maintain the authenticity of our traditional recipes while occasionally introducing creative twists.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our service staff is equally committed to ensuring that whether you're dining in, taking away, or ordering delivery, your Saawariya Rasoi experience is always memorable.
              </p>
            </div>
          </div>
          
          <div className="glass-morphism rounded-2xl p-10 text-center mb-12">
            <h2 className="text-3xl font-semibold mb-6">Experience Saawariya Rasoi Today</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Whether you choose to visit us in person, order takeaway, or have our delicious food delivered to your doorstep, we look forward to sharing our passion for authentic Indian cuisine with you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/menu" 
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:brightness-105 hover-lift"
              >
                Explore Our Menu
                <ArrowRight size={18} />
              </Link>
              <Link 
                to="/contact" 
                className="flex items-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-full font-medium hover:bg-secondary/80"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
