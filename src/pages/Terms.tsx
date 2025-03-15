
import React from 'react';
import Layout from '@/components/Layout';

const Terms = () => {
  return (
    <Layout>
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 smooth-appear">
            <h1 className="text-4xl font-bold mt-4 mb-6 font-brand">
              Terms of <span className="brand-text-gradient">Service</span>
            </h1>
            <p className="text-muted-foreground">
              Last updated: November 1, 2023
            </p>
          </div>
          
          <div className="glass-morphism rounded-xl p-8 space-y-6 smooth-appear" style={{ animationDelay: '0.2s' }}>
            <div>
              <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground">
                Welcome to Saawariya Rasoi. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Saawariya Rasoi's website if you do not accept all of the terms and conditions stated on this page.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">2. License to Use Website</h2>
              <p className="text-muted-foreground mb-4">
                Unless otherwise stated, Saawariya Rasoi and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may view and/or print pages from https://www.saawariyarasoi.com for your own personal use subject to restrictions set in these terms and conditions.
              </p>
              <p className="text-muted-foreground">
                You must not:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Republish material from this website</li>
                <li>Sell, rent or sub-license material from this website</li>
                <li>Reproduce, duplicate or copy material from this website</li>
                <li>Redistribute content from Saawariya Rasoi (unless content is specifically made for redistribution)</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">3. Ordering and Delivery</h2>
              <p className="text-muted-foreground mb-4">
                3.1 All orders placed through our website or via third-party platforms like Zomato are subject to availability and acceptance.
              </p>
              <p className="text-muted-foreground mb-4">
                3.2 Delivery times provided are estimates and may vary based on traffic conditions, weather, and other factors beyond our control.
              </p>
              <p className="text-muted-foreground mb-4">
                3.3 We reserve the right to refuse service to anyone for any reason at any time.
              </p>
              <p className="text-muted-foreground">
                3.4 By placing an order, you confirm that all the information provided is accurate and complete.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">4. Payment and Pricing</h2>
              <p className="text-muted-foreground mb-4">
                4.1 All prices listed on our website are in Indian Rupees (INR) and include applicable taxes.
              </p>
              <p className="text-muted-foreground mb-4">
                4.2 We reserve the right to change our prices at any time without prior notice.
              </p>
              <p className="text-muted-foreground mb-4">
                4.3 Payment can be made through various methods as indicated on our website or through the third-party platform you use to place your order.
              </p>
              <p className="text-muted-foreground">
                4.4 All payments are processed securely through trusted payment gateways.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">5. Cancellations and Refunds</h2>
              <p className="text-muted-foreground mb-4">
                5.1 Orders can be cancelled within 5 minutes of placing them. After this time, cancellation may not be possible as food preparation may have begun.
              </p>
              <p className="text-muted-foreground mb-4">
                5.2 For issues with food quality, missing items, or other concerns, please contact us within 30 minutes of receiving your order.
              </p>
              <p className="text-muted-foreground">
                5.3 Refunds, if applicable, will be processed within 5-7 business days through the original payment method.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">6. User Conduct</h2>
              <p className="text-muted-foreground">
                When using our website or interacting with our services, you agree not to engage in any harmful, offensive, or illegal activities, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Using the website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.</li>
                <li>Using this website in any way that is unlawful, illegal, fraudulent or harmful.</li>
                <li>Using this website for any purpose related to marketing without our express written consent.</li>
                <li>Harassing, threatening, or intimidating any other users or our staff.</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                In no event shall Saawariya Rasoi, nor any of its officers, directors and employees, be liable for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort or otherwise. Saawariya Rasoi, including its officers, directors and employees shall not be liable for any indirect, consequential or special liability arising out of or in any way related to your use of this website.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">8. Changes to These Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Your continued use of the website after any changes indicates your acceptance of the modified terms.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">9. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-2">
                <p className="text-foreground">Saawariya Rasoi</p>
                <p className="text-muted-foreground">123 Culinary Street, Flavor Town, FT 12345</p>
                <p className="text-muted-foreground">Email: legal@saawariyarasoi.com</p>
                <p className="text-muted-foreground">Phone: +91 123 456 7890</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
