import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Car,
  Home,
  Heart,
  Building,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ArrowRight,
  Star,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

function TurkishInsuranceLanding() {
  const EMAIL_ACTIVE = true; // Deneme modu - gerçek mail gönderimi aktif
  const EMAIL_TO = "kimtassigorta@gmail.com";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("theme");
    if (stored === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else if (stored === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isDark) {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleThemeToggle = () => setIsDark((prev) => !prev);
  const openServiceForm = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsServiceModalOpen(true);
  };
  const closeServiceForm = () => {
    setIsServiceModalOpen(false);
    setSelectedService(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!api) return;

    const id = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent((prev) => prev + 1);
      }
    }, 4000);

    return () => clearTimeout(id);
  }, [api, current]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const services = [
    {
      icon: <Car className="h-10 w-10 text-primary" />,
      title: "Trafik Sigortası",
      description:
        "Zorunlu trafik sigortası ile aracınızı ve kendinizi güvence altına alın. En uygun fiyatlarla hızlı teklif alın.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Kasko Sigortası",
      description:
        "Aracınızı her türlü hasara karşı koruyun. Kapsamlı kasko sigortası ile güvenle yola çıkın.",
    },
    {
      icon: <Home className="h-10 w-10 text-primary" />,
      title: "DASK",
      description:
        "Doğal afet sigortası ile konutunuzu deprem ve diğer doğal afetlere karşı güvence altına alın.",
    },
    {
      icon: <Building className="h-10 w-10 text-primary" />,
      title: "Konut Sigortası",
      description:
        "Evinizi yangın, hırsızlık ve diğer risklere karşı koruyun. Kapsamlı konut sigortası çözümleri.",
    },
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: "Sağlık Sigortası",
      description:
        "Sağlığınız için en iyi teminatları sunuyoruz. Özel sağlık sigortası ile geleceğinizi güvence altına alın.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "İşyeri Sigortası",
      description:
        "İşletmenizi her türlü riske karşı koruyun. Kapsamlı işyeri sigortası çözümleri sunuyoruz.",
    },
  ];

  const serviceFieldConfig: Record<
    string,
    { 
      label: string; 
      name: string; 
      type?: string; 
      textarea?: boolean;
      required?: boolean;
      special?: 'phone' | 'tc' | 'plate' | 'ruhsat';
    }[]
  > = {
    "Trafik Sigortası": [
      { label: "Telefon Numarası", name: "phone", type: "tel", required: true, special: 'phone' },
      { label: "E-posta Adresi (opsiyonel)", name: "email", type: "email", required: false },
      { label: "Plaka", name: "plate", required: true, special: 'plate' },
      { label: "T.C. Kimlik Numarası", name: "tc", required: true, special: 'tc' },
      { label: "Ruhsat Belge Seri No:", name: "ruhsat", required: true, special: 'ruhsat' },
    ],
    "Kasko Sigortası": [
      { label: "Telefon Numarası", name: "phone", type: "tel", required: true, special: 'phone' },
      { label: "E-posta Adresi (opsiyonel)", name: "email", type: "email", required: false },
      { label: "T.C. Kimlik Numarası", name: "tc", required: true, special: 'tc' },
      { label: "Plaka", name: "plate", required: true, special: 'plate' },
    ],
    DASK: [
      { label: "Telefon Numarası", name: "phone", type: "tel", required: true, special: 'phone' },
      { label: "E-posta Adresi (opsiyonel)", name: "email", type: "email", required: false },
      { label: "Adres (Açık ve net)", name: "address", textarea: true, required: true },
      { label: "Kaç m²", name: "area", required: true },
      { label: "T.C. Kimlik Numarası", name: "tc", required: true, special: 'tc' },
    ],
    "Sağlık Sigortası": [
      { label: "Telefon Numarası", name: "phone", type: "tel", required: true, special: 'phone' },
      { label: "E-posta Adresi (opsiyonel)", name: "email", type: "email", required: false },
      { label: "T.C. Kimlik Numarası", name: "tc", required: true, special: 'tc' },
      { label: "Doğum Tarihi", name: "dob", type: "date", required: true },
      { label: "Boy (cm)", name: "height", required: true },
      { label: "Kilo (kg)", name: "weight", required: true },
    ],
    "Konut Sigortası": [
      { label: "Telefon Numarası", name: "phone", type: "tel", required: true, special: 'phone' },
      { label: "E-posta Adresi (opsiyonel)", name: "email", type: "email", required: false },
      { label: "T.C. Kimlik Numarası", name: "tc", required: true, special: 'tc' },
      { label: "Açık Adres", name: "address", textarea: true, required: true },
      { label: "Konut Bedeli", name: "homeValue", required: true },
      { label: "Eşya Bedeli", name: "contentValue", required: true },
    ],
    "İşyeri Sigortası": [
      { label: "Telefon Numarası", name: "phone", type: "tel", required: true, special: 'phone' },
      { label: "E-posta Adresi (opsiyonel)", name: "email", type: "email", required: false },
      { label: "T.C. Kimlik Numarası", name: "tc", required: true, special: 'tc' },
      { label: "İşyeri Adı", name: "businessName", required: true },
      { label: "İşyeri Adresi", name: "businessAddress", textarea: true, required: true },
    ],
  };

  const advantages = [
    {
      title: "Hızlı Teklif",
      description: "Dakikalar içinde en uygun sigorta teklifini alın",
    },
    {
      title: "Güvenilir Hizmet",
      description: "20+ yıllık tecrübe ile yanınızdayız",
    },
    {
      title: "Uygun Fiyat",
      description:
        "Tüm sigorta şirketlerini karşılaştırıp en uygun fiyatı buluyoruz",
    },
    {
      title: "7/24 Destek",
      description: "Her zaman ulaşabileceğiniz müşteri hizmetleri",
    },
  ];

  const testimonials = [
    {
      name: "Ahmet Yılmaz",
      role: "İstanbul",
      text: "Kasko sigortam için en uygun teklifi aldım. Çok memnun kaldım, herkese tavsiye ederim.",
    },
    {
      name: "Ayşe Demir",
      role: "Ankara",
      text: "Profesyonel ve güler yüzlü hizmet. DASK sigortamı çok hızlı bir şekilde yaptırdım.",
    },
    {
      name: "Mehmet Kaya",
      role: "İzmir",
      text: "Yıllardır çalıştığım sigorta acentesi. Güvenilir ve kaliteli hizmet sunuyorlar.",
    },
    {
      name: "Fatma Şahin",
      role: "Bursa",
      text: "Sağlık sigortam için çok detaylı bilgi verdiler. Teşekkür ederim.",
    },
    {
      name: "Ali Öztürk",
      role: "Antalya",
      text: "Trafik sigortamı yenilemek için aradım, hem ucuz hem de hızlı işlem yaptılar.",
    },
  ];

  const partnerCompanies = [
    {
      name: "Anadolu Sigorta",
      logo: "/logos/anadolu-sigorta.png",
      url: "https://www.anadolusigorta.com.tr/",
      heightClass: "h-8 md:h-9 lg:h-10",
    },
    {
      name: "Türkiye Sigorta",
      logo: "/logos/turkiye-sigorta.png",
      url: "https://www.turkiyesigorta.com.tr/",
      heightClass: "h-8 md:h-9 lg:h-10",
    },
    {
      name: "HDI Sigorta",
      logo: "/logos/hdi-sigorta.png",
      url: "https://www.hdisigorta.com.tr/",
      heightClass: "h-10 md:h-12 lg:h-14",
    },
    {
      name: "Sompo Sigorta",
      logo: "/logos/sompo-sigorta.png",
      url: "https://www.somposigorta.com.tr/",
      heightClass: "h-11 md:h-13 lg:h-16",
    },
    {
      name: "Neova Sigorta",
      logo: "/logos/neova-sigorta.png",
      url: "https://www.neova.com.tr/",
      heightClass: "h-13 md:h-15 lg:h-13",
    },
    {
      name: "Bereket Sigorta",
      logo: "/logos/bereket-sigorta.png",
      url: "https://www.bereketsigorta.com.tr/",
      heightClass: "h-11 md:h-13 lg:h-16",
    },
    {
      name: "Hepiyi Sigorta",
      logo: "/logos/hepiyi-sigorta.png",
      url: "https://hepiyi.com.tr/",
      heightClass: "h-10 md:h-12 lg:h-14",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
          scrollY > 50 ? "shadow-md" : ""
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center space-x-3 focus:outline-none"
              aria-label="Ana sayfa"
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="h-10 w-10 rounded-full bg-background border border-border dark:bg-primary dark:border-transparent flex items-center justify-center overflow-hidden"
              >
                <img
                  src="/logo.png"
                  alt="Kimtaş Sigorta Logosu"
                  className="h-9 w-9 rounded-full object-cover"
                />
              </motion.div>
              <span className="font-bold text-xl">Kimtaş Sigorta</span>
            </button>
          </div>
          <nav className="hidden md:flex gap-6">
            <a
              href="#services"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Hizmetler
            </a>
            <a
              href="#advantages"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Avantajlar
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Referanslar
            </a>
            <a
              href="#partners"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Sigorta Şirketleri
            </a>
            <a
              href="#contact"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              İletişim
            </a>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={handleThemeToggle}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label={isDark ? "Açık mod" : "Karanlık mod"}
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <Button 
              size="sm" 
              className="rounded-full"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Teklif Al
            </Button>
          </div>
          <button className="flex md:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menüyü aç</span>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background md:hidden"
        >
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToTop();
                }}
                className="flex items-center space-x-3 focus:outline-none"
                aria-label="Ana sayfa"
              >
                <div className="h-10 w-10 rounded-full bg-background border border-border dark:bg-primary dark:border-transparent flex items-center justify-center overflow-hidden">
                  <img
                    src="/logo.png"
                    alt="Kimtaş Sigorta Logosu"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                </div>
                <span className="font-bold text-xl">Kimtaş Sigorta</span>
              </button>
            </div>
            <button onClick={toggleMenu}>
              <X className="h-6 w-6" />
              <span className="sr-only">Menüyü kapat</span>
            </button>
          </div>
          <motion.nav
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="container grid gap-3 pb-8 pt-6"
          >
            {[
              { label: "Hizmetler", href: "#services" },
              { label: "Avantajlar", href: "#advantages" },
              { label: "Referanslar", href: "#testimonials" },
              { label: "Sigorta Şirketleri", href: "#partners" },
              { label: "İletişim", href: "#contact" },
            ].map((item) => (
              <motion.div key={item.href} variants={itemFadeIn}>
                <a
                  href={item.href}
                  className="flex items-center justify-between rounded-full px-4 py-3 text-lg font-medium hover:bg-accent"
                  onClick={toggleMenu}
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            ))}
            <motion.div variants={itemFadeIn} className="pt-4">
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleThemeToggle}
                  className="inline-flex h-10 w-full items-center justify-center rounded-full border border-border bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-sm"
                  aria-label={isDark ? "Açık mod" : "Karanlık mod"}
                >
                  {isDark ? (
                    <>
                      <Sun className="h-4 w-4 mr-2" />
                      Açık Mod
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 mr-2" />
                      Karanlık Mod
                    </>
                  )}
                </button>
                <Button 
                  className="w-full rounded-full"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  Teklif Al
                </Button>
              </div>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center rounded-full bg-muted px-4 py-1 text-sm"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Güvenilir Sigorta Çözümleri
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                  >
                    Geleceğinizi{" "}
                    <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                      Güvence Altına Alın
                    </span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="max-w-[600px] text-muted-foreground md:text-xl"
                  >
                    Trafik sigortası, kasko, DASK ve daha fazlası için en uygun
                    teklifleri alın. 20 yıllık tecrübemizle yanınızdayız.
                  </motion.p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <Button 
                    size="lg" 
                    className="rounded-full group"
                    onClick={() => {
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Hemen Teklif Al
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </motion.span>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full"
                    onClick={() => setIsPhoneModalOpen(true)}
                  >
                    Bizi Arayın
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center justify-center"
              >
                <div className="relative h-[350px] w-full md:h-[450px] lg:h-[500px] rounded-3xl bg-gradient-to-br from-primary/20 to-blue-600/20 flex items-center justify-center">
                  <Shield className="h-48 w-48 text-primary/40" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/30"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-4 md:px-6"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary"
                >
                  Hizmetlerimiz
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  Sigorta Çözümlerimiz
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mx-auto max-w-[900px] text-muted-foreground md:text-xl"
                >
                  İhtiyacınıza uygun sigorta ürünleri ile güvende olun
                </motion.p>
              </div>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
            >
              {services.map((service) => (
                <motion.button
                  type="button"
                  key={service.title}
                  variants={itemFadeIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden rounded-3xl border p-6 shadow-sm transition-all hover:shadow-md bg-background text-left"
                  onClick={() => openServiceForm(service.title)}
                >
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300" />
                  <div className="relative space-y-3">
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">
                      Hemen Teklif alın
                    </span>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </motion.div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Advantages Section */}
        <section
          id="advantages"
          className="w-full py-12 md:py-24 lg:py-32"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-4 md:px-6"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary"
                >
                  Avantajlarımız
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  Neden Bizi Tercih Etmelisiniz?
                </motion.h2>
              </div>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
              {advantages.map((advantage) => (
                <motion.div
                  key={advantage.title}
                  variants={itemFadeIn}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center text-center p-6 rounded-3xl border bg-card"
                >
                  <CheckCircle className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-lg font-bold mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {advantage.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/30"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary"
                >
                  Müşteri Yorumları
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  Müşterilerimiz Ne Diyor?
                </motion.h2>
              </div>
            </div>
            <Carousel setApi={setApi} className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem
                    className="md:basis-1/2 lg:basis-1/2"
                    key={testimonial.name}
                  >
                    <div className="bg-background rounded-3xl h-full p-6 shadow-sm border flex flex-col justify-between">
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-6">
                        {testimonial.text}
                      </p>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage alt={testimonial.name} />
                          <AvatarFallback>
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* Partner Companies Section */}
        <section
          id="partners"
          className="w-full py-12 md:py-24 lg:py-32 bg-background"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-4 md:px-6"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary"
                >
                  Çözüm Ortaklarımız
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  Anlaşmalı Olduğumuz Sigorta Şirketleri
                </motion.h2>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-center gap-8 md:gap-12 overflow-x-auto pb-4 md:pb-2 scrollbar-none snap-x snap-mandatory">
                {partnerCompanies.map((company) => (
                  <a
                    key={company.name}
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 snap-center flex items-center justify-center"
                    aria-label={company.name}
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className={`${company.heightClass ?? "h-10 md:h-12 lg:h-14"} w-auto object-contain transition-transform duration-200 hover:scale-[1.03]`}
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact/Quote Form Section */}
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary">
                İletişim
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Hemen Teklif Alın
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Size en uygun sigorta teklifini hazırlayalım. Formu doldurun, en
                kısa sürede size dönelim.
              </p>
              <div className="space-y-4 pt-4">
                <motion.a
                  href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x14c9480ea78ba161:0x93a27d0cf12fb813?sa=X&ved=1t:8290&hl=tr&gl=TR&ictx=111"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className="rounded-full bg-muted p-2">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Adres</h3>
                    <p className="text-sm text-muted-foreground">
                    Mecidiye, Abdurrahman Paşa Cd., 43050 Kütahya
                    <br />
                    (Sevgi Yolu Evkur İş merkezi 2. Kat)
                    </p>
                  </div>
                </motion.a>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3"
                >
                  <div className="rounded-full bg-muted p-2">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">E-posta</h3>
                    <p className="text-sm text-muted-foreground">
                    kimtassigorta@gmail.com
                    </p>
                  </div>
                </motion.div>
                <motion.button
                  type="button"
                  onClick={() => setIsPhoneModalOpen(true)}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 cursor-pointer hover:opacity-80 transition-opacity w-full text-left"
                >
                  <div className="rounded-full bg-muted p-2">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Telefon</h3>
                    <p className="text-sm text-muted-foreground">
                    0274 224 33 51 / 0536 436 32 45 / 0533 334 26 25
                    </p>
                  </div>
                </motion.button>
                <div className="mt-4 rounded-3xl overflow-hidden border bg-muted/30 h-[220px] md:h-[260px]">
                  <iframe
                    title="Kimtaş Sigorta Konum"
                    src="https://www.google.com/maps?q=Mecidiye,+Abdurrahman+Pa%C5%9Fa+Cd.,+43050+K%C3%BCtahya&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full border-0"
                  ></iframe>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border bg-card p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold mb-2">Teklif Formu</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Bilgilerinizi doldurun, size en uygun teklifi hazırlayalım.
              </p>
              <form 
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  
                  // Form verilerini al
                  const firstName = String(formData.get("firstName") || "").trim();
                  const lastName = String(formData.get("lastName") || "").trim();
                  const email = String(formData.get("email") || "").trim();
                  const phone = String(formData.get("phone") || "").trim();
                  const message = String(formData.get("message") || "").trim();
                  
                  // Validasyon
                  if (!firstName) {
                    alert("Ad alanı zorunludur.");
                    return;
                  }
                  
                  if (!lastName) {
                    alert("Soyad alanı zorunludur.");
                    return;
                  }
                  
                  if (!phone) {
                    alert("Telefon numarası zorunludur.");
                    return;
                  }
                  
                  // Telefon validasyonu (10 haneli rakam)
                  const phoneRegex = /^[0-9]{10}$/;
                  if (!phoneRegex.test(phone)) {
                    alert("Telefon numarası 10 haneli rakam olmalıdır. Örnek: 5123456789");
                    return;
                  }
                  
                  // Email validasyonu (opsiyonel ama doldurulmuşsa geçerli olmalı)
                  if (email) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                      alert("Geçerli bir e-posta adresi giriniz.");
                      return;
                    }
                  }
                  
                  if (!message) {
                    alert("Mesaj alanı zorunludur.");
                    return;
                  }
                  
                  // Form verilerini hazırla
                  const data: Record<string, string> = {
                    "Ad": firstName,
                    "Soyad": lastName,
                    "Telefon": phone,
                    "Mesaj": message,
                  };
                  
                  if (email) {
                    data["E-posta"] = email;
                  }
                  
                  if (!EMAIL_ACTIVE) {
                    console.log("[EMAIL_DISABLED] Contact form request", {
                      serviceName: "İletişim Formu",
                      data,
                    });
                    alert(
                      "Şu anda deneme modundayız, bilgiler kaydedildi ama e-posta gönderilmedi."
                    );
                    (e.target as HTMLFormElement).reset();
                    return;
                  }
                  
                  try {
                    const res = await fetch("/api/send-service-request", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        serviceName: "İletişim Formu",
                        data,
                        to: EMAIL_TO,
                      }),
                    });
                    
                    if (!res.ok) {
                      throw new Error("Request failed");
                    }
                    
                    alert(
                      "Talebiniz alındı! En kısa sürede sizinle iletişime geçeceğiz."
                    );
                    (e.target as HTMLFormElement).reset();
                  } catch (error) {
                    console.error(error);
                    alert(
                      "Talebiniz gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
                    );
                  }
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium">
                      Ad <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="first-name"
                      name="firstName"
                      placeholder="Adınız"
                      className="rounded-full"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium">
                      Soyad <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="last-name"
                      name="lastName"
                      placeholder="Soyadınız"
                      className="rounded-full"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    E-posta (opsiyonel)
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="E-posta adresiniz"
                    className="rounded-full"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Telefon <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="5123456789"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    className="rounded-full"
                    required
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    }}
                  />
                  <p className="text-xs text-muted-foreground">
                    Örnek format: 5123456789 (10 haneli rakam)
                  </p>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mesajınız <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Hangi sigorta ürünü ile ilgileniyorsunuz?"
                    className="min-h-[120px] rounded-3xl"
                    required
                  />
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button type="submit" className="w-full rounded-full">
                    Teklif Al
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-muted/30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container grid gap-8 px-4 py-10 md:px-6 lg:grid-cols-3"
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="h-10 w-10 rounded-full bg-primary flex items-center justify-center"
              >
                <Shield className="h-5 w-5 text-primary-foreground" />
              </motion.div>
              <span className="font-bold text-xl">Kimtaş Sigorta</span>
            </div>
            <p className="text-sm text-muted-foreground">
              20 yıllık tecrübemizle güvenilir sigorta çözümleri sunuyoruz.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Hizmetler</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <a
                href="#services"
                className="text-muted-foreground hover:text-foreground"
              >
                Trafik Sigortası
              </a>
              <a
                href="#services"
                className="text-muted-foreground hover:text-foreground"
              >
                Kasko Sigortası
              </a>
              <a
                href="#services"
                className="text-muted-foreground hover:text-foreground"
              >
                DASK
              </a>
              <a
                href="#services"
                className="text-muted-foreground hover:text-foreground"
              >
                Sağlık Sigortası
              </a>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Kurumsal</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Hakkımızda
              </a>
              <a
                href="#contact"
                className="text-muted-foreground hover:text-foreground"
              >
                İletişim
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Gizlilik Politikası
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Kullanım Koşulları
              </a>
            </nav>
          </div>
        </motion.div>
        <div className="border-t">
          <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Kimtaş Sigorta. Tüm hakları
              saklıdır.
            </p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isServiceModalOpen && selectedService && (
          <motion.div
            key="service-modal"
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="w-full max-w-xl rounded-3xl bg-background border shadow-xl p-6 md:p-8 relative"
            >
              <button
                type="button"
                onClick={closeServiceForm}
                className="absolute right-4 top-4 rounded-full border border-border bg-muted/60 p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Kapat"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mb-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Hızlı Teklif Formu
                </p>
                <h2 className="text-2xl font-bold">
                  {selectedService} için bilgi alın
                </h2>
                <p className="text-sm text-muted-foreground">
                  Bilgilerinizi doldurun, ekibimiz sizinle en kısa sürede
                  iletişime geçsin.
                </p>
              </div>
              <form
                className="space-y-4 mt-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const data: Record<string, string> = {};
                  const fields = serviceFieldConfig[selectedService] ?? [];
                  
                  // Validasyon kontrolü
                  for (const field of fields) {
                    let value = "";
                    
                  // Plaka için özel işlem
                  if (field.special === 'plate') {
                      const plate1 = String(formData.get(`${field.name}_1`) || "").trim();
                      const plate2 = String(formData.get(`${field.name}_2`) || "").trim();
                      const plate3 = String(formData.get(`${field.name}_3`) || "").trim();
                      
                      if (field.required && (!plate1 || !plate2 || !plate3)) {
                        alert(`${field.label} alanı zorunludur. Tüm bölümleri doldurun.`);
                        return;
                      }
                      
                      if (plate1 || plate2 || plate3) {
                        value = `${plate1}-${plate2}-${plate3}`;
                        data[field.name] = value;
                      }
                      continue;
                    }

                    // Ruhsat seri no için özel işlem (ör: AB-123456)
                    if (field.special === 'ruhsat') {
                      const series = String(formData.get(`${field.name}_series`) || "").trim();
                      const number = String(formData.get(`${field.name}_number`) || "").trim();

                      if (field.required && (!series || !number)) {
                        alert(`${field.label} alanı zorunludur. Tüm bölümleri doldurun.`);
                        return;
                      }

                      if (series || number) {
                        const seriesRegex = /^[A-Za-z]{2}$/;
                        const numberRegex = /^[0-9]{6}$/;

                        if (!seriesRegex.test(series)) {
                          alert("Ruhsat seri kısmı 2 harf olmalıdır. Örnek: AB");
                          return;
                        }

                        if (!numberRegex.test(number)) {
                          alert("Ruhsat belge numarası 6 haneli rakam olmalıdır. Örnek: 123456");
                          return;
                        }

                        value = `${series}-${number}`;
                        data[field.name] = value;
                      }
                      continue;
                    }
                    
                    value = String(formData.get(field.name) || "").trim();
                    
                    // Zorunlu alan kontrolü
                    if (field.required && !value) {
                      alert(`${field.label} alanı zorunludur.`);
                      return;
                    }
                    
                    // Özel validasyonlar
                    if (field.special === 'phone' && value) {
                      const phoneRegex = /^[0-9]{10}$/;
                      if (!phoneRegex.test(value)) {
                        alert("Telefon numarası 10 haneli rakam olmalıdır. Örnek: 5123456789");
                        return;
                      }
                    }
                    
                    if (field.special === 'tc' && value) {
                      const tcRegex = /^[0-9]{11}$/;
                      if (!tcRegex.test(value)) {
                        alert("T.C. Kimlik Numarası 11 haneli rakam olmalıdır.");
                        return;
                      }
                    }
                    
                    // E-posta validasyonu (opsiyonel ama doldurulmuşsa geçerli olmalı)
                    if (field.type === 'email' && value) {
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (!emailRegex.test(value)) {
                        alert("Geçerli bir e-posta adresi giriniz.");
                        return;
                      }
                    }
                    
                    if (value) {
                      data[field.name] = value;
                    }
                  }

                  if (!EMAIL_ACTIVE) {
                    console.log("[EMAIL_DISABLED] Service request", {
                      serviceName: selectedService,
                      data,
                    });
                    alert(
                      "Şu anda deneme modundayız, bilgiler kaydedildi ama e-posta gönderilmedi."
                    );
                    closeServiceForm();
                    return;
                  }

                  try {
                    const res = await fetch("/api/send-service-request", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        serviceName: selectedService,
                        data,
                        to: EMAIL_TO,
                      }),
                    });

                    if (!res.ok) {
                      throw new Error("Request failed");
                    }

                    alert(
                      "Talebiniz alındı! En kısa sürede sizinle iletişime geçeceğiz."
                    );
                    closeServiceForm();
                  } catch (error) {
                    console.error(error);
                    alert(
                      "Talebiniz gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
                    );
                  }
                }}
              >
                {(serviceFieldConfig[selectedService] ?? []).map((field) => {
                  // Plaka için özel render
                  if (field.special === 'plate') {
                    return (
                      <div key={field.name} className="space-y-2">
                        <label htmlFor={`${field.name}_1`} className="text-sm font-medium">
                          {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <div className="flex gap-2 items-center">
                          <Input
                            id={`${field.name}_1`}
                            name={`${field.name}_1`}
                            type="text"
                            placeholder="34"
                            maxLength={2}
                            pattern="[0-9]*"
                            required={field.required}
                            className="w-16 text-center"
                            onChange={(e) => {
                              e.target.value = e.target.value.replace(/[^0-9]/g, '');
                            }}
                          />
                          <span className="text-muted-foreground">-</span>
                          <Input
                            id={`${field.name}_2`}
                            name={`${field.name}_2`}
                            type="text"
                            placeholder="ABC"
                            maxLength={4}
                            pattern="[A-Za-z]*"
                            required={field.required}
                            className="flex-1 uppercase"
                            onChange={(e) => {
                              e.target.value = e.target.value.replace(/[^A-Za-z]/g, '').toUpperCase();
                            }}
                          />
                          <span className="text-muted-foreground">-</span>
                          <Input
                            id={`${field.name}_3`}
                            name={`${field.name}_3`}
                            type="text"
                            placeholder="1234"
                            maxLength={4}
                            pattern="[0-9]*"
                            required={field.required}
                            className="w-20 text-center"
                            onChange={(e) => {
                              e.target.value = e.target.value.replace(/[^0-9]/g, '');
                            }}
                          />
                        </div>
                      </div>
                    );
                  }

                  // Ruhsat seri no için özel render
                  if (field.special === 'ruhsat') {
                    return (
                      <div key={field.name} className="space-y-2">
                        <label htmlFor={`${field.name}_series`} className="text-sm font-medium">
                          {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <div className="flex gap-2 items-center">
                          <Input
                            id={`${field.name}_series`}
                            name={`${field.name}_series`}
                            type="text"
                            placeholder="AB"
                            maxLength={2}
                            pattern="[A-Za-z]*"
                            required={field.required}
                            className="w-16 text-center uppercase"
                            onChange={(e) => {
                              e.target.value = e.target.value.replace(/[^A-Za-z]/g, '').toUpperCase();
                            }}
                          />
                          <span className="text-muted-foreground">-</span>
                          <Input
                            id={`${field.name}_number`}
                            name={`${field.name}_number`}
                            type="text"
                            placeholder="123456"
                            maxLength={6}
                            pattern="[0-9]*"
                            required={field.required}
                            className="flex-1"
                            onChange={(e) => {
                              e.target.value = e.target.value.replace(/[^0-9]/g, '');
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                  
                  // Telefon için özel render
                  if (field.special === 'phone') {
                    return (
                      <div key={field.name} className="space-y-2">
                        <label htmlFor={field.name} className="text-sm font-medium">
                          {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="tel"
                          placeholder="5123456789"
                          maxLength={10}
                          pattern="[0-9]{10}"
                          required={field.required}
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                          }}
                        />
                        <p className="text-xs text-muted-foreground">
                          Örnek format: 5123456789 (10 haneli rakam)
                        </p>
                      </div>
                    );
                  }
                  
                  // TC için özel render
                  if (field.special === 'tc') {
                    return (
                      <div key={field.name} className="space-y-2">
                        <label htmlFor={field.name} className="text-sm font-medium">
                          {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="text"
                          placeholder="12345678901"
                          maxLength={11}
                          pattern="[0-9]{11}"
                          required={field.required}
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                          }}
                        />
                      </div>
                    );
                  }
                  
                  // Normal alanlar
                  return (
                    <div key={field.name} className="space-y-2">
                      <label
                        htmlFor={field.name}
                        className="text-sm font-medium"
                      >
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {field.textarea ? (
                        <Textarea
                          id={field.name}
                          name={field.name}
                          className="min-h-[90px]"
                          required={field.required}
                        />
                      ) : (
                        <Input
                          id={field.name}
                          name={field.name}
                          type={field.type ?? "text"}
                          required={field.required}
                        />
                      )}
                    </div>
                  );
                })}
                <Button type="submit" className="w-full rounded-full mt-2">
                  Teklif Gönder
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
        
        {/* Phone Modal */}
        {isPhoneModalOpen && (
          <motion.div
            key="phone-modal"
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPhoneModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="w-full max-w-md rounded-3xl bg-background border shadow-xl p-6 md:p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsPhoneModalOpen(false)}
                className="absolute right-4 top-4 rounded-full border border-border bg-muted/60 p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Kapat"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mb-6 space-y-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Bizi Arayın</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Size en uygun numaradan ulaşabilirsiniz
                </p>
              </div>
              <div className="space-y-3">
                <a
                  href="tel:02742243351"
                  className="flex items-center justify-between p-4 rounded-2xl border border-border hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="font-medium">0274 224 33 51</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </a>
                <a
                  href="tel:05364363245"
                  className="flex items-center justify-between p-4 rounded-2xl border border-border hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="font-medium">0536 436 32 45</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </a>
                <a
                  href="tel:05333342625"
                  className="flex items-center justify-between p-4 rounded-2xl border border-border hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="font-medium">0533 334 26 25</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function InsuranceLandingPage() {
  return <TurkishInsuranceLanding />;
}



