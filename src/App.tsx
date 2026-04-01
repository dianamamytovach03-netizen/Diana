import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Stars, Sparkles, Gift, Music, Quote, Send, ExternalLink, Shield, TrendingUp, Award, Clock, Globe, BookOpen, Map, Camera } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini for "extra" special wishes
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const phrases = [
  "Твой взгляд — мой любимый океан, в котором я хочу тонуть.",
  "Моё сердце бьется в ритме твоей любви.",
  "Ты — мой самый лучший человек, мой дом и моя опора.",
  "Твоё спокойствие — это магия, которая согревает мою душу.",
  "С тобой каждое мгновение превращается в вечность.",
  "Я выбираю тебя. Сегодня, завтра и в каждой жизни.",
  "Твоя улыбка — мой самый яркий рассвет.",
  "В твоих руках я чувствую себя в полной безопасности.",
  "Ты — лучшее, что когда-либо случалось со мной.",
  "Люблю тебя больше, чем слова могут описать.",
  "Ты — тишина среди шума, мой покой и моя радость.",
  "В тебе я нашла всё, что когда-либо искала.",
  "Твоя сила — в твоей доброте, а твоя мудрость — в твоём сердце."
];

export default function App() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [aiWish, setAiWish] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const generateSpecialWish = async () => {
    setIsGenerating(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Напиши ОЧЕНЬ короткое (1-2 предложения), но максимально глубокое и романтичное поздравление с днем рождения для Адилета. Сделай акцент на его спокойствии, силе и том, как он важен. Это должно быть поэтично и лаконично.",
      });
      setAiWish(response.text || "");
    } catch (error) {
      console.error("Error generating wish:", error);
      setAiWish("Адилет, ты — мой мир. Пусть твоё спокойствие ведет тебя к великим победам. С днем рождения, любимый!");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffcf9] text-[#4a3728] font-serif selection:bg-rose-100 selection:text-rose-900 overflow-x-hidden">
      {/* Hero Section - Warm & Aesthetic */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-50/50 via-transparent to-transparent" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center z-10"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="inline-block mb-8 relative"
          >
            <Heart className="w-20 h-20 text-rose-400 fill-rose-400 drop-shadow-2xl" />
            <motion.div 
              animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-rose-300 rounded-full blur-2xl -z-10"
            />
          </motion.div>
          
          <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight text-[#2d1e1e]">
            С Днем Рождения, <br />
            <span className="text-rose-500 italic">Адилет!</span>
          </h1>
          
          <div className="mb-8">
            <span className="px-8 py-3 bg-rose-500 text-white rounded-full text-2xl font-bold tracking-[0.2em] shadow-xl shadow-rose-200">
              01.04.03
            </span>
          </div>
          
          <p className="text-xl md:text-2xl opacity-60 max-w-2xl mx-auto italic font-light leading-relaxed">
            «Там ничего лишнего. Только мы.»
          </p>
        </motion.div>

        {/* Floating Hearts & Stars */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: "110%",
                opacity: Math.random() * 0.5 + 0.2
              }}
              animate={{ 
                y: "-10%",
                x: (Math.random() * 100) + "%",
                rotate: 360
              }}
              transition={{ 
                duration: Math.random() * 20 + 10, 
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10
              }}
              className="absolute"
            >
              {i % 3 === 0 ? <Heart className="text-rose-300 w-6 h-6 fill-rose-200" /> : 
               i % 3 === 1 ? <Stars className="text-amber-300 w-4 h-4" /> : 
               <Sparkles className="text-rose-200 w-5 h-5" />}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Romantic Phrases Section */}
      <section className="py-40 bg-white/50 backdrop-blur-sm relative">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Quote className="w-12 h-12 mx-auto mb-12 text-rose-200" />
          <div className="h-48 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentPhraseIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1.2, ease: "anticipate" }}
                className="text-3xl md:text-5xl font-light italic leading-tight text-rose-900/80"
              >
                {phrases[currentPhraseIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Photo & Character Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-rose-100 rounded-[3rem] rotate-3 blur-sm opacity-50" />
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://picsum.photos/seed/adilet/800/1000" 
                alt="Adilet" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 to-transparent" />
              <div className="absolute bottom-10 left-10 text-white pr-10">
                <h3 className="text-4xl font-bold leading-tight">Ты как океан: глубокий, спокойный и бесконечный.</h3>
              </div>
            </div>
          </motion.div>

          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold leading-tight text-[#2d1e1e]">Твоя душа — мой <br /><span className="text-rose-500 italic">самый красивый маршрут</span></h2>
              <p className="text-2xl opacity-70 leading-relaxed font-light italic">
                Твоё спокойствие — это моя опора. Я восхищаюсь тем, как ты строишь свою карьеру, как ты любишь путешествовать и открывать новые горизонты, и как терпеливо принимаешь мой непростой характер. Ты — настоящий мужчина, пример силы и доброты.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-[2.5rem] shadow-xl shadow-rose-100/50 border border-rose-50">
                <Shield className="text-rose-400 w-8 h-8 mb-4" />
                <h4 className="text-xl font-bold mb-2">Спокойствие</h4>
                <p className="opacity-60 italic">Твоя главная сила в любой ситуации.</p>
              </div>
              <div className="p-8 bg-white rounded-[2.5rem] shadow-xl shadow-rose-100/50 border border-rose-50">
                <TrendingUp className="text-rose-400 w-8 h-8 mb-4" />
                <h4 className="text-xl font-bold mb-2">Успех</h4>
                <p className="opacity-60 italic">Результат твоего труда и ума.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-2xl font-medium text-[#2d1e1e] opacity-80">
                  У каждой песни есть свой смысл. <br />
                  У этой — <span className="text-rose-500">ты</span>.
                </p>
                <p className="text-xl font-light text-[#2d1e1e] opacity-60 italic">
                  Есть песня, которую я слушаю снова и снова. <br />
                  И каждый раз она напоминает мне о тебе. <br />
                  Теперь она навсегда связана с тобой.
                </p>
              </div>
              <a 
                href="https://youtu.be/KhHnCrOjw1k?si=D2ac6r6O-qKj9b5Z" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 bg-[#2d1e1e] text-white px-10 py-5 rounded-full hover:bg-rose-600 transition-all shadow-2xl group"
              >
                <Music className="w-6 h-6 group-hover:animate-bounce" />
                <span className="font-bold text-lg">Слушать нашу песню</span>
                <ExternalLink className="w-4 h-4 opacity-50" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AI Wish Generator - Aesthetic Card */}
      <section className="py-32 bg-[#fffcf9]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-rose-100 border border-rose-50 relative overflow-hidden text-center"
          >
            <div className="absolute top-0 right-0 p-12 opacity-[0.05]">
              <Sparkles className="w-64 h-64 text-rose-500" />
            </div>
            
            <div className="relative z-10 space-y-10">
              <div className="inline-block p-5 bg-rose-50 rounded-3xl mb-4">
                <Gift className="text-rose-500 w-10 h-10" />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-[#2d1e1e]">Послание от сердца</h3>
              <p className="text-xl opacity-60 font-light max-w-2xl mx-auto">
                Нажми на кнопку, чтобы получить короткое, но очень важное пожелание, созданное специально для тебя.
              </p>
              
              <button
                onClick={generateSpecialWish}
                disabled={isGenerating}
                className="group relative inline-flex items-center gap-4 bg-rose-500 text-white px-12 py-6 rounded-full overflow-hidden transition-all hover:bg-rose-600 disabled:opacity-50 shadow-xl shadow-rose-200"
              >
                <span className="relative z-10 font-bold text-xl">
                  {isGenerating ? "Создаю магию..." : "Получить пожелание"}
                </span>
                <Send className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
              </button>

              <AnimatePresence>
                {aiWish && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-16 p-10 bg-rose-50/30 rounded-[3rem] border border-rose-100 shadow-inner"
                  >
                    <Quote className="w-10 h-10 text-rose-200 mb-6 mx-auto" />
                    <p className="text-2xl md:text-3xl text-rose-900 font-light italic leading-relaxed">
                      {aiWish}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Secret Message Section */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSecret(!showSecret)}
            className="group relative inline-flex items-center gap-4 px-12 py-6 rounded-full border-2 border-rose-200 hover:border-rose-500 transition-all"
          >
            <Heart className={`w-6 h-6 transition-all ${showSecret ? 'text-rose-500 fill-rose-500 scale-125' : 'text-rose-200'}`} />
            <span className="text-xl font-bold tracking-widest uppercase text-[#2d1e1e]">
              {showSecret ? "Закрыть моё сердце" : "Открыть моё сердце"}
            </span>
          </motion.button>

          <AnimatePresence>
            {showSecret && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="mt-16 p-12 md:p-20 bg-gradient-to-br from-[#2d1e1e] to-[#4a3728] text-white rounded-[4rem] text-left relative overflow-hidden shadow-2xl"
              >
                <div className="relative z-10 space-y-12">
                  <div className="space-y-4">
                    <h5 className="text-5xl md:text-6xl font-bold text-rose-400 tracking-tighter">Адилет, мой самый лучший...</h5>
                    <div className="h-1 w-20 bg-rose-500/30" />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <p className="text-2xl font-light opacity-90 leading-relaxed italic">
                        Я искренне рада, что ты есть в моей жизни. Ты — больше, чем просто человек для меня. Ты — моё спокойствие, моё место силы. 
                      </p>
                      <p className="text-2xl font-light opacity-90 leading-relaxed italic">
                        Спасибо тебе за то, что ты терпишь мой характер, мои капризы и мои плохие дни. Ты никогда не ругаешь меня, ты всегда рядом.
                      </p>
                    </div>
                    <div className="space-y-8">
                      <p className="text-2xl font-light opacity-90 leading-relaxed italic">
                        Я вижу, как ты работаешь, как ты успешен, и это вызывает у меня бесконечную гордость. Я хочу, чтобы мы объездили весь мир вместе.
                      </p>
                      <p className="text-2xl font-light opacity-90 leading-relaxed italic">
                        Я выбираю тебя сегодня и всегда. С тобой я — это я. Ты — мой наставник, мой лучший друг и моя единственная любовь.
                      </p>
                    </div>
                  </div>

                  <div className="pt-12 border-t border-white/10">
                    <div className="flex flex-wrap gap-8 items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Heart className="text-rose-500 fill-rose-500 w-12 h-12" />
                        <span className="text-4xl font-bold italic text-rose-400">Твоя навсегда.</span>
                      </div>
                      <div className="flex gap-4 opacity-30">
                        <Globe className="w-8 h-8" />
                        <BookOpen className="w-8 h-8" />
                        <Map className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Globe className="absolute -bottom-20 -right-20 w-[30rem] h-[30rem] text-white/5 rotate-12" />
                <div className="absolute top-10 left-10 opacity-5">
                  <Heart className="w-32 h-32 fill-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 text-center border-t border-rose-50">
        <p className="text-xs tracking-[0.8em] uppercase opacity-20">
          ADILET • LOVE • SUCCESS • 2026
        </p>
      </footer>
    </div>
  );
}





