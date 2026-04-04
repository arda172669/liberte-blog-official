export const topics = [
  {
    id: 42,
    dateRange: '3-9 Nisan 2026',
    title: 'Serbest Piyasada Tekelleşme Kaçınılmaz mıdır?',
    shortDesc: 'Monopollerin ve regülasyonların etkileri.',
    desc: 'Müdahaleci olmayan bir ekonomik düzende (laissez-faire) sermaye birikiminin doğal yollarla bir oligarşi veya tekel yaratıp yaratmayacağı problemi. Piyasaya giriş engellerinin (regülasyonlar) yokluğunda tüketici egemenliğinin rolü nasıldır?',
    mainDesc: 'Devlet regülasyonlarının bulunmadığı laissez-faire piyasalarında sermaye birikiminin kaçınılmaz olarak monopolistik yapılar doğuracağı savı eleştirel bir süzgeçten geçirilmektedir. Liberteryen paradigma, tekelleşmenin serbest rekabetçi piyasa başarısızlığından ziyade, kurumsal ve yasal giriş engelleri (crony capitalism) ile mümkün olabilen bir siyasal rant arayışı (rent-seeking) sonucu olduğunu savunmaktadır.'
  },
  {
    id: 41,
    dateRange: '27 Mart - 2 Nisan 2026',
    title: 'Bireyciliğin Etik Temelleri: Toplum İçin Feda Edilebilir Miyiz?',
    shortDesc: 'Bireyin toplumsal fayda adına araçsallaştırılmasına karşı ahlaki bir itiraz.',
    desc: 'Bireyin toplumsal fayda adına araçsallaştırılmasına karşı ahlaki bir itiraz.',
    mainDesc: 'Faydacılık (utilitarianism) karşısında hak temelli bireyciliğin savunusu. İnsanın yalnızca kendi hayatının bir amacı olduğu gerçeğinden hareketle, kolektif "toplum çıkarı" illüzyonunun bireysel mülkiyet haklarını nasıl yok ettiği tartışılmaktadır.'
  },
  {
    id: 40,
    dateRange: '20-26 Mart 2026',
    title: 'Merkez Bankacılığı ve Enflasyonun Politik Ekonomisi',
    shortDesc: 'Devlet tekelindeki paranın piyango etkileri ve katallaksi üzerindeki yıkıcı sonuçları.',
    desc: 'Devlet tekelindeki paranın piyango etkileri ve katallaksi üzerindeki yıkıcı sonuçları.',
    mainDesc: 'Fiat paranın itibari doğası ve Merkez Bankalarının monopolistik statülerinin ekonomi içindeki suni döngüleri (boom/bust) nasıl tetiklediği.'
  },
  {
    id: 39,
    dateRange: '13-19 Mart 2026',
    title: 'Özel Mülkiyet Olmadan İnsan Hakları Mümkün mü?',
    shortDesc: 'Mülkiyet kavramının tarihsel ve praksiyolojik incelemesi.',
    desc: 'Mülkiyet kavramının tarihsel ve praksiyolojik incelemesi.',
    mainDesc: 'Kendi bedeni üzerindeki mülkiyetten (self-ownership) başlayan silsilede, fiziksel nesneler üzerindeki haklar olmadan soyut "ifade ve yaşama" haklarının var olamayacağı.'
  }
];

export const authors = [
  {
    id: 'yazar-x',
    name: 'Yazar X',
    bio: 'Metodolojik bireycilik, praksiyoloji ve serbest piyasa anarşizmi üzerine akademik çalışmalar yürüten teorisyen. Toplumsal düzenin spontane katallaksi süreçleriyle oluştuğuna ve rıza dışı her türlü otoritenin mülkiyet ihlali olduğuna dair argümanlar üretmektedir.'
  },
  {
    id: 'yazar-c',
    name: 'Yazar C',
    bio: 'Avusturya Okulu geleneğinde epistemoloji ve faiz teorisi üzerine yoğunlaşan bir yazar. Katallaktik düzen ve spontane organizasyon formlarını araştırmaktadır.'
  },
  {
    id: 'yazar-k',
    name: 'Yazar K',
    bio: 'Hukuk ve ekonomi kesişiminde çalışan analist. Doğal tekel miti ve regülasyon teorisi konularında makaleleri bulunmaktadır.'
  }
];

