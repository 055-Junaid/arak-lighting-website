export type PoleFamily = "city" | "pedestrian" | "heritage";

export interface Pole {
  slug: string;
  name: string;
  tagline: string;
  /** Arabic tagline. Product names stay in Latin, as KNX and C°LB do elsewhere. */
  arTagline: string;
  family: PoleFamily;
  body: string;
  arBody: string;
}

export const POLE_FAMILIES: { id: PoleFamily | "all"; en: string; ar: string }[] = [
  { id: "all", en: "All designs", ar: "كل التصاميم" },
  { id: "city", en: "Smart city masts", ar: "أعمدة المدن الذكية" },
  { id: "pedestrian", en: "Pedestrian and park", ar: "الممرات والحدائق" },
  { id: "heritage", en: "Heritage and ornamental", ar: "التراثية والزخرفية" },
];

/**
 * The C°LB Smart Light Pole Series as published in the manufacturer catalogue.
 * Families are our own grouping, based on the scale each pole is drawn at.
 */
export const POLES: Pole[] = [
  {
    slug: "quantum",
    name: "Quantum",
    tagline: "Futuristic light, now",
    arTagline: "ضوء المستقبل، الآن",
    family: "city",
    body: "A groundbreaking modern pole light that propels outdoor illumination into the future. Quantum transcends conventional aesthetics and redefines the essence of outdoor lighting, integrating into urban environments while still making a bold statement of cutting-edge design. The ribbon that wraps the mast carries the light line down its full height.",
    arBody: "عمود إنارة حديث يدفع الإضاءة الخارجية نحو المستقبل. يتجاوز Quantum المعايير الجمالية التقليدية ويعيد تعريف جوهر الإضاءة الخارجية، فيندمج في المحيط العمراني مع حضور تصميمي جريء. ويحمل الشريط الملتفّ حول العمود خطَّ الضوء على كامل ارتفاعه.",
  },
  {
    slug: "ignis",
    name: "Ignis",
    tagline: "Sophistication in radiance",
    arTagline: "رقيٌّ في التوهّج",
    family: "city",
    body: "A state-of-the-art pole light that blends futuristic design with cutting-edge security. Sporting dual lighting heads, a camera cluster and a full-height display, Ignis turns its surroundings into vibrant, well-lit and observed ground without looking like a piece of enforcement equipment.",
    arBody: "عمود إنارة متطوّر يجمع بين التصميم المستقبلي وأنظمة الأمن المتقدّمة. برأسَي إضاءة ومجموعة كاميرات وشاشة بكامل الارتفاع، يحوّل Ignis محيطه إلى فضاء نابض ومضاء ومراقَب دون أن يبدو كمعدّة أمنية.",
  },
  {
    slug: "eclipse",
    name: "Eclipse",
    tagline: "Visionary outdoor radiance",
    arTagline: "توهّج خارجي بروح استشرافية",
    family: "city",
    body: "A revolutionary marvel in modern pole lighting that pushes the limits of both style and function. Cast your surroundings into the dual brilliance of Eclipse, where each lighting head takes centre stage and orchestrates a play of light and shadow that adds depth and character to the outdoor ambience.",
    arBody: "إنجاز ثوري في أعمدة الإضاءة الحديثة يتخطّى حدود الشكل والوظيفة معًا. اغمر محيطك بسطوع رأسَي Eclipse، حيث يتصدّر كل رأس المشهد ليؤلّف لعبةً من الضوء والظل تمنح الأجواء الخارجية عمقًا وطابعًا خاصًا.",
  },
  {
    slug: "fusion",
    name: "Fusion",
    tagline: "Progressive urban lighting",
    arTagline: "إضاءة حضرية متقدّمة",
    family: "city",
    body: "A modern aesthetic with a dedicated focus on enhanced security. Dual lighting heads and meticulous precision let Fusion integrate into urban landscapes, offering not just a symphony of light but a heightened sense of safety on the streets it stands over.",
    arBody: "جماليات حديثة مع تركيز خاص على تعزيز الأمن. برأسَي إضاءة ودقّة عالية في التنفيذ، يندمج Fusion في المشهد العمراني ليقدّم سيمفونيةً من الضوء وإحساسًا أعمق بالأمان في الشوارع التي يقف عليها.",
  },
  {
    slug: "orbit",
    name: "Orbit",
    tagline: "Revolutionary glow",
    arTagline: "توهّج ثوري",
    family: "city",
    body: "Modern, minimalistic and futuristic in equal measure. Boasting dual lighting heads, Orbit turns outdoor spaces into vibrant spheres of radiance and converges form and function into a single silhouette that reads as an icon rather than as street furniture.",
    arBody: "حديث وبسيط ومستقبلي في آنٍ واحد. برأسَي إضاءة، يحوّل Orbit المساحات الخارجية إلى دوائر نابضة بالضوء، ويجمع الشكل والوظيفة في هيئةٍ واحدة تُقرأ كأيقونة لا كقطعة أثاث للشارع.",
  },
  {
    slug: "helio",
    name: "Helio",
    tagline: "Urban luminary mastery",
    arTagline: "إتقان الإضاءة الحضرية",
    family: "city",
    body: "More than a luminaire. Dual lighting heads and advanced functionality give Helio a sleek contemporary silhouette and a strong emphasis on heightened security, reshaping the landscape of outdoor lighting on wide roads and boulevards.",
    arBody: "أكثر من مجرّد وحدة إضاءة. يمنح رأسا الإضاءة والوظائف المتقدّمة عمود Helio هيئةً معاصرة انسيابية وتركيزًا واضحًا على رفع مستوى الأمن، بما يعيد تشكيل مشهد الإضاءة الخارجية على الطرق الواسعة والشوارع الرئيسية.",
  },
  {
    slug: "vista",
    name: "Vista",
    tagline: "Sophistication in simplicity",
    arTagline: "رقيٌّ في البساطة",
    family: "city",
    body: "A paragon of contemporary elegance. Its minimalistic design and innovative dual-headed configuration integrate seamlessly into urban environments, offering a blend of form and utility crafted with precision and an eye for restraint.",
    arBody: "نموذج للأناقة المعاصرة. يندمج تصميمه البسيط وتكوينه المبتكر ثنائي الرأس في البيئات الحضرية بسلاسة، ليقدّم مزيجًا من الشكل والمنفعة صيغ بدقّة وبعينٍ تميل إلى الاقتصاد في التفاصيل.",
  },
  {
    slug: "echo",
    name: "Echo",
    tagline: "Lighting the future",
    arTagline: "إضاءة المستقبل",
    family: "pedestrian",
    body: "Meticulously crafted with an unwavering focus on precision and functionality. Echo's design is a deliberate ode to simplicity, a luminaire that melds effortlessly with a diverse tapestry of architectural landscapes where a loud pole would be the wrong answer.",
    arBody: "مصنوع بعناية فائقة مع تركيز ثابت على الدقّة والوظيفة. تصميم Echo تحيّةٌ مقصودة للبساطة؛ وحدة إضاءة تنسجم بلا جهد مع نسيج معماري متنوّع، حيث يكون العمود اللافت هو الخيار الخاطئ.",
  },
  {
    slug: "luminara",
    name: "Luminara",
    tagline: "Elevate with modernity",
    arTagline: "ارتقِ بالحداثة",
    family: "city",
    body: "Sleek contours and contemporary design transform a mere light source into an ambience. Luminara unites form and function, delivering a minimalist aesthetic backed by cutting-edge technology, sensors and a colour display panel at eye level.",
    arBody: "انحناءات انسيابية وتصميم معاصر يحوّلان مصدر الضوء إلى أجواء كاملة. يوحّد Luminara الشكل والوظيفة، ويقدّم جماليةً بسيطة تسندها تقنيات متقدّمة وأجهزة استشعار ولوحة عرض ملوّنة عند مستوى النظر.",
  },
  {
    slug: "nova",
    name: "Nova",
    tagline: "Illuminating modern elegance",
    arTagline: "أناقة حديثة مضيئة",
    family: "city",
    body: "A seamless blend of sleek aesthetics and cutting-edge functionality. Nova's minimalist design syncs with contemporary architecture and bathes outdoor spaces in a radiant glow, positioning it as the choice for schemes looking to redefine outdoor lighting.",
    arBody: "مزيج سلس بين الجماليات الانسيابية والوظائف المتقدّمة. ينسجم تصميم Nova البسيط مع العمارة المعاصرة ويغمر المساحات الخارجية بتوهّج مشعّ، ما يجعله الخيار الأنسب للمشاريع التي تسعى إلى إعادة تعريف الإضاءة الخارجية.",
  },
  {
    slug: "axis",
    name: "Axis",
    tagline: "Elevate urban aesthetics",
    arTagline: "ارتقِ بجماليات المدينة",
    family: "city",
    body: "Cutting-edge technology and contemporary sophistication merged with the urban landscape to make a bold statement. Axis blends form and function in perfect harmony, setting a benchmark for excellence where modern design meets the dynamic demands of urban living.",
    arBody: "تقنيات متقدّمة ورقيّ معاصر يندمجان مع المشهد العمراني ليصنعا حضورًا لافتًا. يجمع Axis الشكل والوظيفة في تناغم تام، ويضع معيارًا للتميّز حيث يلتقي التصميم الحديث بمتطلّبات الحياة الحضرية المتغيّرة.",
  },
  {
    slug: "prism",
    name: "Prism",
    tagline: "Modern pole grandeur",
    arTagline: "فخامة العمود الحديث",
    family: "city",
    body: "An avant-garde design with a uniquely modern aesthetic and a streamlined silhouette. Prism integrates effortlessly into urban landscapes and enhances the atmosphere around it, carrying signage, sensors and a service enclosure on a single clean shaft.",
    arBody: "تصميم طليعي بجمالية حديثة متفرّدة وهيئة انسيابية. يندمج Prism في المشهد العمراني بلا عناء ويثري الأجواء من حوله، حاملًا اللوحات وأجهزة الاستشعار وحيّز الخدمات على عمودٍ واحد نظيف الخطوط.",
  },
  {
    slug: "brillar",
    name: "Brillar",
    tagline: "Radiant outdoor ambiance",
    arTagline: "أجواء خارجية مشعّة",
    family: "pedestrian",
    body: "A fusion of sophistication and innovation with a radiant aura. Brillar's minimalist design integrates with modern architecture, and every detail reflects a commitment to both form and function on walkways, plazas and landscaped grounds.",
    arBody: "امتزاج بين الرقيّ والابتكار بهالة مضيئة. يندمج تصميم Brillar البسيط مع العمارة الحديثة، وتعكس كل تفصيلة فيه التزامًا بالشكل والوظيفة معًا على الممرات والساحات والمسطحات المنسّقة.",
  },
  {
    slug: "nexus",
    name: "Nexus",
    tagline: "Urban radiance redefined",
    arTagline: "إعادة تعريف التوهّج الحضري",
    family: "city",
    body: "Designed for dynamic city landscapes. Sleek contours and advanced technology position Nexus as a beacon in urban settings, elevating safety and aesthetic appeal at once with twin display faces built into the mast.",
    arBody: "مصمَّم للمشاهد الحضرية المتغيّرة. تضع الانحناءات الانسيابية والتقنيات المتقدّمة عمود Nexus في موضع المنارة داخل المدينة، فيرفع مستوى الأمان والجمال معًا بواجهتَي عرض مدمجتين في جسمه.",
  },
  {
    slug: "zenith",
    name: "Zenith",
    tagline: "Dual path illumination",
    arTagline: "إضاءة بمسارَين",
    family: "city",
    body: "Cutting-edge design with unparalleled functionality. Zenith's distinctive dual heads orchestrate a symphony of light that prioritises safety and elevates the aesthetic essence of urban environments, setting a standard for contemporary public space.",
    arBody: "تصميم متقدّم ووظائف لا تُضاهى. ينسّق رأسا Zenith المميّزان سيمفونيةً من الضوء تضع السلامة في المقدّمة وترتقي بجوهر البيئات الحضرية، واضعةً معيارًا للفضاء العام المعاصر.",
  },
  {
    slug: "cascade",
    name: "Cascade",
    tagline: "Sculpting light in style",
    arTagline: "نحت الضوء بأناقة",
    family: "pedestrian",
    body: "A sleek, contemporary aesthetic that transcends traditional boundaries. Cascade is crafted with attention to detail and a vision for modernity, illuminating outdoor spaces from a low column with a harmonious fusion of form and function.",
    arBody: "جمالية معاصرة انسيابية تتجاوز الحدود التقليدية. صيغ Cascade بعناية بالتفاصيل ورؤية للحداثة، فيضيء المساحات الخارجية من عمود منخفض بمزيج متناغم من الشكل والوظيفة.",
  },
  {
    slug: "solace",
    name: "Solace",
    tagline: "Inventive path brilliance",
    arTagline: "سطوع مبتكر للممرات",
    family: "heritage",
    body: "Crafted with precision and a commitment to pushing the boundaries of modern design. Solace's ornamental crown contributes not only to the illumination of the urban landscape but to the character of the street, casting a warm and inviting glow as day turns to night.",
    arBody: "صيغ بدقّة وبالتزام بتخطّي حدود التصميم الحديث. لا يسهم تاج Solace الزخرفي في إنارة المشهد العمراني فحسب، بل في طابع الشارع نفسه، فيلقي توهّجًا دافئًا يرحّب بالمارّة مع تحوّل النهار إلى ليل.",
  },
  {
    slug: "astra",
    name: "Astra",
    tagline: "A symphony of light",
    arTagline: "سيمفونية من الضوء",
    family: "heritage",
    body: "A sculpted crown on a classical shaft, finished in bronze. Astra elevates the aesthetics of outdoor spaces with avant-garde brilliance, and carries the same sensors, cameras and display panel as the modern masts on a body that suits a heritage district.",
    arBody: "تاج منحوت على عمود كلاسيكي بتشطيب برونزي. يرتقي Astra بجماليات المساحات الخارجية ببريق طليعي، ويحمل أجهزة الاستشعار والكاميرات ولوحة العرض نفسها التي تحملها الأعمدة الحديثة، لكن بجسمٍ يليق بحيٍّ تراثي.",
  },
  {
    slug: "verve",
    name: "Verve",
    tagline: "Timeless elegance",
    arTagline: "أناقة لا يطويها الزمن",
    family: "heritage",
    body: "Timeless elegance woven into the fabric of modern innovation. A traditional lantern hangs from a contemporary bracket, and the banner panel below it carries city or event branding, making Verve a natural fit for boulevards and civic programmes.",
    arBody: "أناقة خالدة منسوجة في نسيج الابتكار الحديث. فانوس تقليدي معلّق على ذراع معاصرة، ولوحة إعلانية تحته تحمل هوية المدينة أو الفعاليات، ما يجعل Verve خيارًا طبيعيًا للشوارع الرئيسية والبرامج البلدية.",
  },
  {
    slug: "zen",
    name: "Zen",
    tagline: "Sleek luminance essence",
    arTagline: "جوهر الضوء الانسيابي",
    family: "heritage",
    body: "Contemporary pole innovation with an avant-garde design. Zen's streamlined, modern silhouette integrates effortlessly into urban landscapes, delivering not only light but a declaration of elegance, with a lantern, a signage disc and a sensor arm on one shaft.",
    arBody: "ابتكار معاصر في الأعمدة بتصميم طليعي. تندمج هيئة Zen الحديثة الانسيابية في المشهد العمراني بلا عناء، فتقدّم الضوء وإعلانًا عن الأناقة في آن، بفانوس وقرص للّوحات وذراع لأجهزة الاستشعار على عمود واحد.",
  },
];

