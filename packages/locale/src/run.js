// import * as langs from './locales/index.js'
import * as langs from './langs.js'
import fs from 'fs'
import path from 'path'
import process from 'process'

console.log(Object.keys(langs))

export const translations = {
  af: {
    daily: 'Daagliks',
    no_events: 'Geen gebeure',
    no_title: 'Geen titel'
  },
  am: {
    daily: 'ቀንን በተመለከተ',
    no_events: 'ምንም ክስተቶች የሉም',
    no_title: 'ምንም አርእስቶች የሉም'
  },
  ar: {
    daily: 'يوميا',
    no_events: 'لا توجد أحداث',
    no_title: 'لا يوجد عنوان'
  },
  az: {
    daily: 'Hər gün',
    no_events: 'Heç bir hadisə yoxdur',
    no_title: 'Başlıq yoxdur'
  },
  bg: {
    daily: 'Ежедневно',
    no_events: 'Няма събития',
    no_title: 'Няма заглавие'
  },
  bn: {
    daily: 'প্রতিদিন',
    no_events: 'কোনো ঘটনা নেই',
    no_title: 'কোনো শিরোনাম নেই'
  },
  bs: {
    daily: 'Svaki dan',
    no_events: 'Nema događaja',
    no_title: 'Nema naslova'
  },
  ca: {
    daily: 'Diariament',
    no_events: 'Cap esdeveniment',
    no_title: 'Sense títol'
  },
  cs: {
    daily: 'Denně',
    no_events: 'Žádné události',
    no_title: 'Žádný titul'
  },
  da: {
    daily: 'Dagligt',
    no_events: 'Ingen begivenheder',
    no_title: 'Ingen titel'
  },
  de: {
    daily: 'Täglich',
    no_events: 'Keine Ereignisse',
    no_title: 'Kein Titel'
  },
  el: {
    daily: 'Καθημερινά',
    no_events: 'Δεν υπάρχουν συμβάντα',
    no_title: 'Δεν υπάρχει τίτλος'
  },
  en: {
    daily: 'Daily',
    no_events: 'No events',
    no_title: 'No title'
  },
  es: {
    daily: 'Diario',
    no_events: 'No hay eventos',
    no_title: 'Sin título'
  },
  et: {
    daily: 'Iga päev',
    no_events: 'Sündmusi pole',
    no_title: 'Pealkirja pole'
  },
  eu: {
    daily: 'Eguneroko',
    no_events: 'Ez dago ekitaldirik',
    no_title: 'Ez dago izenbururik'
  },
  fa: {
    daily: 'روزانه',
    no_events: 'هیچ رویدادی نیست',
    no_title: 'هیچ عنوانی نیست'
  },
  fi: {
    daily: 'Päivittäin',
    no_events: 'Ei tapahtumia',
    no_title: 'Ei otsikkoa'
  },
  fr: {
    daily: 'Quotidien',
    no_events: 'Aucun événement',
    no_title: 'Aucun titre'
  },
  ga: {
    daily: 'Gach lá',
    no_events: 'Gan imeachtaí',
    no_title: 'Gan teideal'
  },
  gl: {
    daily: 'Diariamente',
    no_events: 'Non hai eventos',
    no_title: 'Sen título'
  },
  he: {
    daily: 'יומי',
    no_events: 'אין אירועים',
    no_title: 'אין כותרת'
  },
  hi: {
    daily: 'दैनिक',
    no_events: 'कोई घटना नहीं',
    no_title: 'कोई शीर्षक नहीं'
  },
  hr: {
    daily: 'Svaki dan',
    no_events: 'Nema događaja',
    no_title: 'Nema naslova'
  },
  hu: {
    daily: 'Napi',
    no_events: 'Nincsenek események',
    no_title: 'Nincs cím'
  },
  hy: {
    daily: 'Օրական',
    no_events: 'Ոչ մի իրադարձություն',
    no_title: 'Ոչ մի վերնագիր'
  },
  id: {
    daily: 'Setiap hari',
    no_events: 'Tidak ada acara',
    no_title: 'Tanpa judul'
  },
  is: {
    daily: 'Daglega',
    no_events: 'Engin viðburði',
    no_title: 'Enginn titill'
  },
  it: {
    daily: 'Giornaliero',
    no_events: 'Nessun evento',
    no_title: 'Nessun titolo'
  },
  ja: {
    daily: '毎日',
    no_events: 'イベントはありません',
    no_title: 'タイトルなし'
  },
  kk: {
    daily: 'Күнделікті',
    no_events: 'Оқиғалар жоқ',
    no_title: 'Тақырып жоқ'
  },
  km: {
    daily: 'រាល់ថ្ងៃ',
    no_events: 'មិនមានព្រឹត្តិការណ៍',
    no_title: 'គ្មានចំណងជើង'
  },
  kn: {
    daily: 'ದಿನಕ್ಕೆ',
    no_events: 'ಯಾವುದೇ ಘಟನೆಗಳಿಲ್ಲ',
    no_title: 'ಯಾವುದೇ ಶೀರ್ಷಿಕೆಯಿಲ್ಲ'
  },
  ko: {
    daily: '매일',
    no_events: '이벤트 없음',
    no_title: '제목 없음'
  },
  ky: {
    daily: 'Күн бою',
    no_events: 'Берилгендер жок',
    no_title: 'Тақырыпсыз'
  },
  lt: {
    daily: 'Kasdien',
    no_events: 'Nėra renginių',
    no_title: 'Nėra pavadinimo'
  },
  lv: {
    daily: 'Katru dienu',
    no_events: 'Nav notikumu',
    no_title: 'Nav virsraksta'
  },
  mn: {
    daily: 'Өнөөдөр',
    no_events: 'Үзэгдэл алга',
    no_title: 'Гарчиг алга'
  },
  ms: {
    daily: 'Setiap hari',
    no_events: 'Tiada acara',
    no_title: 'Tiada tajuk'
  },
  mt: {
    daily: 'Kull jum',
    no_events: 'Ebda avvenimenti',
    no_title: 'Ebda titlu'
  },
  my: {
    daily: 'နေ့ရက်မှာ',
    no_events: 'ဘာမှမလုပ်ပါနှင့်',
    no_title: 'ခေါင်းစဉ်မရှိပါ'
  },
  nb: {
    daily: 'Daglig',
    no_events: 'Ingen hendelser',
    no_title: 'Ingen tittel'
  },
  ne: {
    daily: 'प्रतिदिन',
    no_events: 'कुनै घटना छैन',
    no_title: 'कुनै शीर्षक छैन'
  },
  nl: {
    daily: 'Dagelijks',
    no_events: 'Geen evenementen',
    no_title: 'Geen titel'
  },
  nn: {
    daily: 'Dagleg',
    no_events: 'Ingen hendingar',
    no_title: 'Ingen tittel'
  },
  pl: {
    daily: 'Codziennie',
    no_events: 'Brak wydarzeń',
    no_title: 'Brak tytułu'
  },
  pt: {
    daily: 'Diário',
    no_events: 'Sem eventos',
    no_title: 'Sem título'
  },
  ro: {
    daily: 'Zilnic',
    no_events: 'Fără evenimente',
    no_title: 'Fără titlu'
  },
  ru: {
    daily: 'Ежедневно',
    no_events: 'Нет событий',
    no_title: 'Нет заголовка'
  },
  si: {
    daily: 'දවසේ',
    no_events: 'සිදුවූ සිදු නැත',
    no_title: 'සිදු වෙන්නේ නැත'
  },
  sk: {
    daily: 'Dennodenne',
    no_events: 'Žiadne udalosti',
    no_title: 'Žiadny názov'
  },
  sl: {
    daily: 'Dnevno',
    no_events: 'Brez dogodkov',
    no_title: 'Brez naslova'
  },
  sq: {
    daily: 'Çdo ditë',
    no_events: 'Asnjë ngjarje',
    no_title: 'Asnjë titull'
  },
  sr: {
    daily: 'Свакодневно',
    no_events: 'Нема догађаја',
    no_title: 'Нема наслова'
  },
  sv: {
    daily: 'Dagligen',
    no_events: 'Inga händelser',
    no_title: 'Ingen titel'
  },
  sw: {
    daily: 'Kila siku',
    no_events: 'Hakuna matukio',
    no_title: 'Hakuna kichwa'
  },
  ta: {
    daily: 'தினசரி',
    no_events: 'நிகழ்வுகள் இல்லை',
    no_title: 'தலைப்பு இல்லை'
  },
  te: {
    daily: 'ప్రతి రోజు',
    no_events: 'ఏమిటి ఈ సందర్భంలో ఏ సందర్భాలు లేవు',
    no_title: 'ఏ శీర్షక లేదు'
  },
  th: {
    daily: 'ทุกวัน',
    no_events: 'ไม่มีเหตุการณ์',
    no_title: 'ไม่มีชื่อเรื่อง'
  },
  tl: {
    daily: 'Araw-araw',
    no_events: 'Walang mga kaganapan',
    no_title: 'Walang pamagat'
  },
  tlh: {
    daily: 'Duj',
    no_events: 'pagh jaj',
    no_title: 'pagh jaj'
  },
  tr: {
    daily: 'Günlük',
    no_events: 'Etkinlik yok',
    no_title: 'Başlık yok'
  },
  uk: {
    daily: 'Щоденно',
    no_events: 'Подій немає',
    no_title: 'Немає заголовка'
  },
  uz: {
    daily: 'Har kuni',
    no_events: "Hech qanday tadbir yo'q",
    no_title: "Sarlavha yo'q"
  },
  uz_latn: {
    daily: 'Har kuni',
    no_events: "Hech qanday tadbir yo'q",
    no_title: "Sarlavha yo'q"
  },
  vi: {
    daily: 'Hàng ngày',
    no_events: 'Không có sự kiện',
    no_title: 'Không có tiêu đề'
  },
  yi: {
    daily: 'טעגלעך',
    no_events: 'קיין אויף ארעיע',
    no_title: 'קיין טיטל'
  },
  zh: {
    daily: '每日',
    no_events: '没有活动',
    no_title: '没有标题'
  }
}

let datttt = ''
Object.keys(langs).forEach((item) => {
  const data = { ...langs[item], ...translations[item] }
  const res = `export const ${item} = ${JSON.stringify(data, null, 2)}`
  fs.writeFileSync(`./locales/${item}.ts`, res, 'utf-8')
  datttt += `export * from './${item}.ts'\n`
})
fs.writeFileSync(`./locales/index.ts`, datttt, 'utf-8')
export function calendarLocale(locale, key) {
  const resolvedlocale = new Intl.Locale(langs[locale] ?? 'en').language
  return langs[resolvedlocale][key]
}
