
import React from 'react';
import Layout from '@/components/Layout';

const Privacy = () => {
  return (
    <Layout>
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 smooth-appear">
            <h1 className="text-4xl font-bold mt-4 mb-6 font-brand">
              Privacy <span className="brand-text-gradient">Policy</span>
            </h1>
            <p className="text-muted-foreground">
              Last updated: November 1, 2023
            </p>
          </div>
          
          <div className="glass-morphism rounded-xl p-8 space-y-6 smooth-appear" style={{ animationDelay: '0.2s' }}>
            <div>
              <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground">
                Welcome to Saawariya Rasoi. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">2. The Data We Collect About You</h2>
              <p className="text-muted-foreground mb-4">
                Personal data, or personal information, means any information about an individual from which that person can be identified. It does not include data where the identity has been removed (anonymous data).
              </p>
              <p className="text-muted-foreground">
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Identity Data includes first name, last name, username or similar identifier.</li>
                <li>Contact Data includes billing address, delivery address, email address and telephone numbers.</li>
                <li>Transaction Data includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                <li>Technical Data includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                <li>Profile Data includes your username and password, purchases or orders made by you, your preferences, feedback and survey responses.</li>
                <li>Usage Data includes information about how you use our website, products and services.</li>
                <li>Marketing and Communications Data includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">3. How We Use Your Personal Data</h2>
              <p className="text-muted-foreground mb-4">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">5. Your Legal Rights</h2>
              <p className="text-muted-foreground mb-4">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Request access to your personal data.</li>
                <li>Request correction of your personal data.</li>
                <li>Request erasure of your personal data.</li>
                <li>Object to processing of your personal data.</li>
                <li>Request restriction of processing your personal data.</li>
                <li>Request transfer of your personal data.</li>
                <li>Right to withdraw consent.</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">6. Cookies</h2>
              <p className="text-muted-foreground">
                Cookies are small text files that are placed on your computer by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site. We use cookies to personalize content and ads, to provide social media features and to analyze our traffic. We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information you've provided to them or they've collected from your use of their services.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">7. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last updated" date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">8. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this privacy policy, please contact us at:
              </p>
              <div className="mt-2">
                <p className="text-foreground">Saawariya Rasoi</p>
                <p className="text-muted-foreground">123 Culinary Street, Flavor Town, FT 12345</p>
                <p className="text-muted-foreground">Email: privacy@saawariyarasoi.com</p>
                <p className="text-muted-foreground">Phone: +91 123 456 7890</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