export const POLE_FUNCTIONS = [
  {
    title: "Long-life LED lighting",
    arTitle: "إضاءة LED طويلة العمر",
    body: "The primary job. High-efficacy LED heads with the lumen output and distribution the road class calls for.",
    arBody: "المهمّة الأساسية. رؤوس LED عالية الكفاءة بتدفّق ضوئي وتوزيع يناسبان تصنيف الطريق.",
  },
  {
    title: "Flexible and intelligent light control",
    arTitle: "تحكّم ذكي ومرن بالإضاءة",
    body: "Dimming profiles, astronomical scheduling and motion response, set per pole or per zone from the control centre.",
    arBody: "أنماط خفت الإضاءة، والجدولة الفلكية، والاستجابة للحركة، تُضبط لكل عمود أو لكل نطاق من مركز التحكّم.",
  },
  {
    title: "Simple and efficient centralised control",
    arTitle: "تحكّم مركزي بسيط وفعّال",
    body: "One dashboard for every pole on the network, with fault reporting that tells you which unit failed before a resident does.",
    arBody: "لوحة متابعة واحدة لكل عمود على الشبكة، مع تقارير أعطال تخبرك بالوحدة المتعطّلة قبل أن يخبرك بها أحد السكان.",
  },
  {
    title: "5G micro base station",
    arTitle: "محطة قاعدية مصغّرة للجيل الخامس",
    body: "The mast doubles as small-cell mounting, which is what makes dense 5G coverage viable in a built-up district.",
    arBody: "يعمل العمود كذلك حاملًا للخلايا الصغيرة، وهو ما يجعل تغطية الجيل الخامس الكثيفة ممكنة داخل الأحياء المبنيّة.",
  },
  {
    title: "High-speed broadband",
    arTitle: "إنترنت عريض النطاق عالي السرعة",
    body: "Public WiFi access points fed from the same fibre run that serves the pole's other services.",
    arBody: "نقاط وصول واي فاي عامة تُغذّى من مسار الألياف نفسه الذي يخدم بقية أنظمة العمود.",
  },
  {
    title: "HD video surveillance",
    arTitle: "مراقبة بالفيديو عالية الدقة",
    body: "Fixed and PTZ cameras at the correct height for plate and face capture, cabled inside the shaft.",
    arBody: "كاميرات ثابتة وأخرى متحرّكة PTZ على الارتفاع الصحيح لالتقاط اللوحات والوجوه، بكابلات ممدودة داخل جسم العمود.",
  },
  {
    title: "Air quality monitoring",
    arTitle: "رصد جودة الهواء",
    body: "Particulate, temperature, humidity and noise sensing, reported continuously to the city platform.",
    arBody: "استشعار الجسيمات ودرجة الحرارة والرطوبة والضجيج، مع رفع القراءات باستمرار إلى منصّة المدينة.",
  },
  {
    title: "Real-time traffic statistics",
    arTitle: "إحصاءات مرورية لحظية",
    body: "Vehicle and pedestrian counting that feeds signal timing, planning studies and event management.",
    arBody: "عدّ المركبات والمشاة بما يغذّي توقيت الإشارات ودراسات التخطيط وإدارة الفعاليات.",
  },
  {
    title: "Outdoor LED display",
    arTitle: "شاشة LED خارجية",
    body: "Weather-rated signage faces for wayfinding, public information, event programming or commercial content.",
    arBody: "واجهات عرض مقاومة للعوامل الجوية للإرشاد والمعلومات العامة وبرامج الفعاليات أو المحتوى التجاري.",
  },
  {
    title: "Multi-functional public broadcasting",
    arTitle: "بثّ عام متعدّد الوظائف",
    body: "Addressable speakers for announcements, emergency instruction and scheduled programming.",
    arBody: "سمّاعات قابلة للعنونة للإعلانات وتعليمات الطوارئ والبرامج المجدولة.",
  },
  {
    title: "One-button emergency call",
    arTitle: "نداء طوارئ بزرّ واحد",
    body: "A direct line to the operations centre, with the camera at that pole automatically brought up on the operator's screen.",
    arBody: "خطّ مباشر إلى مركز العمليات، مع استدعاء كاميرا العمود نفسه تلقائيًا على شاشة المشغّل.",
  },
  {
    title: "Unified multi-service access gateway",
    arTitle: "بوابة وصول موحّدة متعدّدة الخدمات",
    body: "A single gateway per pole so power, network and every connected device are provisioned and monitored as one asset.",
    arBody: "بوابة واحدة لكل عمود، بحيث تُهيّأ الكهرباء والشبكة وكل جهاز متّصل وتُراقَب كأصلٍ واحد.",
  },
];

