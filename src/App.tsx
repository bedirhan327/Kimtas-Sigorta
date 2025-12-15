import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isDark, setIsDark] = useState(false);

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
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="h-10 w-10 rounded-full bg-primary flex items-center justify-center"
              >
                <Shield className="h-5 w-5 text-primary-foreground" />
              </motion.div>
              <span className="font-bold text-xl">KİMTAŞSİGORTA</span>
            </div>
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
            <Button size="sm" className="rounded-full">
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
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl">KİMTAŞSİGORTA</span>
              </div>
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
                <Button className="w-full rounded-full">Teklif Al</Button>
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
                  <Button size="lg" className="rounded-full group">
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
                <motion.div
                  key={service.title}
                  variants={itemFadeIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden rounded-3xl border p-6 shadow-sm transition-all hover:shadow-md bg-background"
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
                      Detaylı Bilgi
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
                </motion.div>
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
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3"
                >
                  <div className="rounded-full bg-muted p-2">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Adres</h3>
                    <p className="text-sm text-muted-foreground">
                      Atatürk Cad. No:123, İstanbul
                    </p>
                  </div>
                </motion.div>
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
                      info@kimtassigorta.com
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3"
                >
                  <div className="rounded-full bg-muted p-2">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Telefon</h3>
                    <p className="text-sm text-muted-foreground">
                      0850 123 45 67
                    </p>
                  </div>
                </motion.div>
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
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium">
                      Ad
                    </label>
                    <Input
                      id="first-name"
                      placeholder="Adınız"
                      className="rounded-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium">
                      Soyad
                    </label>
                    <Input
                      id="last-name"
                      placeholder="Soyadınız"
                      className="rounded-full"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    E-posta
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="E-posta adresiniz"
                    className="rounded-full"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Telefon
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Telefon numaranız"
                    className="rounded-full"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mesajınız
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Hangi sigorta ürünü ile ilgileniyorsunuz?"
                    className="min-h-[120px] rounded-3xl"
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
          className="container grid gap-8 px-4 py-10 md:px-6 lg:grid-cols-4"
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
              <span className="font-bold text-xl">KİMTAŞSİGORTA</span>
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
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Bülten</h3>
            <p className="text-sm text-muted-foreground">
              Kampanya ve haberlerden haberdar olun.
            </p>
            <form className="flex space-x-2">
              <Input
                type="email"
                placeholder="E-posta adresiniz"
                className="rounded-full"
              />
              <Button type="submit" className="rounded-full">
                Abone Ol
              </Button>
            </form>
          </div>
        </motion.div>
        <div className="border-t">
          <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} KİMTAŞSİGORTA. Tüm hakları
              saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function InsuranceLandingPage() {
  return <TurkishInsuranceLanding />;
}



