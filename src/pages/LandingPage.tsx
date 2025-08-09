import { useRef, useEffect, useState } from "react";
import { motion , AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";




const LandingPage = () => {
  const [showChat, setShowChat] = useState(false);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const scrollRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };


    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let animationFrameId: number;


    const handleMouseMove = (e: MouseEvent) => {
      if (!scrollContainer) return;


      const rect = scrollContainer.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const width = rect.width;
      const threshold = 100;
      const maxScrollSpeed = 15;
      let scrollSpeed = 0;


      if (offsetX < threshold) {
        scrollSpeed = -((threshold - offsetX) / threshold) * maxScrollSpeed;
      } else if (offsetX > width - threshold) {
        scrollSpeed = ((offsetX - (width - threshold)) / threshold) * maxScrollSpeed;
      }


      const step = () => {
        scrollContainer.scrollLeft += scrollSpeed;
        animationFrameId = requestAnimationFrame(step);
      };


      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(step);
    };


    const stopScroll = () => cancelAnimationFrame(animationFrameId);


    scrollContainer?.addEventListener("mousemove", handleMouseMove);
    scrollContainer?.addEventListener("mouseleave", stopScroll);


    return () => {
      scrollContainer?.removeEventListener("mousemove", handleMouseMove);
      scrollContainer?.removeEventListener("mouseleave", stopScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);


  const scrollToId = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };




  const handleFlip = (index: number) => {
    setFlippedCard((prev) => (prev === index ? null : index));
  };
 


const cardData = [
  {
    title: "KPJ'S NIGHT 2023",
    image: "/activity/kpjsnight.jpeg",
    description: `KPJS Night merupakan puncak dari rangkaian kegiatan INTERSECT 2023 yang dihelat oleh mahasiswa Kartografi dan Penginderaan Jauh UGM sebagai bentuk penugasan akhir dalam balutan seni pertunjukan. Acara ini dirancang sebagai wadah ekspresi, kolaborasi, dan perayaan kreativitas mahasiswa dalam menyatukan seni dan narasi spasial-temporal yang menggugah.\n\nMengangkat tajuk "Cinta yang Membumi, Tak Terkekang oleh Waktu", KPJS Night menyajikan sebuah pertunjukan drama yang menyentuh hati, membentangkan kisah cinta lintas zaman yang terjalin abadi. Cerita berfokus pada dua pasang kekasih dari dua linimasa berbeda—era kerajaan dan era modern—yang ternyata merupakan reinkarnasi dari jiwa yang sama. Melalui pertarungan takdir dan benturan waktu, mereka dipertemukan kembali untuk menyelesaikan kisah yang dulu belum sempat dituntaskan.\n\nAlur cerita mengalir dinamis antara nuansa kerajaan yang megah dan suasana modern yang penuh konflik emosional, disertai dengan elemen teatrikal dan visual yang memikat. Benturan antara dua masa menciptakan ruang-ruang refleksi tentang takdir, kerinduan, dan harapan yang tak lekang oleh waktu. Penonton diajak menyusuri perjalanan cinta yang membumi—mengakar kuat dalam ruang, namun melampaui batasan waktu.\n\nKPJS Night tidak sekadar menjadi pentas drama, melainkan juga perwujudan integrasi nilai-nilai kreativitas, solidaritas, dan keilmuan mahasiswa KPJS dalam bingkai seni pertunjukan yang sarat makna.`,
  },
  {
    title: "KULIAH KERJA LAPANGAN 1",
    image: "/activity/kkl1.jpg",
    description: "Kuliah Kerja Lapangan 1 (KKL 1) merupakan salah satu mata kuliah praktik lapangan yang dirancang untuk memperkenalkan mahasiswa, khususnya dari Program Studi Geografi, terhadap beragam kondisi bentang alam di Indonesia. Mata kuliah ini dilaksanakan melalui kombinasi antara kegiatan kuliah lapangan dan studio yang memungkinkan mahasiswa mendapatkan pengalaman langsung dalam mengamati dan menganalisis fenomena bentang alam, baik dari aspek fisik maupun sosial budaya. Rangkaian kegiatan ini bertujuan untuk membentuk pemahaman menyeluruh tentang dinamika lingkungan, memperkuat kemampuan analisis geospasial, serta menanamkan kesadaran akan pentingnya pengelolaan sumber daya secara berkelanjutan.\n\nSalah satu tujuan utama dari pelaksanaan KKL 1 adalah memperkenalkan mahasiswa pada berbagai fenomena bentang alam secara teoritis dan praktis. Dalam proses ini, mahasiswa diajak untuk memahami bentuk dan proses terbentuknya bentang lahan, baik yang alami seperti pegunungan, sungai, dan pantai, maupun yang bersifat budaya atau hasil aktivitas manusia. Mahasiswa dituntut untuk aktif melakukan pengamatan, mencatat fenomena, dan menganalisis hubungan antara unsur-unsur pembentuk lanskap. Pemahaman ini menjadi bekal penting dalam mengembangkan keilmuan geografi yang holistik dan kontekstual.\n\nLebih jauh, mahasiswa juga dibekali kemampuan untuk mengidentifikasi karakteristik sembilan jenis bentang lahan utama yang terdapat di Pulau Jawa, yaitu bentang lahan vulkanik, fluvial, struktural, denudasional, marin, aeolin, solusional, organik, dan antropogenik. Setiap tipe bentang lahan memiliki ciri morfologis, proses pembentukan, serta implikasi sosial budaya yang berbeda, sehingga perlu dipahami secara mendalam. Dengan mengamati secara langsung kondisi bentang lahan di lapangan, mahasiswa memperoleh pemahaman yang tidak hanya bersifat teoritis, tetapi juga aplikatif dan kontekstual terhadap wilayah yang diamati.\n\nDalam rangkaian kegiatan KKL ini, lokasi praktik lapangan difokuskan pada wilayah-wilayah representatif di sekitar Jawa Tengah yang memiliki keragaman bentang lahan yang cukup lengkap. Mahasiswa mengunjungi kawasan vulkanik seperti lereng Gunung Merapi dan Gunung Merbabu, yang memperlihatkan interaksi antara aktivitas vulkanik dan pemukiman manusia. Di wilayah fluvial, observasi dilakukan di sekitar Sungai Progo dan Sungai Serayu yang menunjukkan dinamika sedimentasi dan aliran permukaan.\n\nWilayah struktural dan denudasional dapat diamati di kawasan Pegunungan Menoreh dan Pegunungan Serayu Utara, di mana proses pelapukan dan erosi membentuk kontur lahan yang kompleks. Di bagian selatan, mahasiswa menelusuri bentang lahan solusional atau karst di kawasan Karangbolong, Gombong Selatan, dan sebagian wilayah Gunungsewu yang dikenal dengan fenomena dolina, ponor, serta aktivitas pertanian lahan kering yang khas.\n\nSelain itu, pengenalan terhadap bentang lahan marin dilakukan melalui kunjungan ke wilayah pesisir utara seperti Demak dan Jepara yang menghadirkan isu-isu penting seperti abrasi, sedimentasi, dan pengelolaan kawasan pesisir. Bentang aeolin diamati di beberapa wilayah dataran rendah yang memiliki potensi angin signifikan, meskipun terbatas. Sedangkan bentang organik dikenali pada kawasan rawa dan lahan basah di dataran aluvial seperti yang terdapat di sekitar Purwodadi dan sebagian area pantai utara. Bentang antropogenik, yang merupakan hasil dari intervensi manusia secara langsung, diamati di wilayah permukiman padat, kawasan pertanian terasering, hingga daerah pertambangan rakyat yang tersebar di berbagai titik pengamatan.",
  },
  {
    title: "PORSEGE 2024",
    image: "/activity/porsege.svg",
    description: "PORSEGE 2024 (Pekan Olahraga dan Seni Geografi) merupakan ajang tahunan yang mempertemukan semangat kompetisi, kreativitas, dan sportivitas di kalangan mahasiswa Geografi. Acara ini menjadi wadah eksplorasi potensi non-akademik yang membangun solidaritas lintas angkatan, serta memperkuat identitas sebagai insan Geografi yang aktif, dinamis, dan ekspresif dalam berbagai bidang.\n\nRangkaian PORSEGE 2024 mencakup berbagai cabang olahraga kompetitif seperti basket, futsal, badminton, hingga permainan digital populer seperti Mobile Legends, Magic Chess, dan PES. Setiap cabang dirancang untuk menguji kekompakan tim, kemampuan teknis, serta ketangguhan mental dalam suasana yang tetap menjunjung tinggi fair play dan kebersamaan.\n\nTidak hanya berfokus pada fisik dan strategi, PORSEGE juga memberikan ruang bagi ekspresi seni dan visual dengan menyelenggarakan lomba desain grafis dan fotografi. Di sinilah kreativitas mahasiswa diuji, mengekspresikan pandangan mereka melalui visual yang estetik, tematik, dan sering kali menyuarakan nilai-nilai khas Geografi.\n\nDengan atmosfer yang meriah, kompetitif, dan penuh semangat, PORSEGE 2024 bukan sekadar perlombaan. Ia menjadi perayaan jati diri mahasiswa Geografi yang beragam namun bersatu, kuat dalam kerja sama, kaya dalam ekspresi, dan tumbuh dalam semangat berkegiatan yang sehat dan membangun.",
  },
  {
    title: "MAKRAB 1",
    image: "/activity/makrab1.jpeg",
    description: "Makrab Pertama merupakan kegiatan malam keakraban yang diselenggarakan oleh mahasiswa Kartografi dan Penginderaan Jauh angkatan 2023 sebagai langkah awal untuk membangun ikatan emosional dan rasa kekeluargaan antar sesama angkatan. Acara ini berlangsung pada tanggal 17 Februari 2024, bertempat di Omah Klangenan, Kaliurang — sebuah lokasi dengan nuansa tradisional Jawa dan udara pegunungan yang sejuk, sangat mendukung suasana hangat dan akrab.\n\nKegiatan ini diisi dengan berbagai aktivitas interaktif yang dirancang untuk mencairkan suasana dan mempererat hubungan antar teman seangkatan. Mulai dari permainan seru yang menantang kekompakan, renang bersama yang menyegarkan, hingga sesi tukar kado yang penuh kejutan dan tawa — seluruh rangkaian acara dipenuhi dengan kebersamaan dan keceriaan.\n\nMakrab ini bukan sekadar agenda hiburan, tetapi juga menjadi ruang untuk saling mengenal lebih dalam, membentuk kedekatan, dan menciptakan kenangan awal yang menyenangkan sebagai bagian dari perjalanan bersama di bangku kuliah. Lewat interaksi yang terbuka dan penuh canda, kegiatan ini menjadi fondasi yang memperkuat rasa memiliki terhadap angkatan, sekaligus menyatukan latar belakang, karakter, dan cerita masing-masing individu dalam satu angkatan yang utuh.\n\nDengan penuh kesan dan kebahagiaan, Makrab Pertama ini menjadi awal hangat dari perjalanan panjang KPJ 2023 — menandai terbentuknya keluarga baru yang akan tumbuh dan berkembang bersama selama masa perkuliahan dan seterusnya.",
  },
  {
    title: "SONAR 2024",
    image: "/activity/sonar.svg",
    description: "SONAR 2024 merupakan perayaan ulang tahun Himpunan Mahasiswa Sains Informasi Geografi (HMSAIG) yang penuh semarak dan kehangatan. Di tengah kebersamaan antaranggota lintas angkatan, SONAR menjadi momentum reflektif sekaligus selebrasi terhadap perjalanan, pencapaian, dan semangat kolektif dalam membangun himpunan yang aktif, inklusif, dan progresif.\n\nDirancang dengan konsep yang meriah dan penuh energi, rangkaian acara SONAR 2024 dibuka dengan berbagai games menarik dan lomba-lomba seru yang memantik antusiasme serta memupuk kebersamaan. Suasana kompetitif dikemas ringan dan menyenangkan, menjadi ruang interaksi yang cair dan membangun koneksi emosional antarwarga HMSAIG.\n\nTak berhenti di situ, malam penutupan SONAR menjadi puncak dari seluruh perayaan — menghadirkan pertunjukan seni dari mahasiswa KPJ yang penuh warna. Mulai dari penampilan musik dan vokal, pentas drama yang menyentuh dan menghibur, hingga berbagai ekspresi kreatif lainnya, malam SONAR menjadi panggung apresiasi bagi talenta dan semangat kolaborasi.\n\nLebih dari sekadar ulang tahun, SONAR 2024 adalah selebrasi identitas dan kekuatan kolektif HMSAIG. Di dalamnya tersimpan semangat solidaritas, kreativitas, dan harapan yang akan terus menyala dalam langkah-langkah organisasi ke depan.",
  },
  {
    title: "INTERSECT 2024",
    image: "/activity/intersect.JPG",
    description: "INTERSECT 2024 merupakan gerbang awal bagi mahasiswa baru Kartografi dan Penginderaan Jauh untuk mengenal lebih dalam dunia keilmuan yang akan mereka geluti. Dirancang sebagai program pengenalan lingkungan dan program studi, kegiatan ini menjadi ruang pertama untuk menanamkan semangat, identitas, dan rasa memiliki terhadap keluarga besar KPJ. Bukan sekadar menyambut, INTERSECT hadir sebagai medium pembentuk awal karakter dan pemahaman keilmuan yang menyenangkan dan bermakna.\n\nRangkaian kegiatan INTERSECT 2024 meliputi berbagai sesi pematerian tematik yang memperkenalkan cakupan Kartografi dan Penginderaan Jauh secara utuh — mulai dari sejarah, kontribusi terhadap pembangunan nasional, hingga potensi karier masa depan. Dengan menghadirkan pemateri berpengalaman dan alumni inspiratif, sesi ini membuka wawasan peserta tentang bagaimana peran spasial menjadi kunci dalam memahami dan membentuk dunia.\n\nSelain sesi diskusi, INTERSECT juga diperkaya dengan berbagai permainan interaktif, simulasi, dan kegiatan lapangan yang relevan dengan dunia kartografi. Aktivitas ini tidak hanya bertujuan mempererat hubungan antar peserta, tetapi juga memberikan pengalaman langsung tentang dinamika kerja spasial — mulai dari observasi lapangan hingga penalaran spasial sederhana yang membangun logika kartografis.\n\nSebagai penutup, malam puncak INTERSECT menjadi momen reflektif sekaligus perayaan. Dalam suasana hangat, peserta diajak merayakan perjalanan awal mereka sebagai bagian dari komunitas ilmiah yang unik dan solid. Dengan nuansa tematik khas KPJ, malam puncak bukan hanya ajang hiburan, tetapi juga simbol kebersamaan, harapan, dan semangat yang akan terus menyala selama masa perkuliahan dan seterusnya.",
  },
  {
    title: "MAKRAB 2",
    image: "/activity/makrab2.JPG",
    description: "Makrab 2 menjadi kelanjutan dari semangat keakraban yang telah tumbuh dalam keluarga besar Kartografi dan Penginderaan Jauh angkatan 2023. Diselenggarakan pada 15–16 Februari 2025, acara ini mengambil tempat di Omah Cangkringan, Kaliurang — sebuah lokasi yang tenang dan sejuk di lereng Merapi, memberikan suasana yang pas untuk menyegarkan kembali hubungan dan kebersamaan di tengah kesibukan perkuliahan.\n\nSeperti tahun sebelumnya, Makrab 2 dirancang dengan berbagai kegiatan interaktif yang mengajak peserta untuk saling berbaur dan mempererat ikatan. Permainan seru, kebersamaan santai, hingga momen-momen tak terduga menjadi bagian dari suasana yang hangat dan cair. Aktivitas dirancang sederhana, namun penuh makna dalam menciptakan kembali rasa saling memiliki antar anggota angkatan.\n\nMalam harinya, sebuah acara dadakan turut memberi warna berbeda: forum evaluasi khusus peserta laki-laki. Forum ini muncul secara spontan sebagai inisiatif untuk membuka ruang komunikasi yang jujur dan reflektif, membahas dinamika internal yang dirasakan selama perjalanan kebersamaan. Meskipun tidak direncanakan sebelumnya, momen ini justru menjadi titik penting yang memperkuat rasa tanggung jawab dan kedewasaan emosional dalam lingkungan angkatan.\n\nMakrab 2 bukan hanya lanjutan dari agenda keakraban, tetapi menjadi titik jeda yang bermakna — tempat di mana tawa, diskusi, dan kesadaran tumbuh bersamaan. Ia memperbarui komitmen untuk saling menjaga dan melangkah bersama, menjadikan KPJ 2023 sebagai rumah yang terus belajar dan berkembang, dalam suka maupun dinamika.",
  },
  {
    title: "KULIAH KERJA LAPANGAN 2",
    image: "/activity/kkl2.jpg",
description: "Kuliah Kerja Lapangan 2 (KKL 2) merupakan salah satu bentuk kegiatan akademik yang dirancang untuk menjawab tantangan nyata dalam pengelolaan data geospasial di Indonesia, khususnya di Kabupaten Wonosobo. Sebagai bagian dari negara kepulauan terbesar di dunia, wilayah Wonosobo mencerminkan kompleksitas spasial yang membutuhkan pendekatan survei dan pemetaan yang mendalam serta berkelanjutan. Dalam konteks otonomi daerah dan tuntutan pembangunan berbasis data, KKL 2 hadir sebagai langkah strategis untuk mendorong penyusunan basis data geospasial yang akurat, terintegrasi, dan aplikatif terhadap kebutuhan pembangunan daerah.\n\nMelalui KKL 2, mahasiswa dilibatkan secara langsung dalam proses akuisisi, pengolahan, dan integrasi data geospasial, dengan fokus pada sektor-sektor vital seperti pariwisata dan pertanian. Kegiatan ini tidak hanya berperan sebagai wahana pembelajaran praktis, tetapi juga sebagai kontribusi nyata terhadap penyediaan informasi spasial yang mendukung pengambilan keputusan di tingkat daerah. Kabupaten Wonosobo, yang saat ini telah memiliki profil simpul jaringan geospasial melalui Sistem Informasi Monitoring Simpul Jaringan (SIMOJANG) dari Badan Informasi Geospasial (BIG), menjadi lokasi ideal untuk melaksanakan kegiatan ini guna meningkatkan kualitas dan pemanfaatan basis data yang sudah ada.\n\nDalam pelaksanaannya, KKL 2 memanfaatkan beragam pendekatan akuisisi data, seperti pemetaan skala kecil dan besar, survei terestris, fotogrametri dan foto udara, hingga pemetaan hidrologi dan batimetri. Seluruh proses tersebut diarahkan untuk menghasilkan basis data geospasial yang mampu menjawab kebutuhan aktual daerah, khususnya dalam mendukung perencanaan dan pengelolaan pariwisata secara berkelanjutan. Dengan pendekatan ilmiah dan partisipatif, KKL 2 menjadi sarana integratif antara teori, praktik, dan pengabdian kepada masyarakat, serta mendorong terciptanya pembangunan daerah yang lebih cerdas, adaptif, dan berbasis informasi spasial."
,
  },
];






  const floatingCursor = (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-[#114232] rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{ translateX: "-50%", translateY: "-50%" }}
      animate={{ x: mousePosition.x, y: mousePosition.y }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  );


  return (
    <div className="font-sans relative overflow-hidden bg-[#FEF7E4]">
      {floatingCursor}
     
  {/* Navbar */}
<nav className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-[#0E2F1E] text-white rounded-full py-3 px-8 z-50 w-1/2 flex justify-between items-center shadow-lg mt-10">
  <button onClick={() => scrollToId("whatwedo")} className="font-semibold text-base transition duration-300 hover:text-yellow-300 hover:scale-105">
    Activity
  </button>
  <button onClick={() => scrollToId("hero")} className="font-semibold text-base transition duration-300 hover:text-yellow-300 hover:scale-105">
    Home
  </button>
  <button onClick={() => scrollToId("developer")} className="font-semibold text-base transition duration-300 hover:text-yellow-300 hover:scale-105">
    Developer
  </button>
</nav>




      {/* Hero */}
<section
  id="hero"
  className="relative h-screen flex items-center justify-center bg-cover bg-center px-4"
  style={{ backgroundImage: "url('/backgroundhero-LP.svg')" }}>




  <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl px-6">
    <div className="flex flex-col items-start text-left">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-7xl font-extrabold text-[#114232]"
      >
        ESTHERA LOCUS.
      </motion.h1>
      <p className="text-[#114232] mt-2 text-lg">
        Kartografi dan Penginderaan Jauh 2023 <br />
        Universitas Gadjah Mada
      </p>
      <Link to="/atlas" className="w-[150px] bg-green-950 h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg
  before:absolute before:top-0 before:-left-full before:w-full before:h-full
  before:bg-gradient-to-r before:from-[#FFDF20] before:to-green-800
  before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl
  text-[#fff] font-poppins hover:before:left-0">
  ATLAS KKL
</Link>




      <p className="font-bold text-[#114232] mt-3">
        Get Started with Mapping Journey
      </p>
    </div>
    <motion.img src="/EL-Logo-sticker.svg" alt="logo" className="w-100 h-100 ml-10" />
  </div>
</section>






{/* Title */}
      <motion.h2
  initial={{ opacity: 0, y: -30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="text-green-950 text-center text-5xl md:text-6xl font-bold mb-20"
>
  ABOUT ESTHERA LOCUS
</motion.h2>




      {/* Main Layout */}
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <motion.div
          whileHover={{ scale: 1.04, rotate: 0.5 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative group"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-[#114232]/40 group-hover:shadow-[#114232]/40 transition duration-300">
            <img
              src="/activity/aboutus.svg" // Pastikan ini adalah foto horizontal landscape
              alt="Esthera Locus"
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>


        {/* Text Section */}
        <div className="text-white space-y-6">
          {[
            {
              id: 1,
              text:
                "Esthera Locus merupakan angkatan Kartografi dan Penginderaan Jauh (KPJ) tahun 2023 di bawah naungan Departemen Sains Informasi Geografi. Nama ini berasal dari kata \"Esthera\" yang berarti 'bintang' dan \"Locus\" yang berarti 'tempat'.",
            },
            {
              id: 2,
              text:
                "Nama tersebut menggambarkan KPJ 2023 sebagai sekumpulan individu dari latar belakang berbeda yang bersinar terang di tempatnya masing-masing.",
            },
            {
              id: 3,
              text:
                "Esthera Locus resmi dilantik sebagai bagian dari Himpunan Mahasiswa Sains Informasi Geografi (HMSaIG) pada 3 Maret 2024. Bagi kami, Esthera bukan hanya angkatan, tapi keluarga yang akan terus tumbuh bersama.",
            },
          ].map(({ id, text }) => (
            <motion.div
              key={id}
              whileHover={{ scale: 1.02 }}
              className="bg-green-950 backdrop-blur-md p-6 rounded-xl shadow-xl border border-[#114232]/20 transition duration-300 hover:shadow-md hover:border-[#114232]/40"
            >
              <p className="text-md md:text-lg leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
   






 {/* What We Do */}
      <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false }}
      id="whatwedo"
      className="text-center py-16 mt-5" >
<section id="whatwedo" className="text-center py-16">
  <h2 className="text-5xl font-bold text-[#114232] mb-20">What We Do</h2>




  <div
  ref={scrollRef}
  className="overflow-x-scroll no-scrollbar px-6 overflow-visible">




  <div className="flex gap-10 w-max items-center py-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="relative w-[33vw] min-w-[360px] h-[420px] flex-shrink-0 cursor-pointer"
          onClick={() => handleFlip(index)}
          style={{ perspective: "1000px" }}
        >
          <motion.div
            animate={{ rotateY: flippedCard === index ? 180 : 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front Side */}
            <div
              className="absolute w-full h-full bg-[#114232] text-white rounded-2xl overflow-hidden flex flex-col items-center justify-center p-4"
              style={{ backfaceVisibility: "hidden" }}
            >
              <img src={card.image} alt={card.title} className="w-full h-[300px] object-cover rounded-lg mb-4" />
              <h3 className="font-bold text-xl mb-2 text-center">{card.title}</h3>
              <p className="text-sm">Klik untuk detail</p>
            </div>




            {/* Back Side */}
            <div
              className="absolute w-full h-full bg-white text-[#114232] rounded-2xl p-10 text-base text-justify leading-loose overflow-y-auto"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <p style={{ whiteSpace: "pre-line" }}>{card.description}</p>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  </div>
</section>
</motion.section>


      {/* Developer Section */}
<motion.section
  initial={{ opacity: 0, y: 100 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ once: false }}
  id="developer"
  className="text-center py-16 bg-gradient-to-b from-[#fef6e4] to-transparent bg-cover bg-center"
  style={{ backgroundImage: "url('/developer-bg.jpg')" }}
>
  <h2 className="text-5xl font-bold text-[#114232] text-center mb-16">Meet Our Developer</h2>
  <div className="flex justify-center flex-wrap gap-16 px-8">
    {[
  { name: "Zaky Sofyanda", role: "UI/UX Developer",instagram: "@zaksoof", img:"/developer/Jeki.svg" },
  { name: "Adyatma Damarjati", role: "Front End Developer",instagram: "@damarhtny", img: "/developer/Damar.svg" },
  { name: "Fajar Ginting", role: "Back End Developer",instagram: "@fajarrginting", img: "/developer/Fajar.svg" },
  { name: "Dimas Susilo", role: "Front End Developer",instagram: "@drsdimas_", img: "/developer/Dimas.svg" },
  { name: "Kristoforus Karol", role: "UI/UX Developer",instagram: "@kristokarol_" , img: "/developer/Kristo.svg" },
].map((dev, i) => (
  <motion.div
    key={i}
    whileHover={{
      scale: 1.08,
      boxShadow: "0 0 25px rgba(255, 255, 255, 0.3)",
    }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="relative bg-[#114232] text-white w-[300px] p-7 rounded-3xl text-center flex flex-col justify-between cursor-pointer hover:ring-2 hover:ring-white/40 hover:ring-offset-2"
  >
    <img src={dev.img} alt={dev.name} className="rounded-md w-full h-auto mb-5" />
    <div className="relative flex justify-center items-center mb-2">
      <div className="mr-3 w-4 h-4 bg-white rounded-full border-2 border-[#114232] flex items-center justify-center">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
      <p className="font-semibold text-xl whitespace-nowrap">{dev.name}</p>
    </div>
    <p className="text-base ">{dev.role}</p>
    <a
      href={`https://instagram.com/${dev.instagram.replace('@', '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 gap-y-6 text-base hover:text-yellow-300"
    >
      <img
        src="/sosmed/ig.svg"
        alt="Instagram"
        className="w-6 h-6"
      />
      {dev.instagram}
    </a>
  </motion.div>
))}
  </div>
</motion.section>






{/* Footer */}
<footer className="relative bg-[#114232] text-white pt-24 pb-12 px-6 mt-24">
  <div className="relative">
      {/* Popup Message */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -150, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 z-50 bg-white text-[#114232] px-4 py-2 rounded-2xl border border-[#114232] shadow-lg text-sm"
          >
            Halo! Aku Loca, Senang bisa menyapa kamu di sini. Aku siap menemani kamu mengenal lebih dekat dunia Sains Informasi Geografi.
          </motion.div>
        )}
      </AnimatePresence>


      {/* Maskot Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white border-[3px] border-[#114232] rounded-full w-32 h-32 flex items-center justify-center hover:scale-105 transition-transform z-50"
      >
        <img src="/maskkot.svg" alt="maskot" className="w-28 h-28 object-contain" />
      </button>
    </div>


       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-center md:text-left">
    {/* Kiri */}
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Esthera Locus</h2>
      <div>
        <p className="font-semibold">Contact Person:</p>
        <div className="flex items-center gap-2">
          <img src="/sosmed/contact.svg" className="w-4 h-4" />
          <span>Fatia: 0882-7107-8201</span>
        </div>
        <div className="flex items-center gap-2">
          <img src="/sosmed/contact.svg" className="w-4 h-4" />
          <span>Farah: 0896-5175-4114</span>
        </div>
      </div>
    </div>


    {/* Tengah */}
    <div className="flex items-center justify-center md:justify-center mt-50">
      <p className="text-xs text-gray-300">© 2025 Esthera Locus. All rights reserved.</p>
    </div>


    {/* Kanan */}
    <div className="space-y-4 text-left ml-50">
  <p className="font-semibold">Social Media:</p>


  <div className="flex items-center gap-2">
    <img src="/sosmed/ig.svg" className="w-6 h-6" />
    <a href="https://instagram.com/kpjugm2023" className="hover:text-yellow-300">@kpjugm2023</a>
  </div>
  <div className="flex items-center gap-2">
    <img src="/sosmed/tiktok.svg" className="w-6 h-6" />
    <a href="https://tiktok.com/@kpjugm23" className="hover:text-yellow-300">@kpj2023</a>
  </div>
  <div className="flex items-center gap-2">
    <img src="/sosmed/x.svg" className="w-6 h-6" />
    <a href="https://x.com/kpjugm2023" className="hover:text-yellow-300">@kpjugm2023</a>
  </div>


  <p className="font-semibold pt-2">E-mail:</p>
  <div className="flex items-center gap-2">
    <img src="/sosmed/email.svg" className="w-6 h-6" />
    <a href="mailto:estheralocus@gmail.com" className="hover:text-yellow-300">estheralocus@gmail.com</a>
  </div>




    </div>
  </div>
</footer>
</div>
)};


export default LandingPage;