export const POLE_LAYERS = [
  {
    layer: "Application layer",
    arLayer: "طبقة التطبيقات",
    detail: "System integration application and control panel",
    arDetail: "تطبيق تكامل الأنظمة ولوحة التحكّم",
    body: "Where the city actually operates the network: dashboards, schedules, alarms, reports and the integrations into whatever command platform the client already runs.",
    arBody: "حيث تُشغّل المدينة الشبكة فعليًا: لوحات المتابعة والجداول والإنذارات والتقارير، والتكامل مع أي منصّة قيادة يعتمدها العميل أصلًا.",
  },
  {
    layer: "Control layer",
    arLayer: "طبقة التحكّم",
    detail: "Smart lighting control alongside traditional lighting control",
    arDetail: "تحكّم ذكي بالإضاءة إلى جانب التحكّم التقليدي",
    body: "The bridge between the software and the hardware. Smart control handles addressable dimming and sensor logic, while conventional contactor control stays available as a fallback path.",
    arBody: "الجسر بين البرمجيات والأجهزة. يتولّى التحكّم الذكي الخفت القابل للعنونة ومنطق أجهزة الاستشعار، بينما يبقى التحكّم التقليدي بالمرحّلات متاحًا كمسار احتياطي.",
  },
  {
    layer: "Terminal layer",
    arLayer: "الطبقة الطرفية",
    detail: "Sensors and LED luminaires",
    arDetail: "أجهزة الاستشعار ووحدات إضاءة LED",
    body: "The devices on the pole itself. Sensors report conditions up the stack, luminaires take instructions down it, and both can be driven directly from the control layer if the network is unavailable.",
    arBody: "الأجهزة على العمود نفسه. ترفع أجهزة الاستشعار قراءاتها إلى أعلى، وتتلقّى وحدات الإضاءة تعليماتها من أسفل، ويمكن تشغيل الاثنين مباشرةً من طبقة التحكّم إذا انقطعت الشبكة.",
  },
];