export const articles = [
  {
    id: 4,
    topicId: 42,
    authorId: 'yazar-x',
    title: 'Devlet İmtiyazları Olmaksızın Tröstlerin Sürdürülemezliği',
    excerpt: 'Monopollerin tarihsel incelemesi göstermektedir ki, uzun süreli ve tüketiciye zarar veren tekeller yalnızca regülasyonlar, tarifeler ve fikri mülkiyet yasaları gibi devlet tarafından sağlanan bariyerler sayesinde var olabilir.',
    date: 'Dün',
    commentsCount: 15,
    content: `Neo-klasik iktisadın statik "tam rekabet" (perfect competition) modeli, rekabetin özünü ıskalayan metodolojik bir hataya dayanır. Gerçek dünyada rekabet, aktörlerin belli başlı sabit verilere göre tepki verdiği bir durum değil; tam aksine, bu verilerin anbean üretildiği, sentezlendiği ve transfer edildiği dinamik bir "keşif sürecidir" (discovery procedure).\n\nMüdahaleci devlet paradigması, belirli bir pazarda tek bir firmanın tahakküm kurmasını (monopol) piyasa başarısızlığı olarak etiketlerken, aslında o firmanın katallaksi düzeni içerisinde tüketici tercihlerini geçici olarak en iyi optimize eden aktör olduğunu gözden kaçırmaktadır. Praksiyolojik bağlamda ele alırsak, eğer pazara yasal giriş engelleri (regülasyonlar, tarifeler, fikri mülkiyet yasaları) yoksa, bir "tekelin" sürdürülebilirliği tamamen rasyonel ve tüketici odaklı bir hizmet vermesine bağlıdır.\n\n**Metodolojik Bireycilik ve Bilgi Problemi**\nMerkezi planlamanın rasyonel bir kaynak tahsisi yapamamasının kalbinde yatan ekonomik hesaplama sorunu (economic calculation problem), tekelleşme argümanında da karşımıza çıkar. Fiyat mekanizması, milyonlarca insanın zımni ve dağınık olan (tacit and dispersed knowledge) bilgisini tek bir sentetik sinyalde iletir. Eğer bir tekel, kalitesini düşürür veya fiyatını "marjinal fayda" sınırlarını aşacak şekilde yukarı çekerse, bu devasa kâr marjı, piyasadaki diğer tüm potansiyel girişimciler için güçlü bir sinyal yaratacaktır.\n\nBu sinyal, pazara ikame mallar üretebilecek yeni rakipleri doğrudan cezbeder. Tröstlerin devasa boyutu, onları hantal kılarak inovasyon eşiğini düşürür. Zira firma büyüdükçe kendi iç bürokrasisini inşa eder ve pazarın uç noktalarındaki lokal bilgi akışından mahrum kalır.\n\n*Suni Giriş Engellerinin Ontolojisi*\nTarihsel perspektife baktığımızda, yıkılmaz ve uzun ömürlü olduğu iddia edilen tüm büyük monopollerin temelinde zımnen veya açıkça bir devlet ayrıcalığı bulunduğunu görebiliriz. Lisans zorunlulukları gibi kurumlar, "kaliteyi koruma" kisvesi altında aslında statükocu firmaları yeni rekabetçi tehditlerden korur. Tüketici egemenliğinin (consumer sovereignty) gerçekten tecelli edebilmesi için, sermaye kümülasyonunu sınırlayacak piyasa yapısına müdahale etmek yerine, "giriş bariyerlerinin" inşasında kullanılan fiziki zor kullanma tekelinin yani devlet mekanizmasının analiz edilmesi esastır.`
  },
  {
    id: 5,
    topicId: 42,
    authorId: 'yazar-c',
    title: 'Katallaksi Çerçevesinde Rekabetin Keşif Süreci',
    excerpt: 'Rekabet statik bir denge durumu değildir; dinamik bir keşif sürecidir. Bir firmanın pazar payını domine etmesi, o firmanın tüketici taleplerini en optimum şekilde karşıladığının praksiyolojik bir göstergesidir.',
    date: 'Bugün',
    commentsCount: 89,
    content: 'Tüketici egemenliğinin piyasayı nasıl şekillendirdiği üzerine geniş bir inceleme... (Bu makale tam metin olarak henüz taslak halindedir.)'
  },
  {
    id: 6,
    topicId: 42,
    authorId: 'yazar-k',
    title: 'Mülkiyet Hakları ve Doğal Tekel Mitolojisi',
    excerpt: '"Doğal tekel" argümanının metodolojik hataları üzerine bir inceleme. Mülkiyetin tahsisi piyasa süreçlerine bırakıldığında, potansiyel rekabet tehdidinin fiyatları her zaman marjinal maliyete yakınsayacak şekilde baskıladığı gösterilmiştir.',
    date: 'Bugün',
    commentsCount: 42,
    content: 'Fiyatların her zaman marjinal maliyete yakınsaması üzerine ekonomik modellerin doğal tekel söylemine adaptasyonu... (Taslak metin)'
  },
  {
    id: 1,
    topicId: 41,
    authorId: 'yazar-x',
    title: 'Değerin Subjektif Teorisi ve Marjinal Fayda',
    excerpt: 'Emek-değer teorisinin epistemolojik çöküşü ve Avusturya Okulu tarafından geliştirilen sübjektif değer kuramının bireysel seçim eylemlerini (praksiyoloji) nasıl metodolojik bir kesinlikle açıkladığına dair derinlemesine bir analiz.',
    date: '28 Mart 2026',
    commentsCount: 24,
    content: 'Değer sadece bireyin ona atfettiği derecede mevcuttur. Emek miktarının bağımsız bir değer yaratmadığı marjinal devrim ile ispatlanmıştır... (Taslak metin)'
  },
  {
    id: 7,
    topicId: 41,
    authorId: 'yazar-c',
    title: 'Devletin Kökeni: Yırtıcı Kuram vs. Toplum Sözleşmesi',
    excerpt: 'Mülkiyet haklarının ve gönüllü mübadelenin doğası temel alındığında; devlet aygıtının, üretken sınıflar üzerinde kurumlaşmış bir sömürü (vergilendirme yoluyla) aracı olduğuna dair argümantasyon.',
    date: '27 Mart 2026',
    commentsCount: 18,
    content: 'Toplum sözleşmesi tezi pratik ve tarihsel olarak temelsizdir. Devletin kökeni yağmacılık ve sömürü mekanizmalarının rasyonalleştirilmesidir... (Taslak metin)'
  },
  {
    id: 2,
    topicId: 40,
    authorId: 'yazar-c',
    title: 'Spontane Düzen ve Metodolojik Bireycilik',
    excerpt: 'Toplumsal düzenin merkezi bir otorite olmadan, bireylerin kendi mikro çıkarları doğrultusunda hareket etmesiyle oluşan "katallaksi" (mübadele düzeni) sürecinin epistemolojik analizi.',
    date: '21 Mart 2026',
    commentsCount: 56,
    content: 'Taslak İçerik'
  },
  {
    id: 3,
    topicId: 39,
    authorId: 'yazar-k',
    title: 'Bilgi Dağılımı ve Merkeziyetçi Hesaplama Sorunu',
    excerpt: 'Lokal bilginin zımni niteliği sebebiyle, hiçbir merkezi planlayıcının piyasa aktörleri kadar rasyonel kaynak dağıtımı yapamayacağına dair ekonomik hesaplama problemi.',
    date: '14 Mart 2026',
    commentsCount: 12,
    content: 'Taslak İçerik'
  }
];
