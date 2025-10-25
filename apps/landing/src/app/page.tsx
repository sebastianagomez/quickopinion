import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Benefits } from '@/components/Benefits';
import { DemoLive } from '@/components/DemoLive';
import { ContactForm } from '@/components/ContactForm';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <Benefits />
      <DemoLive />
      <ContactForm />
      <FAQ />
      <Footer />
    </div>
  );
}