export const ARAK_ROLE = [
  {
    no: "01",
    title: "Survey and design",
    arTitle: "المسح والتصميم",
    body: "Pole spacing, mounting heights, uniformity and glare calculations, plus a services schedule that says exactly which devices go on which pole. We produce the drawings the consultant and the municipality both need to sign.",
    arBody: "تباعد الأعمدة وارتفاعات التركيب وحسابات الانتظامية والوهج، مع جدول خدمات يحدّد بدقّة أي الأجهزة تُركَّب على أي عمود. ننتج المخططات التي يحتاج الاستشاري والأمانة إلى اعتمادها معًا.",
  },
  {
    no: "02",
    title: "Supply",
    arTitle: "التوريد",
    body: "Direct supply of the C°LB Smart Light Pole Series with the luminaires, gateways, cameras, sensors and display panels each design carries. Procurement, shipping, customs and phased delivery are handled by our project team.",
    arBody: "توريد مباشر لسلسلة أعمدة الإضاءة الذكية C°LB بما تحمله من وحدات إضاءة وبوابات وكاميرات وأجهزة استشعار ولوحات عرض لكل تصميم. ويتولّى فريق المشاريع لدينا الشراء والشحن والتخليص الجمركي والتسليم على مراحل.",
  },
  {
    no: "03",
    title: "Civil works and installation",
    arTitle: "الأعمال المدنية والتركيب",
    body: "Foundations, ducting, cabling and erection, coordinated with the road or landscape contractor so the poles go in once, at the right level, on the programme everyone else is working to.",
    arBody: "الأساسات والتمديدات والكابلات ونصب الأعمدة، بالتنسيق مع مقاول الطرق أو تنسيق المواقع بحيث تُركَّب الأعمدة مرّة واحدة، على المنسوب الصحيح، ووفق البرنامج الزمني الذي يعمل عليه الجميع.",
  },
  {
    no: "04",
    title: "Integration and commissioning",
    arTitle: "التكامل والتشغيل",
    body: "Gateway provisioning, device addressing, network configuration and control-centre integration. We commission the whole pole as one asset, not as nine separate devices that happen to share a shaft.",
    arBody: "تهيئة البوابات وعنونة الأجهزة وضبط الشبكة والتكامل مع مركز التحكّم. نُشغّل العمود بالكامل كأصلٍ واحد، لا كتسعة أجهزة منفصلة تتشارك عمودًا واحدًا.",
  },
  {
    no: "05",
    title: "Operation and maintenance",
    arTitle: "التشغيل والصيانة",
    body: "Spares, firmware, fault response and reporting after handover. Fifty years of after-sale support on lighting is the reason clients let us put this much of the street on one pole.",
    arBody: "قطع الغيار والبرامج الثابتة والاستجابة للأعطال والتقارير بعد التسليم. خمسون عامًا من الدعم بعد البيع في مجال الإضاءة هي السبب الذي يجعل عملاءنا يضعون هذا القدر من الشارع على عمود واحد.",
  },
];

/**
 * Family names in both languages. Lives here rather than in either page so
 * the grid's filter chips and the detail pages always agree.
 */
export const FAMILY_LABEL: Record<PoleFamily, { en: string; ar: string }> = {
  city: { en: "Smart city mast", ar: "عمود المدينة الذكية" },
  pedestrian: { en: "Pedestrian and park", ar: "الممرات والحدائق" },
  heritage: { en: "Heritage and ornamental", ar: "التراثية والزخرفية" },
};

/** Narrows an arbitrary string to a family, for reading one out of the URL. */
export function isPoleFamily(value: string | undefined): value is PoleFamily {
  return value === "city" || value === "pedestrian" || value === "heritage";
}

export const getPole = (slug: string) => POLES.find((p) => p.slug === slug);

/**
 * Neighbours in catalogue order, for the previous/next links at the foot of a
 * pole page. Wraps at both ends so the series is a loop rather than a
 * dead end on the twentieth design.
 */
export function getPoleNeighbours(slug: string) {
  const at = POLES.findIndex((p) => p.slug === slug);
  if (at === -1) return { previous: undefined, next: undefined };
  return {
    previous: POLES[(at - 1 + POLES.length) % POLES.length],
    next: POLES[(at + 1) % POLES.length],
  };
}
