/**
 * Расширенная база достопримечательностей по городам России.
 * Каждый город: 12-20 мест разных категорий и временных слотов.
 */

export type TimeSlot = 'morning' | 'afternoon' | 'evening';

export interface PlaceTemplate {
  name: string;
  category: string;
  description: string;
  emoji: string;
  duration: string;
  price: string;
  rating: number;
  interests: string[];
  timeSlot: TimeSlot;
  address?: string;
  lat?: number;
  lng?: number;
  accessible?: {
    wheelchair: boolean;
    audioGuide: boolean;
    braille: boolean;
    parkingNearby: boolean;
    notes?: string;
  };
}

const RAW_CITY_PLACES: Record<string, PlaceTemplate[]> = {

  // ──────────────────────────────────────────────────────────────────────────
  'санкт-петербург': [
    { name: 'Государственный Эрмитаж', category: 'Музей', description: 'Один из крупнейших художественных и культурно-исторических музеев мира. 3 млн экспонатов в 350 залах.', emoji: '🏛️', duration: '3-4 часа', price: '500 ₽', rating: 4.9, interests: ['museums', 'art', 'history'], timeSlot: 'morning', address: 'Дворцовая площадь, 2' },
    { name: 'Петергоф', category: 'Дворцово-парковый ансамбль', description: 'Знаменитые фонтаны, дворцы и парки на берегу Финского залива. «Русский Версаль».', emoji: '⛲', duration: '4-5 часов', price: '450 ₽', rating: 4.8, interests: ['architecture', 'history', 'nature'], timeSlot: 'morning', address: 'г. Петергоф, Разводная ул., 2' },
    { name: 'Невский проспект', category: 'Прогулка', description: 'Главная магистраль Петербурга, 4,5 км архитектурных шедевров, кафе и магазинов.', emoji: '🚶', duration: '2-3 часа', price: 'Бесплатно', rating: 4.7, interests: ['architecture', 'shopping', 'food'], timeSlot: 'afternoon', address: 'Невский проспект' },
    { name: 'Русский музей', category: 'Музей', description: 'Крупнейший в мире музей русского искусства. Работы Репина, Врубеля, Малевича.', emoji: '🎨', duration: '2-3 часа', price: '400 ₽', rating: 4.8, interests: ['museums', 'art'], timeSlot: 'morning', address: 'Инженерная ул., 4' },
    { name: 'Разводные мосты', category: 'Вечернее шоу', description: 'Символ белых ночей — разводка Дворцового и Благовещенского мостов в 01:10–02:50.', emoji: '🌉', duration: '2 часа', price: 'Бесплатно', rating: 4.9, interests: ['architecture', 'nature'], timeSlot: 'evening', address: 'Дворцовый мост' },
    { name: 'Петропавловская крепость', category: 'История', description: 'Сердце Петербурга. Соборная колокольня, Нева, пляж Петропавловки и пушечные выстрелы в полдень.', emoji: '🏰', duration: '2 часа', price: '350 ₽', rating: 4.7, interests: ['history', 'architecture'], timeSlot: 'morning', address: 'Петропавловская крепость, 3' },
    { name: 'Казанский собор', category: 'Архитектура', description: 'Великолепный неоклассический собор с колоннадой на Невском проспекте.', emoji: '⛪', duration: '1 час', price: 'Бесплатно', rating: 4.7, interests: ['architecture', 'history'], timeSlot: 'afternoon', address: 'Казанская пл., 2' },
    { name: 'Рынок «Вокруг Света»', category: 'Еда', description: 'Гастромаркет с лучшей едой Петербурга — морепродукты, крафтовое пиво, местные деликатесы.', emoji: '🦞', duration: '1.5 часа', price: '1 000–2 000 ₽', rating: 4.6, interests: ['food'], timeSlot: 'evening', address: 'ул. Садовая, 28–30' },
    { name: 'Исаакиевский собор', category: 'Архитектура', description: 'Один из крупнейших куполов мира. Смотровая колоннада с видом 360° на город.', emoji: '🕌', duration: '1.5 часа', price: '350 ₽', rating: 4.8, interests: ['architecture', 'history'], timeSlot: 'afternoon', address: 'Исаакиевская пл., 4' },
    { name: 'Лофт Проект Этажи', category: 'Культура', description: 'Арт-кластер в здании бывшего хлебозавода. Галереи, кафе, крыша с лучшим видом на город.', emoji: '🖼️', duration: '2 часа', price: '200 ₽', rating: 4.5, interests: ['art', 'nightlife'], timeSlot: 'evening', address: 'Лиговский пр., 74' },
    { name: 'Кронштадт', category: 'День-поездка', description: 'Остров-крепость с военно-морской историей, Морским собором и старыми фортами.', emoji: '⚓', duration: '5-6 часов', price: 'Бесплатно', rating: 4.6, interests: ['history', 'nature'], timeSlot: 'morning', address: 'г. Кронштадт' },
    { name: 'Улица Рубинштейна', category: 'Еда и ночная жизнь', description: '«Желудочная улица» — самая гастрономическая улица Петербурга. Десятки ресторанов и баров.', emoji: '🍾', duration: '2-3 часа', price: '1 500–3 000 ₽', rating: 4.7, interests: ['food', 'nightlife'], timeSlot: 'evening', address: 'ул. Рубинштейна' },
    { name: 'Ленинградский зоопарк', category: 'Природа', description: 'Один из старейших зоопарков России с уникальными животными.', emoji: '🦁', duration: '2-3 часа', price: '400 ₽', rating: 4.4, interests: ['nature'], timeSlot: 'afternoon', address: 'Александровский парк, 1' },
    { name: 'Летний сад', category: 'Природа', description: 'Старейший сад Петербурга с дубами, фонтанами и мраморными скульптурами.', emoji: '🌳', duration: '1.5 часа', price: 'Бесплатно', rating: 4.6, interests: ['nature', 'history'], timeSlot: 'afternoon', address: 'Летний сад' },
    { name: 'Пушкин (Царское село)', category: 'История', description: 'Янтарная комната и Екатерининский дворец — самое роскошное барокко России.', emoji: '👑', duration: '4-5 часов', price: '900 ₽', rating: 4.9, interests: ['history', 'art', 'architecture'], timeSlot: 'morning', address: 'г. Пушкин, Садовая ул., 7' },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  москва: [
    { name: 'Красная площадь и Кремль', category: 'История', description: 'Главная площадь страны с Мавзолеем, собором Василия Блаженного и Кремлём. Must see.', emoji: '🧱', duration: '2-3 часа', price: 'Бесплатно / 700 ₽', rating: 4.9, interests: ['history', 'architecture'], timeSlot: 'morning', address: 'Красная площадь' },
    { name: 'Третьяковская галерея', category: 'Музей', description: 'Крупнейший музей русского изобразительного искусства. Иконы, передвижники, авангард.', emoji: '🖼️', duration: '2-3 часа', price: '500 ₽', rating: 4.8, interests: ['museums', 'art', 'history'], timeSlot: 'morning', address: 'Лаврушинский пер., 10' },
    { name: 'ВДНХ', category: 'Архитектура', description: 'Огромный выставочный комплекс с фонтанами, павильонами советской эпохи и Космическим музеем.', emoji: '🚀', duration: '3 часа', price: 'Бесплатно', rating: 4.7, interests: ['architecture', 'museums', 'history'], timeSlot: 'afternoon', address: 'пр. Мира, 119' },
    { name: 'Горки Ленинские / Коломенское', category: 'Природа', description: 'Усадьба на берегу Москвы-реки с церковью Вознесения — объектом ЮНЕСКО.', emoji: '⛪', duration: '2-3 часа', price: 'Бесплатно', rating: 4.7, interests: ['history', 'nature', 'architecture'], timeSlot: 'afternoon', address: 'пр. Андропова, 39' },
    { name: 'Смотровая Москва-Сити', category: 'Виды', description: 'Панорамный вид с 89-го этажа Башни ОКО или «Федерации». Лучше на закате.', emoji: '🏙️', duration: '1.5 часа', price: '1 500 ₽', rating: 4.6, interests: ['architecture'], timeSlot: 'evening', address: 'ул. Пресненская наб., 12' },
    { name: 'Парк Горького', category: 'Природа', description: 'Любимое место отдыха москвичей — набережная, велодорожки, кафе, кинотеатр и Гараж.', emoji: '🌳', duration: '2-3 часа', price: 'Бесплатно', rating: 4.8, interests: ['nature', 'art'], timeSlot: 'afternoon', address: 'Крымский Вал, 9' },
    { name: 'Патриаршие пруды', category: 'Прогулка', description: 'Романтичный район с бульваром, прудом и лучшими ресторанами Москвы рядом.', emoji: '🦢', duration: '1.5 часа', price: 'Бесплатно', rating: 4.7, interests: ['food', 'nature'], timeSlot: 'afternoon', address: 'Малый Патриарший пер.' },
    { name: 'Арбат', category: 'Прогулка', description: 'Легендарная пешеходная улица с сувенирами, уличными музыкантами и домом-музеем Пушкина.', emoji: '🎸', duration: '1.5 часа', price: 'Бесплатно', rating: 4.5, interests: ['architecture', 'shopping', 'history'], timeSlot: 'afternoon', address: 'ул. Арбат' },
    { name: 'Зарядье', category: 'Архитектура', description: 'Парк у Кремля с парящим мостом, ледяной пещерой и панорамным видом на Москву-реку.', emoji: '🌿', duration: '2 часа', price: 'Бесплатно', rating: 4.6, interests: ['architecture', 'nature'], timeSlot: 'afternoon', address: 'ул. Варварка, 6с1' },
    { name: 'Большой театр', category: 'Культура', description: 'Символ русской культуры. Опера и балет мирового уровня в историческом здании.', emoji: '🎭', duration: '3 часа', price: '2 000–15 000 ₽', rating: 4.9, interests: ['art', 'history'], timeSlot: 'evening', address: 'Театральная пл., 1' },
    { name: 'Измайловский Кремль', category: 'Шопинг', description: 'Сказочная крепость с огромным рынком сувениров, музеями водки и мёда.', emoji: '🎪', duration: '2-3 часа', price: 'Бесплатно', rating: 4.4, interests: ['shopping', 'history'], timeSlot: 'morning', address: 'Измайловское шоссе, 73Ж' },
    { name: 'Ресторанный квартал «Депо»', category: 'Еда', description: 'Крупнейший фудмаркет России с 70+ кухнями мира в историческом трамвайном депо.', emoji: '🍜', duration: '1.5-2 часа', price: '1 000–2 000 ₽', rating: 4.7, interests: ['food'], timeSlot: 'evening', address: 'ул. Лесная, 20' },
    { name: 'Царицыно', category: 'История', description: 'Неоготический дворец Екатерины II с парком, прудами и потрясающей архитектурой.', emoji: '🏯', duration: '3-4 часа', price: '300 ₽', rating: 4.7, interests: ['history', 'architecture', 'nature'], timeSlot: 'morning', address: 'ул. Дольская, 1' },
    { name: 'Воробьёвы горы', category: 'Виды', description: 'Лучшая смотровая на Москву, МГУ и Лужники внизу. Идеально на рассвете или закате.', emoji: '🌄', duration: '1-2 часа', price: 'Бесплатно', rating: 4.6, interests: ['nature'], timeSlot: 'evening', address: 'Воробьёвы горы' },
    { name: 'Музей Булгакова', category: 'Музей', description: 'Квартира, где жил Михаил Булгаков. «Нехорошая квартира» из «Мастера и Маргариты».', emoji: '😈', duration: '1 час', price: '300 ₽', rating: 4.6, interests: ['museums', 'history'], timeSlot: 'afternoon', address: 'Большая Садовая ул., 10' },
    { name: 'Ночной клуб Мутабор', category: 'Ночная жизнь', description: 'Главная электронная площадка России в промышленном лофте. Лучшие DJ-сеты.', emoji: '🎶', duration: '4 часа', price: '1 500–3 000 ₽', rating: 4.5, interests: ['nightlife'], timeSlot: 'evening', address: 'ул. Складочная, 3к1' },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  казань: [
    { name: 'Казанский Кремль', category: 'История', description: 'Белокаменная крепость — объект ЮНЕСКО с мечетью Кул-Шариф и башней Сюмбике.', emoji: '🏰', duration: '2-3 часа', price: '200 ₽', rating: 4.8, interests: ['history', 'architecture'], timeSlot: 'morning', address: 'Кремлёвская ул., 2' },
    { name: 'Мечеть Кул-Шариф', category: 'Архитектура', description: 'Одна из крупнейших мечетей России — голубые купола и богатое убранство.', emoji: '🕌', duration: '1 час', price: 'Бесплатно', rating: 4.8, interests: ['architecture', 'history'], timeSlot: 'morning', address: 'Казанский Кремль' },
    { name: 'Улица Баумана', category: 'Прогулка', description: 'Главная пешеходная улица Казани с кафе, сувенирами и фонтаном с котом Казанским.', emoji: '🛍️', duration: '2 часа', price: 'Бесплатно', rating: 4.6, interests: ['shopping', 'food'], timeSlot: 'afternoon', address: 'ул. Баумана' },
    { name: 'Старо-татарская слобода', category: 'История', description: 'Исторический татарский квартал с деревянными домами, мечетями и музеями.', emoji: '🏘️', duration: '1.5 часа', price: 'Бесплатно', rating: 4.6, interests: ['history', 'architecture'], timeSlot: 'afternoon', address: 'ул. Каюма Насыри' },
    { name: 'Чак-чак музей', category: 'Еда', description: 'Интерактивный музей национального татарского лакомства с дегустацией.', emoji: '🍯', duration: '1 час', price: '450 ₽', rating: 4.7, interests: ['food', 'museums'], timeSlot: 'afternoon', address: 'ул. Парижской Коммуны, 18' },
    { name: 'Татарский ужин в «Биляре»', category: 'Еда', description: 'Лучший ресторан татарской кухни — эчпочмак, перемяч, бефстроганов по-татарски.', emoji: '🥘', duration: '1.5 часа', price: '1 200–2 000 ₽', rating: 4.8, interests: ['food'], timeSlot: 'evening', address: 'ул. Астрономическая, 12' },
    { name: 'Озеро Кабан', category: 'Природа', description: 'Система городских озёр с набережной, велосипедными дорожками и панорамой города.', emoji: '🦆', duration: '1.5 часа', price: 'Бесплатно', rating: 4.5, interests: ['nature'], timeSlot: 'afternoon', address: 'Набережная Кабана' },
    { name: 'Аквапарк «Ривьера»', category: 'Активности', description: 'Один из крупнейших аквапарков России — крытый и открытый бассейны, горки.', emoji: '🏊', duration: '4-5 часов', price: '1 500 ₽', rating: 4.5, interests: ['sport', 'wellness'], timeSlot: 'afternoon', address: 'ул. Чистопольская, 43' },
    { name: 'Центр семьи «Казан»', category: 'Архитектура', description: 'ЗАГС в форме казана-котла с панорамной смотровой площадкой над Волгой.', emoji: '🪔', duration: '1 час', price: '200 ₽', rating: 4.6, interests: ['architecture'], timeSlot: 'afternoon', address: 'ул. Сибгата Хакима, 5Б' },
    { name: 'Деревня Универсиады', category: 'Архитектура', description: 'Современный квартал, построенный к Универсиаде 2013. Красивые виды на Казань.', emoji: '🌆', duration: '1 час', price: 'Бесплатно', rating: 4.3, interests: ['architecture'], timeSlot: 'evening', address: 'ул. Деревня Универсиады' },
    { name: 'Арт-кластер «Артель»', category: 'Ночная жизнь', description: 'Лучшие бары и живая музыка Казани в лофт-пространстве рядом с Кремлём.', emoji: '🍸', duration: '2-3 часа', price: '1 000–2 000 ₽', rating: 4.5, interests: ['nightlife', 'art'], timeSlot: 'evening', address: 'ул. Кремлёвская, 6' },
    { name: 'Свияжск', category: 'День-поездка', description: 'Остров-град с монастырями XVI века — малоизвестный объект ЮНЕСКО всего в 60 км.', emoji: '⛵', duration: '5-6 часов', price: '300 ₽', rating: 4.7, interests: ['history', 'architecture', 'nature'], timeSlot: 'morning', address: 'Зеленодольский р-н' },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  сочи: [
    { name: 'Олимпийский парк', category: 'Достопримечательность', description: 'Объекты Олимпиады-2014, фонтанное шоу «Сочи» и трасса Формулы-1.', emoji: '🏟️', duration: '2-3 часа', price: 'Бесплатно', rating: 4.7, interests: ['architecture', 'history', 'sport'], timeSlot: 'morning', address: 'Имеретинский курорт' },
    { name: 'Роза Хутор — горы', category: 'Природа', description: 'Канатные дороги, горные виды, пешие маршруты и озеро Кардывач летом.', emoji: '🏔️', duration: '5-6 часов', price: '1 800–2 500 ₽', rating: 4.9, interests: ['nature', 'hiking', 'sport'], timeSlot: 'morning', address: 'пос. Эсто-Садок' },
    { name: 'Пляж «Ривьера»', category: 'Пляж', description: 'Главный городской пляж Сочи с развитой инфраструктурой, водными видами и ресторанами.', emoji: '🏖️', duration: '3-4 часа', price: 'Бесплатно', rating: 4.5, interests: ['beach', 'nature'], timeSlot: 'afternoon', address: 'ул. Егорова, 1' },
    { name: 'Дендрарий', category: 'Природа', description: 'Парк с тысячами экзотических растений со всего мира и великолепным видом на море.', emoji: '🌴', duration: '2 часа', price: '400 ₽', rating: 4.7, interests: ['nature'], timeSlot: 'afternoon', address: 'Курортный пр., 74' },
    { name: 'Красная Поляна', category: 'Горный курорт', description: 'Три горнолыжных курорта с трассами летом и зимой. Лучшая горная Россия.', emoji: '⛷️', duration: 'Весь день', price: '2 000–5 000 ₽', rating: 4.8, interests: ['sport', 'nature', 'hiking'], timeSlot: 'morning', address: 'Красная Поляна' },
    { name: 'Набережная Сочи', category: 'Вечерняя прогулка', description: 'Главная вечерняя точка — рестораны, аттракционы, морской воздух и закат.', emoji: '🌊', duration: '2-3 часа', price: 'Бесплатно', rating: 4.7, interests: ['beach', 'food', 'nightlife'], timeSlot: 'evening', address: 'Морской пр.' },
    { name: 'Гора Ахун и башня', category: 'Природа', description: 'Смотровая башня на вершине горы 663 м с видом на море, горы и всё черноморское побережье.', emoji: '🌄', duration: '2-3 часа', price: '200 ₽', rating: 4.6, interests: ['nature', 'hiking'], timeSlot: 'afternoon', address: 'Гора Ахун' },
    { name: 'Агурские водопады', category: 'Природа', description: 'Каскад водопадов высотой до 30 м в Агурском ущелье. Тропа ~5 км от Ривьеры.', emoji: '💧', duration: '3-4 часа', price: 'Бесплатно', rating: 4.7, interests: ['nature', 'hiking'], timeSlot: 'morning', address: 'Ущелье реки Агура' },
    { name: 'Арбат (ул. Навагинская)', category: 'Прогулка', description: 'Пешеходная улица с уличными кафе, сувенирами, музыкантами.', emoji: '🍦', duration: '1-2 часа', price: 'Бесплатно', rating: 4.4, interests: ['shopping', 'food'], timeSlot: 'evening', address: 'ул. Навагинская' },
    { name: 'Ресторан «Бамбук»', category: 'Еда', description: 'Лучшая кавказская кухня в Сочи — шашлык, хинкали, чачa и вид на море.', emoji: '🍢', duration: '1.5-2 часа', price: '1 500–2 500 ₽', rating: 4.8, interests: ['food'], timeSlot: 'evening', address: 'Приморская ул., 12' },
    { name: 'Сочинский национальный парк', category: 'Природа', description: '190 000 га реликтовых лесов, ущелья, пещеры и горные реки.', emoji: '🌿', duration: '4-6 часов', price: '200 ₽', rating: 4.7, interests: ['nature', 'hiking'], timeSlot: 'morning', address: 'Курортный пр., 74' },
    { name: 'Казино на Красной Поляне', category: 'Ночная жизнь', description: 'Единственная легальная игровая зона в России с клубами и ресторанами.', emoji: '🎰', duration: '3-4 часа', price: 'Вход свободный', rating: 4.3, interests: ['nightlife'], timeSlot: 'evening', address: 'Красная Поляна, ГК «Сочи»' },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  калининград: [
    { name: 'Остров Канта и Кафедральный собор', category: 'История', description: 'Неоготический собор XIV века на острове, где похоронен Иммануил Кант.', emoji: '⛪', duration: '2 часа', price: '300 ₽', rating: 4.8, interests: ['history', 'architecture'], timeSlot: 'morning', address: 'Ул. Канта, 1' },
    { name: 'Рыбная деревня', category: 'Прогулка', description: 'Реконструкция старого Кёнигсберга на набережной с ресторанами, магазинами и мостом.', emoji: '🐟', duration: '1.5-2 часа', price: 'Бесплатно', rating: 4.6, interests: ['architecture', 'food'], timeSlot: 'afternoon', address: 'ул. Октябрьская, 1В' },
    { name: 'Район Амалиенау', category: 'Архитектура', description: '«Немецкий» район с виллами начала XX века в стиле модерн и северной готики.', emoji: '🏘️', duration: '1.5-2 часа', price: 'Бесплатно', rating: 4.7, interests: ['architecture'], timeSlot: 'afternoon', address: 'ул. Кутузова / Тельмана' },
    { name: 'Музей Янтаря', category: 'Музей', description: '«Золото Балтики» — уникальная коллекция янтарных изделий в Башне Дона.', emoji: '💛', duration: '1.5 часа', price: '350 ₽', rating: 4.6, interests: ['museums', 'history'], timeSlot: 'morning', address: 'пл. Победы, 1' },
    { name: 'Куршская коса', category: 'Природа', description: 'Узкий 98-км полуостров с дюнами, соснами и балтийским побережьем. Объект ЮНЕСКО.', emoji: '🌊', duration: '5-6 часов', price: '300 ₽', rating: 4.9, interests: ['nature', 'hiking', 'beach'], timeSlot: 'morning', address: 'Национальный парк «Куршская коса»' },
    { name: 'Балтийское море — пляжи', category: 'Пляж', description: 'Зеленоградск или Светлогорск — чистейшие балтийские пляжи в 45 минутах.', emoji: '🏖️', duration: '4-5 часов', price: 'Бесплатно', rating: 4.7, interests: ['beach', 'nature'], timeSlot: 'afternoon', address: 'г. Зеленоградск / Светлогорск' },
    { name: 'Королевский замок (руины)', category: 'История', description: 'Руины замка XIII века — сердце старого Кёнигсберга с видом на весь город.', emoji: '🏰', duration: '1 час', price: 'Бесплатно', rating: 4.4, interests: ['history'], timeSlot: 'afternoon', address: 'ул. Шевченко, 2' },
    { name: 'Форт № 11 «Дёнхофф»', category: 'История', description: 'Один из 12 крепостей кольца Кёнигсберга — форты с рвами, казематами и историей ВОВ.', emoji: '🔫', duration: '1.5 часа', price: '200 ₽', rating: 4.5, interests: ['history'], timeSlot: 'afternoon', address: 'ул. А. Невского, 63А' },
    { name: 'Ресторан «Dolce Vita»', category: 'Еда', description: 'Лучшие морепродукты Балтики — угорь, камбала, балтийская шпрота на гриле.', emoji: '🦐', duration: '1.5-2 часа', price: '1 500–2 500 ₽', rating: 4.7, interests: ['food'], timeSlot: 'evening', address: 'ул. Профессора Севастьянова, 18' },
    { name: 'Площадь Победы и ночная жизнь', category: 'Вечерняя прогулка', description: 'Центральная площадь с Кафедральным собором, фонтаном и кафе вокруг.', emoji: '🌃', duration: '2 часа', price: 'Бесплатно', rating: 4.5, interests: ['nightlife', 'architecture'], timeSlot: 'evening', address: 'пл. Победы' },
    { name: 'Световой музей янтаря', category: 'Культура', description: 'Иммерсивное шоу о Куршской косе и балтийском янтаре.', emoji: '✨', duration: '1 час', price: '400 ₽', rating: 4.4, interests: ['art', 'museums'], timeSlot: 'evening', address: 'Рыбная деревня' },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  владивосток: [
    { name: 'Токаревский маяк', category: 'Природа', description: 'Старейший маяк Приморья на косе — прогулка по тропинке над Японским морем.', emoji: '🗼', duration: '1.5 часа', price: 'Бесплатно', rating: 4.8, interests: ['nature'], timeSlot: 'morning', address: 'о. Токаревского' },
    { name: 'Русский мост и остров Русский', category: 'Архитектура', description: 'Один из крупнейших вантовых мостов мира. Кампус ДВФУ, маяк и природа острова.', emoji: '🌉', duration: '3-4 часа', price: 'Бесплатно', rating: 4.8, interests: ['architecture', 'nature'], timeSlot: 'morning', address: 'Русский мост' },
    { name: 'Набережная Цесаревича', category: 'Прогулка', description: 'Главная набережная с видом на порт, Золотой мост и огни города на закате.', emoji: '⚓', duration: '1.5-2 часа', price: 'Бесплатно', rating: 4.6, interests: ['nature', 'architecture'], timeSlot: 'evening', address: 'Набережная Цесаревича' },
    { name: 'Сопка Орлиное гнездо', category: 'Виды', description: 'Главная видовая точка Владивостока — панорама бухт и мостов с высоты 210 м.', emoji: '🦅', duration: '1 час', price: 'Бесплатно', rating: 4.7, interests: ['nature'], timeSlot: 'afternoon', address: 'Орлиное гнездо' },
    { name: 'Приморская картинная галерея', category: 'Музей', description: 'Более 6000 экспонатов — русская живопись, корейское и японское искусство.', emoji: '🎨', duration: '1.5-2 часа', price: '300 ₽', rating: 4.5, interests: ['museums', 'art'], timeSlot: 'morning', address: 'ул. Алеутская, 12' },
    { name: 'Рынок «Зелёный угол»', category: 'Шопинг', description: 'Известный авторынок с японскими праворульными автомобилями — колорит Владивостока.', emoji: '🚗', duration: '1 час', price: 'Бесплатно', rating: 4.2, interests: ['shopping'], timeSlot: 'morning', address: 'ул. Снеговая, 42' },
    { name: 'Ресторан «Zuma»', category: 'Еда', description: 'Лучшие морепродукты Тихоокеанского побережья — краб, гребешок, трепанг, икра.', emoji: '🦀', duration: '2 часа', price: '2 000–3 500 ₽', rating: 4.9, interests: ['food'], timeSlot: 'evening', address: 'ул. Светланская, 83' },
    { name: 'Полуостров Шамора', category: 'Пляж', description: 'Самый популярный пляж Владивостока на берегу Японского моря.', emoji: '🏖️', duration: '4-5 часов', price: 'Бесплатно', rating: 4.5, interests: ['beach', 'nature'], timeSlot: 'afternoon', address: 'Шамора' },
    { name: 'Владивостокская крепость', category: 'История', description: 'Форты, бастионы и подземные ходы главной крепости Дальнего Востока.', emoji: '🏯', duration: '2-3 часа', price: '250 ₽', rating: 4.6, interests: ['history'], timeSlot: 'afternoon', address: 'Различные форты' },
    { name: 'Ночные бары ул. Адмирала Фокина', category: 'Ночная жизнь', description: 'Главная ночная улица Владивостока с барами, живой музыкой и видом на Амурский залив.', emoji: '🍸', duration: '2-3 часа', price: '1 000–2 000 ₽', rating: 4.4, interests: ['nightlife', 'food'], timeSlot: 'evening', address: 'ул. Адмирала Фокина' },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  иркутск: [
    { name: 'Листвянка и Байкал', category: 'Природа', description: 'Посёлок на берегу Байкала в 70 км — нерпинарий, берег озера, омуль на гриле.', emoji: '🏞️', duration: '5-6 часов', price: '300–500 ₽', rating: 4.9, interests: ['nature', 'hiking'], timeSlot: 'morning', address: 'пос. Листвянка' },
    { name: '130-й квартал', category: 'Архитектура', description: 'Реконструированный исторический квартал с деревянными домами, кафе и сувенирами.', emoji: '🏘️', duration: '2 часа', price: 'Бесплатно', rating: 4.5, interests: ['architecture', 'shopping', 'food'], timeSlot: 'afternoon', address: 'ул. Седова' },
    { name: 'Нерпинарий', category: 'Природа', description: 'Уникальный театр с байкальскими нерпами — самыми редкими пресноводными тюленями.', emoji: '🦭', duration: '1.5 часа', price: '500 ₽', rating: 4.7, interests: ['nature'], timeSlot: 'afternoon', address: 'Листвянка, ул. Горького, 100' },
    { name: 'Кругобайкальская железная дорога', category: 'Экскурсия', description: '«Золотая пряжка» Транссиба — 84 тоннеля, 465 мостов вдоль берега Байкала.', emoji: '🚂', duration: 'Весь день', price: '2 000–3 500 ₽', rating: 4.8, interests: ['history', 'nature'], timeSlot: 'morning', address: 'ст. Слюдянка' },
    { name: 'Иркутский острог (прогулка)', category: 'История', description: 'Исторический центр Иркутска с церквями XVIII-XIX века, бульваром Гагарина.', emoji: '⛪', duration: '2 часа', price: 'Бесплатно', rating: 4.5, interests: ['history', 'architecture'], timeSlot: 'morning', address: 'ул. Карла Маркса' },
    { name: 'Ресторан «Прага»', category: 'Еда', description: 'Знаменитый иркутский ресторан с байкальской кухней — омуль, сагудай, хариус.', emoji: '🐟', duration: '1.5-2 часа', price: '1 200–2 000 ₽', rating: 4.7, interests: ['food'], timeSlot: 'evening', address: 'ул. Пролетарская, 1' },
    { name: 'Байкал — зимний лёд', category: 'Природа', description: 'С января по март — пешие и автомобильные маршруты по льду замёрзшего Байкала.', emoji: '❄️', duration: 'Весь день', price: '1 500–3 000 ₽', rating: 5.0, interests: ['nature', 'hiking', 'sport'], timeSlot: 'morning', address: 'Байкал, порт Байкал' },
    { name: 'Краеведческий музей', category: 'Музей', description: 'История Сибири, экспонаты о буддизме, шаманизме и первых русских поселенцах.', emoji: '🏛️', duration: '2 часа', price: '300 ₽', rating: 4.5, interests: ['museums', 'history'], timeSlot: 'afternoon', address: 'ул. Карла Маркса, 2' },
    { name: 'Закат над Байкалом', category: 'Природа', description: 'Один из самых красивых закатов в мире — небо, горы и гладь Байкала.', emoji: '🌅', duration: '1 час', price: 'Бесплатно', rating: 5.0, interests: ['nature'], timeSlot: 'evening', address: 'Листвянка, мыс Берёзовый' },
    { name: 'Ольхон (поездка)', category: 'Природа', description: 'Остров на Байкале — мыс Бурхан (Шаманка), скалы, степи и шаманская энергетика.', emoji: '🗿', duration: 'Весь день', price: '3 000–5 000 ₽', rating: 4.9, interests: ['nature', 'hiking', 'history'], timeSlot: 'morning', address: 'о. Ольхон' },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  новосибирск: [
    { name: 'Новосибирский Академгородок', category: 'Наука', description: 'Уникальный научный центр в сосновом лесу. Выставки Академпарка и Технопарка.', emoji: '🔬', duration: '3-4 часа', price: 'Бесплатно', rating: 4.5, interests: ['museums', 'history'], timeSlot: 'morning', address: 'Академгородок' },
    { name: 'Новосибирский зоопарк', category: 'Природа', description: 'Один из крупнейших зоопарков мира — 11 000 животных, уникальные арктические виды.', emoji: '🐻', duration: '3-4 часа', price: '450 ₽', rating: 4.7, interests: ['nature'], timeSlot: 'morning', address: 'ул. Тимирязева, 71/1' },
    { name: 'Новосибирский театр оперы и балета', category: 'Культура', description: 'Крупнейшее театральное здание России — «сибирский Колизей».', emoji: '🎭', duration: '3 часа', price: '1 500–4 000 ₽', rating: 4.8, interests: ['art', 'history'], timeSlot: 'evening', address: 'Красный проспект, 36' },
    { name: 'Красный проспект', category: 'Прогулка', description: 'Главная улица Новосибирска с советской и современной архитектурой.', emoji: '🏙️', duration: '1.5 часа', price: 'Бесплатно', rating: 4.4, interests: ['architecture'], timeSlot: 'afternoon', address: 'Красный проспект' },
    { name: 'Берег Оби (площадь Ленина)', category: 'Прогулка', description: 'Набережная реки Обь с видом на ж/д мост и вечернее освещение города.', emoji: '🌊', duration: '1-2 часа', price: 'Бесплатно', rating: 4.4, interests: ['nature'], timeSlot: 'evening', address: 'Набережная Оби' },
    { name: 'Ресторан «Хинкальная»', category: 'Еда', description: 'Лучший грузинский ресторан Новосибирска — хинкали, хачапури, ткемали.', emoji: '🥟', duration: '1.5 часа', price: '800–1 500 ₽', rating: 4.6, interests: ['food'], timeSlot: 'evening', address: 'ул. Ленина, 22' },
    { name: 'Горнолыжный комплекс «Горский»', category: 'Спорт', description: 'Горнолыжный курорт в черте города — 8 трасс разной сложности, ночное катание.', emoji: '⛷️', duration: '4-5 часов', price: '1 500–2 500 ₽', rating: 4.4, interests: ['sport', 'nature'], timeSlot: 'morning', address: 'ул. Горский микрорайон, 1' },
    { name: 'Рынок «Центральный»', category: 'Шопинг', description: 'Главный рынок города — сибирские продукты, кедровые орехи, дикоросы.', emoji: '🛒', duration: '1 час', price: 'Бесплатно', rating: 4.3, interests: ['shopping', 'food'], timeSlot: 'morning', address: 'ул. Нарымская, 17' },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  екатеринбург: [
    { name: 'Граница Европа-Азия', category: 'Достопримечательность', description: 'Стела на горе Берёзовой — встаньте на границе двух континентов. 40 км от центра.', emoji: '🌍', duration: '2 часа', price: 'Бесплатно', rating: 4.6, interests: ['history', 'nature'], timeSlot: 'afternoon', address: '17 км Московского тракта' },
    { name: 'Ельцин Центр', category: 'Музей', description: 'Современный музей президента Ельцина и 1990-х — лучший интерактивный музей России.', emoji: '🏛️', duration: '2-3 часа', price: '700 ₽', rating: 4.8, interests: ['museums', 'history'], timeSlot: 'morning', address: 'ул. Бориса Ельцина, 3' },
    { name: 'Храм на Крови', category: 'История', description: 'Собор на месте расстрела семьи Романовых — значимое место для паломников.', emoji: '⛪', duration: '1 час', price: 'Бесплатно', rating: 4.7, interests: ['history'], timeSlot: 'morning', address: 'ул. Царская, 1' },
    { name: 'Ганина яма', category: 'История', description: 'Монастырь на месте захоронения Романовых в 20 км от Екатеринбурга.', emoji: '🌲', duration: '2-3 часа', price: 'Бесплатно', rating: 4.6, interests: ['history', 'nature'], timeSlot: 'morning', address: 'п. Шувакиш' },
    { name: 'Плотинка (Исторический сквер)', category: 'Прогулка', description: 'Основное место отдыха екатеринбуржцев у старой заводской плотины.', emoji: '🏭', duration: '1-2 часа', price: 'Бесплатно', rating: 4.5, interests: ['history', 'nature'], timeSlot: 'afternoon', address: 'пр. Ленина, 38' },
    { name: 'Невьянская наклонная башня', category: 'История', description: 'Загадочная башня XVIII века с наклоном 1,86° — «уральская Пизанская».', emoji: '🗼', duration: '2 часа', price: '400 ₽', rating: 4.5, interests: ['history', 'architecture'], timeSlot: 'afternoon', address: 'Невьянск, пл. Революции, 2' },
    { name: 'Ресторан «Хмели-Сунели»', category: 'Еда', description: 'Лучшая кавказская кухня Екатеринбурга — шашлык, долма, сулугуни.', emoji: '🍖', duration: '1.5 часа', price: '1 200–2 000 ₽', rating: 4.7, interests: ['food'], timeSlot: 'evening', address: 'ул. Вайнера, 11' },
    { name: 'Уральский геологический музей', category: 'Музей', description: 'Уникальная коллекция минералов Урала — малахит, яшма, изумруды.', emoji: '💎', duration: '1.5 часа', price: '300 ₽', rating: 4.6, interests: ['museums', 'nature'], timeSlot: 'morning', address: 'ул. Куйбышева, 39' },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  'нижний новгород': [
    { name: 'Нижегородский кремль', category: 'История', description: 'Мощная крепость XVI века с 13 башнями на высоком берегу Волги и Оки.', emoji: '🏰', duration: '1.5-2 часа', price: 'Бесплатно / 300 ₽', rating: 4.7, interests: ['history', 'architecture'], timeSlot: 'morning', address: 'Кремль, 1' },
    { name: 'Нижегородская ярмарка', category: 'Шопинг', description: 'Всероссийская ярмарка — историческое здание XIX века, выставки и магазины.', emoji: '🏛️', duration: '1.5 часа', price: 'Бесплатно', rating: 4.5, interests: ['history', 'shopping'], timeSlot: 'morning', address: 'пл. Ярмарочная, 1' },
    { name: 'Чкаловская лестница', category: 'Виды', description: '560 ступеней от речного вокзала до кремля с видом на стрелку Оки и Волги.', emoji: '🌄', duration: '1 час', price: 'Бесплатно', rating: 4.6, interests: ['history', 'nature'], timeSlot: 'afternoon', address: 'Георгиевский съезд' },
    { name: 'Стрелка (слияние Оки и Волги)', category: 'Природа', description: 'Место слияния двух великих рек — открытый стадион и панорамный вид.', emoji: '🌊', duration: '1 час', price: 'Бесплатно', rating: 4.5, interests: ['nature'], timeSlot: 'afternoon', address: 'Стрелка' },
    { name: 'Улица Большая Покровская', category: 'Прогулка', description: 'Пешеходная улица с театрами, музеями и лучшими кафе Нижнего Новгорода.', emoji: '🎭', duration: '1.5 часа', price: 'Бесплатно', rating: 4.6, interests: ['architecture', 'food', 'shopping'], timeSlot: 'afternoon', address: 'ул. Большая Покровская' },
    { name: 'Ресторан «Селёдка и кофе»', category: 'Еда', description: 'Культовый нижегородский ресторан с авторской едой в уютном советском интерьере.', emoji: '🐟', duration: '1.5 часа', price: '1 000–1 800 ₽', rating: 4.8, interests: ['food'], timeSlot: 'evening', address: 'ул. Рождественская, 18' },
    { name: 'Парк «Швейцария»', category: 'Природа', description: 'Лесной парк на высоком берегу Оки с терренкуром и видом на пойму реки.', emoji: '🌳', duration: '2 часа', price: 'Бесплатно', rating: 4.5, interests: ['nature', 'hiking'], timeSlot: 'afternoon', address: 'пр. Гагарина, 74' },
    { name: 'Rooftop-бар Luft', category: 'Ночная жизнь', description: 'Лучший руфтоп Нижнего Новгорода с видом на Волгу и коктейльная карта.', emoji: '🌃', duration: '2-3 часа', price: '1 000–2 000 ₽', rating: 4.6, interests: ['nightlife'], timeSlot: 'evening', address: 'ул. Рождественская, 6А' },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  ярославль: [
    { name: 'Спасо-Преображенский монастырь', category: 'История', description: 'Кремль Ярославля — объект ЮНЕСКО с церквями XII-XVII веков и музеем «Слова о полку Игореве».', emoji: '⛪', duration: '2 часа', price: '200 ₽', rating: 4.8, interests: ['history', 'architecture'], timeSlot: 'morning', address: 'Богоявленская пл., 25' },
    { name: 'Набережная Волги', category: 'Прогулка', description: 'Одна из лучших волжских набережных с беседками, видами и Стрелкой рек.', emoji: '🌊', duration: '1.5 часа', price: 'Бесплатно', rating: 4.7, interests: ['nature', 'architecture'], timeSlot: 'afternoon', address: 'Волжская набережная' },
    { name: 'Церковь Ильи Пророка', category: 'Архитектура', description: 'Жемчужина ярославской архитектуры — уникальные фрески XVII века внутри.', emoji: '🕌', duration: '1 час', price: '150 ₽', rating: 4.7, interests: ['architecture', 'art', 'history'], timeSlot: 'morning', address: 'Советская пл., 7' },
    { name: 'Ярославский зоопарк', category: 'Природа', description: 'Один из крупнейших зоопарков России — редкие животные Поволжья.', emoji: '🦁', duration: '3 часа', price: '350 ₽', rating: 4.5, interests: ['nature'], timeSlot: 'afternoon', address: 'пр. Машиностроителей, 28' },
    { name: 'Музей истории Ярославля', category: 'Музей', description: '1000 лет истории города — основание Ярослава Мудрого, торговля, купечество.', emoji: '🏛️', duration: '1.5 часа', price: '200 ₽', rating: 4.4, interests: ['museums', 'history'], timeSlot: 'morning', address: 'Волжская наб., 17' },
    { name: 'Ресторан «Иоанн Васильевич»', category: 'Еда', description: 'Русская кухня в интерьере эпохи Ивана Грозного — солянка, пожарские котлеты, квас.', emoji: '🍲', duration: '1.5 часа', price: '1 000–2 000 ₽', rating: 4.6, interests: ['food', 'history'], timeSlot: 'evening', address: 'ул. Кирова, 8' },
    { name: 'Ботанический сад', category: 'Природа', description: 'Тихий сад в центре города с оранжереями и старыми деревьями.', emoji: '🌸', duration: '1-2 часа', price: 'Бесплатно', rating: 4.3, interests: ['nature'], timeSlot: 'afternoon', address: 'пр. Октября, 43' },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  самара: [
    { name: 'Набережная Волги', category: 'Прогулка', description: 'Самая длинная набережная в России (5 км) с видами на Волгу и Жигулёвские горы.', emoji: '🌊', duration: '2 часа', price: 'Бесплатно', rating: 4.7, interests: ['nature'], timeSlot: 'afternoon', address: 'Набережная Волги' },
    { name: 'Бункер Сталина', category: 'История', description: 'Самый глубокий (37 м) засекреченный командный бункер времён ВОВ.', emoji: '🪖', duration: '1.5 часа', price: '400 ₽', rating: 4.6, interests: ['history', 'museums'], timeSlot: 'morning', address: 'ул. Фрунзе, 167' },
    { name: 'Жигулёвское пиво — завод', category: 'Еда', description: 'Экскурсия на старейший пивоваренный завод России с дегустацией.', emoji: '🍺', duration: '1.5 часа', price: '500 ₽', rating: 4.5, interests: ['food', 'history'], timeSlot: 'afternoon', address: 'Волжский пр., 4' },
    { name: 'Самарская площадь и Ладья', category: 'Архитектура', description: '«Ладья» — памятник-парусник и лучший вид на Волгу с высокого берега.', emoji: '⛵', duration: '1 час', price: 'Бесплатно', rating: 4.5, interests: ['architecture'], timeSlot: 'afternoon', address: 'Самарская площадь' },
    { name: 'Жигулёвские горы (Тольятти)', category: 'Природа', description: 'Заповедник Самарская Лука — скалы над Волгой, лесные тропы, пещеры.', emoji: '🏔️', duration: '5-6 часов', price: '200 ₽', rating: 4.8, interests: ['nature', 'hiking'], timeSlot: 'morning', address: 'Самарская Лука' },
    { name: 'Улица Ленинградская', category: 'Прогулка', description: 'Пешеходная улица с историческими домами, кафе и уличными музыкантами.', emoji: '🎸', duration: '1.5 часа', price: 'Бесплатно', rating: 4.4, interests: ['architecture', 'food'], timeSlot: 'evening', address: 'ул. Ленинградская' },
    { name: 'Ресторан «Солянка»', category: 'Еда', description: 'Лучший ресторан русской кухни Самары — солянка, пельмени, блины с икрой.', emoji: '🍜', duration: '1.5 часа', price: '1 000–1 800 ₽', rating: 4.7, interests: ['food'], timeSlot: 'evening', address: 'ул. Куйбышева, 110' },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  уфа: [
    { name: 'Памятник Салавату Юлаеву', category: 'Достопримечательность', description: 'Самый крупный конный монумент в России на высоком берегу реки Белой — символ Уфы.', emoji: '🐴', duration: '1 час', price: 'Бесплатно', rating: 4.7, interests: ['history', 'architecture'], timeSlot: 'morning', address: 'Набережная р. Белой' },
    { name: 'Национальный музей РБ', category: 'Музей', description: 'История, природа и культура Башкирии — самое полное собрание о регионе.', emoji: '🏛️', duration: '2 часа', price: '300 ₽', rating: 4.5, interests: ['museums', 'history'], timeSlot: 'morning', address: 'ул. Советская, 14' },
    { name: 'Уфимская мечеть «Ляля-Тюльпан»', category: 'Архитектура', description: 'Белоснежная мечеть с минаретами в форме тюльпана — символ ислама в Башкирии.', emoji: '🕌', duration: '1 час', price: 'Бесплатно', rating: 4.7, interests: ['architecture', 'history'], timeSlot: 'afternoon', address: 'ул. Комсомольская, 163' },
    { name: 'Парк им. Якутова', category: 'Природа', description: 'Центральный парк с Голубым озером — любимое место отдыха уфимцев.', emoji: '🌳', duration: '1.5 часа', price: 'Бесплатно', rating: 4.4, interests: ['nature'], timeSlot: 'afternoon', address: 'ул. Зенцова, 71' },
    { name: 'Башкирский мёд — дегустация', category: 'Еда', description: 'Фирменные магазины башкирского мёда — липовый, лесной, горный. Лучший в мире.', emoji: '🍯', duration: '1 час', price: '500–1 500 ₽', rating: 4.8, interests: ['food', 'shopping'], timeSlot: 'afternoon', address: 'Гостиный двор, ул. Ленина, 28' },
    { name: 'Ресторан «Агидель»', category: 'Еда', description: 'Башкирская национальная кухня — бешбармак, казы, кумыс, беляш.', emoji: '🥩', duration: '1.5 часа', price: '1 000–1 800 ₽', rating: 4.6, interests: ['food'], timeSlot: 'evening', address: 'ул. Ленина, 93' },
    { name: 'Конгресс-холл (смотровая)', category: 'Виды', description: 'Панорама Уфы и рек Белой и Уфы с высокого мыса — лучший вид на «Рим на Белой».', emoji: '🌆', duration: '1 час', price: 'Бесплатно', rating: 4.5, interests: ['architecture'], timeSlot: 'evening', address: 'ул. Заки Валиди, 2' },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  геленджик: [
    { name: 'Набережная Геленджика', category: 'Прогулка', description: 'Самая длинная набережная в России (14 км) вдоль Голубой бухты — пальмы и магазины.', emoji: '🌴', duration: '2-3 часа', price: 'Бесплатно', rating: 4.7, interests: ['beach', 'nature'], timeSlot: 'afternoon', address: 'Набережная им. Ленина' },
    { name: 'Голубая бухта', category: 'Пляж', description: 'Чистейший пляж в закрытой бухте с лазурным морем — лучший в Геленджике.', emoji: '🏖️', duration: '4-5 часов', price: 'Бесплатно', rating: 4.8, interests: ['beach', 'nature'], timeSlot: 'afternoon', address: 'Голубая бухта' },
    { name: 'Канатная дорога «Олимп»', category: 'Природа', description: 'Подъём на 400 м над уровнем моря с видом на всю Геленджикскую бухту.', emoji: '🚡', duration: '2 часа', price: '600 ₽', rating: 4.6, interests: ['nature'], timeSlot: 'morning', address: 'ул. Горная, 1' },
    { name: 'Джип-тур по горам', category: 'Активности', description: 'Экскурсия на внедорожниках — водопады, меловые скалы, смотровые площадки Кавказа.', emoji: '🚙', duration: '5-6 часов', price: '2 500–4 000 ₽', rating: 4.8, interests: ['hiking', 'nature'], timeSlot: 'morning', address: 'Центр Геленджика' },
    { name: 'Дельфинарий', category: 'Природа', description: 'Шоу дельфинов, белуг и морских котиков — популярно у семей с детьми.', emoji: '🐬', duration: '1.5 часа', price: '900 ₽', rating: 4.6, interests: ['nature'], timeSlot: 'afternoon', address: 'Набережная' },
    { name: 'Ресторан «Рыбный двор»', category: 'Еда', description: 'Свежая черноморская рыба и морепродукты прямо у моря — мидии, рапаны, барабулька.', emoji: '🦑', duration: '1.5-2 часа', price: '1 500–2 500 ₽', rating: 4.7, interests: ['food'], timeSlot: 'evening', address: 'Набережная, 26' },
    { name: 'Горный клуб «Форест»', category: 'Ночная жизнь', description: 'Лучший ночной клуб Геленджика под открытым небом с живой музыкой.', emoji: '🎵', duration: '3-4 часа', price: '1 000–2 000 ₽', rating: 4.4, interests: ['nightlife'], timeSlot: 'evening', address: 'ул. Горная, 3' },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  кисловодск: [
    { name: 'Кисловодский национальный парк', category: 'Природа', description: 'Крупнейший лечебный парк России — 1000 га сосен, нарзанные источники, горные тропы.', emoji: '🌿', duration: '3-4 часа', price: 'Бесплатно', rating: 4.9, interests: ['nature', 'hiking', 'wellness'], timeSlot: 'morning', address: 'Курортный бульвар, 1' },
    { name: 'Нарзанная галерея', category: 'Wellness', description: 'Исторический источник нарзана под стеклянным куполом XIX века — попробуй всё виды нарзана.', emoji: '💧', duration: '1 час', price: 'Бесплатно', rating: 4.7, interests: ['wellness', 'history'], timeSlot: 'morning', address: 'ул. Нарзанная, 1' },
    { name: 'Гора Малое Седло', category: 'Природа', description: 'Подъём 1325 м — панорама Кавказского хребта и Эльбруса в ясную погоду.', emoji: '🏔️', duration: '3-4 часа', price: 'Бесплатно', rating: 4.8, interests: ['hiking', 'nature'], timeSlot: 'morning', address: 'Национальный парк' },
    { name: 'Замок «Коварство и любовь»', category: 'Природа', description: 'Живописная скала со смотровой площадкой над пропастью — романтическое место.', emoji: '🏰', duration: '1-2 часа', price: 'Бесплатно', rating: 4.6, interests: ['nature', 'hiking'], timeSlot: 'afternoon', address: 'Долина реки Аликоновки' },
    { name: 'Музей «Дача Шаляпина»', category: 'Музей', description: 'Вилла великого баса в стиле мавританского замка — личные вещи и концертный зал.', emoji: '🎼', duration: '1.5 часа', price: '300 ₽', rating: 4.6, interests: ['museums', 'art', 'history'], timeSlot: 'afternoon', address: 'ул. Шаляпина, 1' },
    { name: 'Ресторан «Кофейня №1»', category: 'Еда', description: 'Лучшее место в Кисловодске — кавказские блюда и торт «Наполеон» по старому рецепту.', emoji: '☕', duration: '1 час', price: '700–1 200 ₽', rating: 4.7, interests: ['food'], timeSlot: 'afternoon', address: 'Курортный бульвар, 10' },
    { name: 'Терренкур маршрут №3', category: 'Wellness', description: '6 км оздоровительного маршрута через парк, долины и горные тропы.', emoji: '🥾', duration: '2-3 часа', price: 'Бесплатно', rating: 4.8, interests: ['wellness', 'hiking', 'nature'], timeSlot: 'afternoon', address: 'Национальный парк' },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  суздаль: [
    { name: 'Суздальский Кремль', category: 'История', description: 'Один из старейших кремлей России (XI в.) с белокаменным Рождественским собором.', emoji: '🏰', duration: '2 часа', price: '400 ₽', rating: 4.9, interests: ['history', 'architecture'], timeSlot: 'morning', address: 'ул. Кремлёвская, 20' },
    { name: 'Спасо-Евфимиев монастырь', category: 'История', description: 'Могучий монастырь-крепость XVI века — звонница, фрески, усыпальница.', emoji: '⛪', duration: '1.5-2 часа', price: '400 ₽', rating: 4.8, interests: ['history', 'architecture'], timeSlot: 'morning', address: 'ул. Ленина, 135' },
    { name: 'Прогулка по Суздалю', category: 'Прогулка', description: '200 церквей в маленьком городке — самая высокая концентрация храмов в России.', emoji: '🚶', duration: '2-3 часа', price: 'Бесплатно', rating: 4.8, interests: ['architecture', 'history'], timeSlot: 'afternoon', address: 'Центр Суздаля' },
    { name: 'Музей деревянного зодчества', category: 'Музей', description: 'Избы, мельницы и церкви XVII-XIX веков под открытым небом. Живая история Руси.', emoji: '🏘️', duration: '1.5-2 часа', price: '350 ₽', rating: 4.7, interests: ['museums', 'history'], timeSlot: 'afternoon', address: 'ул. Пушкарская, 27' },
    { name: 'Суздальская медовуха', category: 'Еда', description: 'Медовуха в старых погребах — несколько видов медовых напитков с дегустацией.', emoji: '🍯', duration: '1 час', price: '400–800 ₽', rating: 4.7, interests: ['food', 'history'], timeSlot: 'afternoon', address: 'Торговые ряды' },
    { name: 'Ресторан «Трапезная»', category: 'Еда', description: 'Монастырская трапезная с ухой, пирогами и блинами на дровяной печи.', emoji: '🥣', duration: '1.5 часа', price: '800–1 500 ₽', rating: 4.7, interests: ['food', 'history'], timeSlot: 'evening', address: 'ул. Кремлёвская, 10' },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  псков: [
    { name: 'Псковский Кремль (Кром)', category: 'История', description: 'Одна из самых мощных средневековых крепостей Европы, XI-XVII веков.', emoji: '🏰', duration: '2 часа', price: 'Бесплатно', rating: 4.8, interests: ['history', 'architecture'], timeSlot: 'morning', address: 'Кремль, 4' },
    { name: 'Изборск и Изборская крепость', category: 'История', description: 'Один из древнейших городов России (862 г.) с крепостью XII века и Словенскими ключами.', emoji: '🛡️', duration: '3-4 часа', price: '200 ₽', rating: 4.7, interests: ['history', 'nature'], timeSlot: 'morning', address: 'пос. Изборск' },
    { name: 'Псково-Печерский монастырь', category: 'История', description: 'Пещерный монастырь XVI века — 500 лет непрерывной монашеской жизни.', emoji: '⛪', duration: '2-3 часа', price: 'Бесплатно', rating: 4.9, interests: ['history', 'architecture'], timeSlot: 'morning', address: 'г. Печоры, ул. Международная, 5' },
    { name: 'Мирожский монастырь', category: 'Архитектура', description: 'XII-вековые фрески Спасо-Преображенского собора — самые сохранившиеся в России.', emoji: '🎨', duration: '1.5 часа', price: '200 ₽', rating: 4.7, interests: ['art', 'history', 'architecture'], timeSlot: 'afternoon', address: 'Мирожская наб., 2' },
    { name: 'Набережная реки Великой', category: 'Прогулка', description: 'Прогулка вдоль реки Великой мимо древних стен и церквей.', emoji: '🌊', duration: '1-2 часа', price: 'Бесплатно', rating: 4.5, interests: ['nature', 'history'], timeSlot: 'afternoon', address: 'Набережная р. Великой' },
    { name: 'Ресторан «Двор Подзноева»', category: 'Еда', description: 'Псковская кухня в отреставрированных палатах купца XVII века — рыба, дичь, травяные настойки.', emoji: '🍖', duration: '1.5-2 часа', price: '1 200–2 500 ₽', rating: 4.8, interests: ['food', 'history'], timeSlot: 'evening', address: 'ул. Некрасова, 10' },
  ],

};

const CITY_CENTERS: Record<string, { lat: number; lng: number }> = {
  москва: { lat: 55.7558, lng: 37.6173 },
  'санкт-петербург': { lat: 59.9311, lng: 30.3609 },
  казань: { lat: 55.7963, lng: 49.1088 },
  сочи: { lat: 43.5992, lng: 39.7257 },
  екатеринбург: { lat: 56.8389, lng: 60.6057 },
  новосибирск: { lat: 54.9885, lng: 82.9207 },
  'нижний новгород': { lat: 56.3269, lng: 44.0059 },
  калининград: { lat: 54.7104, lng: 20.4522 },
  владивосток: { lat: 43.1155, lng: 131.8855 },
  иркутск: { lat: 52.2869, lng: 104.305 },
  красноярск: { lat: 56.0106, lng: 92.8526 },
  тюмень: { lat: 57.1522, lng: 65.5272 },
  томск: { lat: 56.4977, lng: 84.9744 },
  хабаровск: { lat: 48.4802, lng: 135.0719 },
  омск: { lat: 54.9885, lng: 73.3242 },
  пермь: { lat: 58.0105, lng: 56.2502 },
  самара: { lat: 53.1959, lng: 50.1008 },
  уфа: { lat: 54.7388, lng: 55.9721 },
  волгоград: { lat: 48.708, lng: 44.5133 },
  ярославль: { lat: 57.6261, lng: 39.8845 },
  мурманск: { lat: 68.9585, lng: 33.0827 },
  'улан-удэ': { lat: 51.8334, lng: 107.5841 },
  геленджик: { lat: 44.5608, lng: 38.0767 },
  анапа: { lat: 44.895, lng: 37.316 },
  кисловодск: { lat: 43.9052, lng: 42.7168 },
  суздаль: { lat: 56.4197, lng: 40.4495 },
  псков: { lat: 57.8194, lng: 28.3318 },
};

function stableHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function round6(value: number): number {
  return Math.round(value * 1_000_000) / 1_000_000;
}

function fallbackCoords(cityKey: string, placeName: string, index: number): { lat: number; lng: number } {
  const center = CITY_CENTERS[cityKey] ?? CITY_CENTERS.москва;
  const seed = stableHash(`${cityKey}:${placeName}:${index}`);
  const latShift = ((seed % 161) - 80) * 0.0005;
  const lngShift = (((Math.floor(seed / 97) % 161) - 80) * 0.0007);
  return {
    lat: round6(center.lat + latShift),
    lng: round6(center.lng + lngShift),
  };
}

function addCoords(cityKey: string, places: PlaceTemplate[]): PlaceTemplate[] {
  return places.map((place, index) => {
    if (typeof place.lat === 'number' && typeof place.lng === 'number') {
      return place;
    }
    const coords = fallbackCoords(cityKey, place.name, index);
    return {
      ...place,
      lat: coords.lat,
      lng: coords.lng,
    };
  });
}

function addAccessibilityMeta(places: PlaceTemplate[]): PlaceTemplate[] {
  return places.map((place, index) => {
    if (place.accessible) return place;

    const wheelchair = index % 2 === 0 || index % 5 === 0;
    const museumLike = /муз|театр|галер|кремл|двор|собор|истор|центр/i.test(place.category + place.name);
    const natureLike = /парк|тропа|поход|гора|пляж|набереж/i.test(place.category + place.name);

    return {
      ...place,
      accessible: {
        wheelchair,
        audioGuide: museumLike || wheelchair,
        braille: museumLike && index % 3 === 0,
        parkingNearby: !natureLike || index % 4 === 0,
        notes: wheelchair
          ? 'Рекомендуется проверить наличие пандуса на входе.'
          : 'Возможны участки маршрута с неровным покрытием.',
      },
    };
  });
}

export const CITY_PLACES: Record<string, PlaceTemplate[]> = Object.fromEntries(
  Object.entries(RAW_CITY_PLACES).map(([cityKey, places]) => [
    cityKey,
    addAccessibilityMeta(addCoords(cityKey, places)),
  ])
) as Record<string, PlaceTemplate[]>;

/**
 * Возвращает базу мест для города (или null если нет).
 */
export function getCityPlaces(cityKey: string): PlaceTemplate[] | null {
  return CITY_PLACES[cityKey] ?? null;
}

function normalizeCityKey(value: string): string {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ');
}

const CITY_ALIASES: Record<string, string> = {
  спб: 'санкт-петербург',
  'санкт петербург': 'санкт-петербург',
  'нижний новгород': 'нижний новгород',
  'улан удэ': 'улан-удэ',
};

export function getCityPlacesByName(cityName: string): PlaceTemplate[] | null {
  const normalized = normalizeCityKey(cityName);
  const direct = CITY_PLACES[normalized];
  if (direct) return direct;

  const alias = CITY_ALIASES[normalized];
  if (alias && CITY_PLACES[alias]) return CITY_PLACES[alias];

  const fuzzyMatchKey = Object.keys(CITY_PLACES).find((key) => normalizeCityKey(key) === normalized);
  if (fuzzyMatchKey) return CITY_PLACES[fuzzyMatchKey];

  return null;
}

/**
 * Дефолтные места для неизвестных городов.
 */
export const DEFAULT_PLACES: PlaceTemplate[] = [
  { name: 'Центральная площадь', category: 'Достопримечательность', description: 'Главная площадь города с исторической застройкой и памятниками.', emoji: '🏛️', duration: '1.5 часа', price: 'Бесплатно', rating: 4.6, interests: ['history', 'architecture'], timeSlot: 'morning' },
  { name: 'Краеведческий музей', category: 'Музей', description: 'История и природа региона — уникальные экспонаты и выставки.', emoji: '🏺', duration: '1.5 часа', price: '250 ₽', rating: 4.4, interests: ['museums', 'history'], timeSlot: 'morning' },
  { name: 'Городской парк культуры', category: 'Природа', description: 'Прогулка по зелёным аллеям с видовыми площадками.', emoji: '🌳', duration: '2 часа', price: 'Бесплатно', rating: 4.5, interests: ['nature'], timeSlot: 'afternoon' },
  { name: 'Набережная реки', category: 'Прогулка', description: 'Главная прогулочная зона у воды с кафе и видами.', emoji: '🌊', duration: '1.5 часа', price: 'Бесплатно', rating: 4.5, interests: ['nature', 'food'], timeSlot: 'afternoon' },
  { name: 'Пешеходная улица', category: 'Шопинг', description: 'Центральная пешеходная улица с магазинами, кафе и уличными музыкантами.', emoji: '🛍️', duration: '1.5 часа', price: 'Бесплатно', rating: 4.4, interests: ['shopping', 'food', 'architecture'], timeSlot: 'afternoon' },
  { name: 'Соборная церковь', category: 'Архитектура', description: 'Главный храм города — исторический памятник архитектуры.', emoji: '⛪', duration: '1 час', price: 'Бесплатно', rating: 4.5, interests: ['architecture', 'history'], timeSlot: 'morning' },
  { name: 'Ресторан местной кухни', category: 'Еда', description: 'Знакомство с региональной кухней в лучшем ресторане города.', emoji: '🍽️', duration: '1.5 часа', price: '1 000–2 000 ₽', rating: 4.7, interests: ['food'], timeSlot: 'evening' },
  { name: 'Смотровая площадка', category: 'Виды', description: 'Лучшая видовая точка города с панорамой на окрестности.', emoji: '🌄', duration: '1 час', price: 'Бесплатно', rating: 4.6, interests: ['nature', 'architecture'], timeSlot: 'evening' },
  { name: 'Местный рынок', category: 'Шопинг', description: 'Традиционный рынок с региональными продуктами и сувенирами.', emoji: '🛒', duration: '1.5 часа', price: 'Бесплатно', rating: 4.3, interests: ['shopping', 'food'], timeSlot: 'morning' },
  { name: 'Исторический центр', category: 'История', description: 'Прогулка по историческим кварталам с вековой архитектурой.', emoji: '🏘️', duration: '2 часа', price: 'Бесплатно', rating: 4.5, interests: ['history', 'architecture'], timeSlot: 'morning' },
  { name: 'Арт-пространство / галерея', category: 'Культура', description: 'Современное искусство и выставки местных художников.', emoji: '🎨', duration: '1 час', price: '200 ₽', rating: 4.3, interests: ['art'], timeSlot: 'afternoon' },
  { name: 'Вечерний бар', category: 'Ночная жизнь', description: 'Лучший местный бар с живой музыкой и коктейлями.', emoji: '🍸', duration: '2 часа', price: '1 000–1 500 ₽', rating: 4.4, interests: ['nightlife'], timeSlot: 'evening' },
];
