'use client';

import { useEffect, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, Building2, Check, ChevronLeft, ChevronRight, Clock3,
  FileText, HeartHandshake, Languages, MapPin, MessageCircle, Sparkles, Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type Lang = 'ja' | 'ko' | 'en';
type Program = {
  key: string;
  image: string;
  video?: string;
  poster?: string;
  time?: string;
  price?: string;
  copy: Record<Lang, [string, string, string]>;
};
const languageLabels: Record<Lang, string> = { ja: '日本語', ko: '한국어', en: 'ENGLISH' };
const sectionHeadingClass = 'font-heading text-4xl font-semibold leading-[1.14] tracking-[-0.025em] sm:text-5xl';

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.9"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.1" /><circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" /></svg>;
}

function FacebookIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="currentColor"><path d="M14.1 21v-8h2.8l.4-3.2h-3.2V7.7c0-.9.3-1.6 1.6-1.6h1.7V3.2c-.3 0-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.4v2.4H8V13h2.7v8h3.4Z" /></svg>;
}

const interiorSlides = [
  { src: '/interior/reception.png', alt: 'Healing M&A Spa reception' },
  { src: '/interior/lobby.png', alt: 'Healing M&A Spa lobby' },
  { src: '/interior/foot-spa.png', alt: 'Healing M&A Spa foot spa' },
  { src: '/interior/massage-room.png', alt: 'Healing M&A Spa massage room' },
  { src: '/interior/treatment-room.png', alt: 'Healing M&A Spa treatment room' },
  { src: '/interior/consultation-room.png', alt: 'Healing M&A Spa consultation room' },
];

const programs: Program[] = [
  { key: 'Healing Special', image: '/interior/massage-room.png', video: '/videos/01_healing_special.mp4', poster: '/videos/01_healing_special.jpg', time: '90 / 120', price: '1,500 PHP~', copy: {
    ja: ['ヒーリングスペシャル', 'アロマオイルと温かなオリーブジェイドストーンで、筋肉の緊張をやわらげるプレミアムケア。', '人気'],
    ko: ['힐링 스페셜', '아로마 오일과 따뜻한 올리브 제이드 스톤으로 근육의 긴장을 부드럽게 풀어주는 프리미엄 케어.', '인기'],
    en: ['Healing Special', 'Premium care with aroma oil and warm olive jade stones to release muscle tension.', 'Popular'],
  }},
  { key: 'Aroma Swedish', image: '/images/hero.png', video: '/videos/03_aroma_swedish.mp4', poster: '/videos/03_aroma_swedish.jpg', time: '60 / 90 / 120', price: '1,000 PHP~', copy: {
    ja: ['アロマスウェディッシュ', 'お好みのプレミアムアロマオイルとヒーリング独自の手技で、深いリラックスへ導きます。', '定番'],
    ko: ['아로마 스웨디시', '취향에 맞춘 프리미엄 아로마 오일과 힐링만의 테크닉으로 깊은 휴식을 선사합니다.', '베스트'],
    en: ['Aroma Swedish', 'A personalized massage with your choice of premium aroma oil and Healing’s signature techniques.', 'Essential'],
  }},
  { key: 'Philippine Hilot', image: '/images/hilot.png', video: '/videos/04_philippine_hilot.mp4', poster: '/videos/04_philippine_hilot.jpg', time: '90 / 120', price: '1,500 PHP~', copy: {
    ja: ['フィリピンヒロットマッサージ', '温めたバナナリーフとバージンココナッツオイルを使い、滞りを丁寧に見つけて整えます。', '伝統'],
    ko: ['필리핀 힐롯 마사지', '따뜻한 바나나잎과 버진 코코넛 오일을 사용해 막힌 에너지의 흐름을 세심하게 케어합니다.', '전통'],
    en: ['Philippine Hilot Massage', 'Warm banana leaves and virgin coconut oil support traditional, targeted full-body care.', 'Traditional'],
  }},
  { key: 'Feather Like Shoulder', image: '/images/frozen-back.png', video: '/videos/02_feather_shoulder.mp4', poster: '/videos/02_feather_shoulder.jpg', time: '90', price: '2,000 PHP', copy: {
    ja: ['空飛ぶ肩', '背中・肩・首・頭を集中ケア。ブレンドオイルと遠赤外線温熱で上半身を深くほぐします。', '肩集中ケア'],
    ko: ['하늘나는 어깨', '등·어깨·목·두피를 집중 관리하고 블렌딩 오일과 원적외선 온열로 상체를 깊이 이완합니다.', '어깨 집중'],
    en: ['Feather Like Shoulder', 'Focused back, shoulder, neck, and head care with blended oils and far-infrared warmth.', 'Focused Shoulder'],
  }},
  { key: "Sophia's Signature", image: '/images/royal-aroma-facial.png', video: '/videos/05_sophia_signature.mp4', poster: '/videos/05_sophia_signature.jpg', time: '120', price: '5,800 PHP', copy: {
    ja: ['Sophia’s Signature', 'ベビーフェイスアロマフェイシャルとデコルテ付き全身マッサージを一度に。', 'Signature'],
    ko: ['소피아 시그니처', '베이비 페이스 아로마 페이셜과 데콜테를 포함한 전신 마사지를 한 번에 경험하는 시그니처 코스.', 'Signature'],
    en: ["Sophia’s Signature", 'A signature full-body massage with décolleté and Baby Face aroma facial care.', 'Signature'],
  }},
  { key: 'Where Did My Belly Go', image: '/videos/06_belly_reset.jpg', video: '/videos/06_belly_reset.mp4', poster: '/videos/06_belly_reset.jpg', copy: {
    ja: ['お腹すっきりケア', '深い腹部マッサージで巡りを促し、張りや重さをすっきり整える集中ケア。', '腹部ケア'],
    ko: ['내 뱃살 어디갔소', '깊은 복부 마사지로 순환을 돕고 더부룩함과 묵직함을 편안하게 정돈하는 집중 케어.', '복부 집중'],
    en: ['Where Did My Belly Go?', 'Focused abdominal care designed to support circulation and ease bloating and heaviness.', 'Belly care'],
  }},
  { key: 'Decollete Massage', image: '/videos/07_decollete_massage.jpg', video: '/videos/07_decollete_massage.mp4', poster: '/videos/07_decollete_massage.jpg', copy: {
    ja: ['デコルテマッサージ', '首・肩・鎖骨まわりを丁寧にほぐし、上半身の巡りとフェイスラインを整えるケア。', 'デコルテ'],
    ko: ['데콜테 마사지', '목·어깨·쇄골 주변을 섬세하게 풀어 상체 순환과 페이스라인을 정돈하는 케어.', '데콜테'],
    en: ['Décolleté Massage', 'Focused neck, shoulder, and collarbone care to support upper-body circulation and facial contours.', 'Décolleté'],
  }},
];

const menuGuides = [
  { lang: '한국어', href: '/menus/healing-spa-menu-ko.pdf', code: 'KR' },
  { lang: '日本語', href: '/menus/healing-spa-menu-ja.pdf', code: 'JP' },
  { lang: 'ENGLISH', href: '/menus/healing-spa-menu-en.pdf', code: 'EN' },
];

const instagramReels = [
  'DfUeDRWu6ac',
  'DdjK1e5vNx5',
  'DdLuOxqh7T-',
  'DdIUA9tTxZ4',
  'DcYK6bzhMxx',
  'Db2sfNpBgcv',
];

const reelsCopy = {
  ja: {
    title: 'ヒーリングスパのリール',
    body: '実際の施術やスパの雰囲気を動画でご覧ください。',
    swipe: '横にスワイプしてご覧ください',
    more: 'Instagramでもっと見る',
  },
  ko: {
    title: '힐링스파 릴스',
    body: '실제 관리 모습과 힐링스파의 분위기를 영상으로 확인하세요.',
    swipe: '옆으로 넘겨서 확인하세요',
    more: '인스타그램에서 더 보기',
  },
  en: {
    title: 'Healing Spa Reels',
    body: 'See our real treatments and spa atmosphere in motion.',
    swipe: 'Swipe to explore',
    more: 'See more on Instagram',
  },
};

const promotionCopy = {
  ja: {
    eyebrow: 'MONTHLY HEALING PROMOTION', title: '今月のヒーリングプロモーション',
    body: '専門的な肌分析から始まるRxpertのパーソナライズフェイシャルを、今月限定の特別価格で。',
    original: '通常価格', special: 'プロモーション価格', cta: 'プロモーションを問い合わせる', limited: '今月限定',
  },
  ko: {
    eyebrow: 'MONTHLY HEALING PROMOTION', title: '매달 바뀌는 힐링 프로모션',
    body: '전문 피부 진단부터 시작하는 Rxpert 맞춤 페이셜을 이번 달 특별한 가격으로 경험해 보세요.',
    original: '정상가', special: '프로모션가', cta: '프로모션 문의하기', limited: '이번 달 한정',
  },
  en: {
    eyebrow: 'MONTHLY HEALING PROMOTION', title: 'This Month at Healing Spa',
    body: 'Experience a personalized Rxpert facial that begins with professional skin analysis, now at a special monthly rate.',
    original: 'Regular price', special: 'Promotion price', cta: 'Ask about this promotion', limited: 'This month only',
  },
};

const copy = {
  ja: {
    nav: ['おすすめ', '全メニュー', '当店について', 'アクセス'], reserve: 'ご予約', hero: <>日常に、上質な<br />癒しのルーティンを。</>,
    intro: 'セブで10年以上愛され続ける、韓国人オーナー直営のプレミアムボディ＆エステティックスパです。', benefits: ['熟練セラピスト', '確かな実感', 'リピート率100％'],
    inquiry: '予約お問い合わせ', viewMenu: 'Check Promotion', returnLabel: '10 YEARS IN CEBU', returnBody: '10年以上、繰り返し訪れるお客様に愛されてきた上質なケア。',
    bodyHours: '毎日 10:00–23:00', facialHours: '月曜日～土曜日 9:30–20:00', languageSupport: '日本語・한국어・English', menuTitle: 'ヒーリングスパ代表メニュー', menuIntro: '実際の店頭メニューから、★印の人気プログラムを厳選。目的やコンディションに合うケアを見つけてください。', minute: '分',
    pdfEyebrow: 'FULL MENU & PRICE LIST', pdfTitle: '全メニューを言語別に見る', pdfBody: 'ヒーリングスパの全メニューをご覧ください。', pdfOpen: 'PDFを開く',
    differenceTitle: 'セブでの10年、3度の拡張移転。', differenceBody: '3度の拡張移転を経てOne Paseoへ。韓国人オーナーが直接運営・管理し、K-Beautyフェイシャル、メディカルエステ、ボディ、デコルテから背中までのウェディングラインケアを一つの空間でご提供します。',
    features: [['10 Years in Cebu', 'セブで10年以上、地元のお客様と旅行者に選ばれてきました。'], ['Korean-Owned', '韓国人オーナーが直接運営・管理し、K-Beauty基準の丁寧なケアを提供します。'], ['Three Expansions', '3度の拡張移転を経て、One Paseoのハイエンドスパへ成長しました。'], ['Total Aesthetic Care', 'ボディ、フェイシャル、メディカルエステ、ウェディングラインを一か所で。']],
    bookingTitle: 'ご予約リクエスト', bookingBody: 'ご希望の内容をお送りください。空き状況を確認後、スタッフからご連絡し、予約確定となります。',
    steps: [['01', 'フォームを送信', 'ご希望の日時とメニューをご入力ください。'], ['02', 'スタッフが確認', '施術中はご返信が遅れる場合がございます。'], ['03', 'ご連絡後に確定', 'スタッフからの確認連絡をもって予約確定です。']],
    sameDay: '当日のご予約も可能です', change: '変更は12時間前までにご連絡ください', locationTitle: 'One Paseoでお待ちしています', map: 'Googleマップを開く', daysBody: '月曜日～日曜日', daysFacial: '月曜日～土曜日', support: '日本語・한국어・English 対応',
  },
  ko: {
    nav: ['대표 메뉴', '전체 메뉴', '힐링스파 소개', '오시는 길'], reserve: '예약하기', hero: <>일상에 더하는<br />품격 있는 휴식.</>,
    intro: '세부에서 10년 이상 사랑받아온, 한국인 오너 직영 프리미엄 바디 & 에스테틱 스파입니다.', benefits: ['숙련된 테라피스트', '확실한 결과', '재방문 100%'],
    inquiry: '예약 문의', viewMenu: 'Check Promotion', returnLabel: '세부에서 10년', returnBody: '10년 넘게 재방문 고객에게 꾸준히 사랑받아온 품격 있는 케어.',
    bodyHours: '매일 10:00–23:00', facialHours: '월요일–토요일 09:30–20:00', languageSupport: '한국어・日本語・English', menuTitle: '힐링스파 대표 메뉴', menuIntro: '실제 매장 메뉴판의 ★ 인기 프로그램을 엄선했습니다. 오늘의 컨디션과 원하는 케어에 맞춰 선택해 보세요.', minute: '분',
    pdfEyebrow: 'FULL MENU & PRICE LIST', pdfTitle: '언어별 전체 메뉴판', pdfBody: '힐링스파의 전체 메뉴를 확인하세요.', pdfOpen: 'PDF 열기',
    differenceTitle: '세부에서의 10년, 세 번의 확장 이전.', differenceBody: '세 번의 확장 이전을 거쳐 One Paseo에 자리한 하이엔드 스파입니다. 한국인 오너가 직접 운영·관리하며 K-Beauty 페이셜, 메디컬 에스테틱, 바디, 쇄골부터 등까지의 웨딩라인 케어를 한 공간에서 제공합니다.',
    features: [['세부에서 10년', '10년 이상 현지 고객과 여행객에게 꾸준히 사랑받아왔습니다.'], ['한국인 오너 직영', '한국인 오너가 직접 운영·관리하며 K-Beauty 기준의 섬세한 케어를 제공합니다.'], ['세 번의 확장 이전', '세 번의 확장 이전을 거쳐 One Paseo의 하이엔드 스파로 성장했습니다.'], ['토탈 에스테틱 케어', '바디·페이셜·메디컬 에스테틱·웨딩라인 케어를 한 공간에서 제공합니다.']],
    bookingTitle: '예약 신청', bookingBody: '원하시는 내용을 보내주세요. 예약 가능 여부를 확인한 후 직원이 연락드리며, 확인 연락 후 예약이 확정됩니다.',
    steps: [['01', '예약폼 작성', '희망 날짜와 시간, 프로그램을 입력해 주세요.'], ['02', '직원 확인', '관리 중에는 답변이 조금 늦어질 수 있습니다.'], ['03', '연락 후 확정', '직원의 확인 연락을 받으면 예약이 확정됩니다.']],
    sameDay: '당일 예약도 가능합니다', change: '예약 변경은 최소 12시간 전에 알려주세요', locationTitle: 'One Paseo에서 만나요', map: '구글맵 열기', daysBody: '월요일–일요일', daysFacial: '월요일–토요일', support: '한국어・日本語・English 상담 가능',
  },
  en: {
    nav: ['Highlights', 'Full menu', 'About', 'Location'], reserve: 'Book now', hero: <>Make premium care<br />part of your routine.</>,
    intro: 'A Korean-owned premium body and aesthetic spa trusted in Cebu for more than 10 years.', benefits: ['Skilled therapists', 'Visible results', '100% return rate'],
    inquiry: 'Booking inquiry', viewMenu: 'Check Promotion', returnLabel: '10 YEARS IN CEBU', returnBody: 'Premium care loved by returning guests for more than a decade.',
    bodyHours: 'Daily 10:00–23:00', facialHours: 'Monday–Saturday 09:30–20:00', languageSupport: 'English・日本語・한국어', menuTitle: 'Healing Spa Signature Menu', menuIntro: 'A curated selection of the ★ guest favorites from our current in-spa menu, with real local pricing.', minute: 'min',
    pdfEyebrow: 'FULL MENU & PRICE LIST', pdfTitle: 'Explore the complete menu', pdfBody: 'Explore the complete Healing Spa menu.', pdfOpen: 'Open PDF',
    differenceTitle: 'Ten years in Cebu, three expansions.', differenceBody: 'After three expansions, Healing M&A Spa now welcomes guests at One Paseo. Korean-owned and personally managed, we bring K-Beauty facial care, medical aesthetics, body therapy, and complete wedding-line care—from décolletage to back—together in one refined space.',
    features: [['10 Years in Cebu', 'Trusted by local and international guests for more than a decade.'], ['Korean-Owned', 'Personally managed by our Korean owner with attentive K-Beauty standards.'], ['Three Expansions', 'Three expansions led us to our high-end One Paseo location.'], ['Total Aesthetic Care', 'Body, facial, medical aesthetic, and wedding-line care in one place.']],
    bookingTitle: 'Reservation Request', bookingBody: 'Tell us your preferred date, time, and treatment. Our team will check availability and contact you to confirm your booking.',
    steps: [['01', 'Send the form', 'Enter your preferred schedule and program.'], ['02', 'We check availability', 'Replies may take a little longer while treatments are in progress.'], ['03', 'Booking confirmation', 'Your booking is confirmed after our team contacts you.']],
    sameDay: 'Same-day reservations are available', change: 'Please request changes at least 12 hours in advance', locationTitle: 'Visit us at One Paseo', map: 'Open Google Maps', daysBody: 'Monday–Sunday', daysFacial: 'Monday–Saturday', support: 'English・日本語・한국어 support',
  },
};

const featureIcons = [Clock3, HeartHandshake, Building2, Sparkles];

const reviews = [
  {
    name: 'Ha Seong-eon',
    treatment: { ja: '韓国人旅行者 · ボディケア', ko: '한국인 여행객 · 바디 케어', en: 'Korean guest · Body care' },
    text: {
      ja: '宿泊先の近くで気軽に訪れましたが、期待以上に満足。旅行中にまた訪れたいと思えるスパでした。',
      ko: '숙소 근처라 가볍게 방문했는데 기대 이상으로 만족해 여행 중 다시 찾고 싶은 스파였어요.',
      en: 'I stopped by because it was near my hotel and left more than satisfied—it became a spa I wanted to revisit during the trip.',
    },
  },
  {
    name: 'Kim Jin-a',
    treatment: { ja: 'リピーター · マッサージ', ko: '재방문 고객 · 마사지', en: 'Returning guest · Massage' },
    text: {
      ja: '訪れるたびに安定したクオリティと親切で迅速な予約対応。安心して何度も通えるスパです。',
      ko: '방문할 때마다 일정한 퀄리티와 친절하고 빠른 예약 응대가 유지되어 믿고 찾게 됩니다.',
      en: 'The quality stays consistent on every visit, and the booking response is always quick and kind. It is a spa I trust.',
    },
  },
  {
    name: 'Kang Se-won',
    treatment: { ja: '韓国人旅行者 · 全身ケア', ko: '한국인 여행객 · 전신 케어', en: 'Korean guest · Full-body care' },
    text: {
      ja: '韓国人オーナーによる定期教育が伝わる専門的な施術と清潔な施設。セブ再訪時にも利用したいです。',
      ko: '한국인 원장님의 정기 교육이 느껴질 만큼 관리가 전문적이고 시설도 깨끗해 세부에 오면 다시 방문하고 싶어요.',
      en: 'The treatment felt professional, reflecting regular staff training by the Korean owner, and the facilities were very clean.',
    },
  },
];

const extraCopy = {
  ja: {
    reviewsEyebrow: 'GOOGLE REVIEWS', reviewsTitle: 'お客様から届いた信頼の声', reviewsBody: 'Google評価 4.8 · 214件の口コミ', reviewNote: 'Google口コミの要約', reviewLink: 'Google口コミを見る',
    contactTitle: 'ご希望の方法ですぐにお問い合わせ', kakao: 'KakaoTalk', instagram: 'Instagram', facebook: 'Facebook Messenger',
    faqTitle: 'よくあるご質問', faqBody: 'ご予約前によくいただくご質問をまとめました。',
    faqs: [
      ['当日予約はできますか？', 'はい、空き状況により当日予約も可能です。ご希望の連絡方法からメッセージでお問い合わせください。'],
      ['荷物を預けられますか？', 'はい、ご利用当日はお荷物をお預かりできます。大きなお荷物は事前にお知らせください。'],
      ['支払い方法は？', '現金・GCash・クレジットカードをご利用いただけます。'],
      ['妊娠中でも受けられますか？', '専用のマタニティメニューがございます。安全確認のため週数と体調を事前にお知らせください。'],
      ['男性も利用できますか？', 'はい。男性向けボディ・フェイシャルメニューもご用意しています。'],
      ['変更・キャンセル規定は？', '変更は12時間前までにご連絡ください。キャンセルについては予約確認時にご案内します。'],
      ['カップルやグループも可能ですか？', 'はい。人数と希望時間をお知らせいただければ、同時施術の可否を確認します。'],
      ['日本語・韓国語で相談できますか？', 'はい。日本語・韓国語・英語でのご相談に対応しています。'],
    ],
    grab: 'Grabでは「Healing M&A Spa」と検索してください。', parking: 'One Paseo Ground Floor Unit OP-110。駐車案内が必要な場合は事前にお問い合わせください。',
    privacyTitle: '個人情報の取り扱い', privacyBody: 'お問い合わせ時にお知らせいただいた情報は、空き状況の確認・予約連絡・サービス提供のためにのみ利用します。必要なスタッフおよびお客様が選択した連絡手段以外には共有しません。', fixedBook: 'ご予約',
  },
  ko: {
    reviewsEyebrow: 'GOOGLE REVIEWS', reviewsTitle: '고객이 직접 남긴 신뢰의 후기', reviewsBody: 'Google 평점 4.8 · 리뷰 214개', reviewNote: 'Google 후기 요약', reviewLink: 'Google 리뷰 보기',
    contactTitle: '원하는 채널로 바로 문의하세요', kakao: '카카오톡', instagram: '인스타그램', facebook: '페이스북 메신저',
    faqTitle: '자주 묻는 질문', faqBody: '예약 전에 많이 궁금해하시는 내용을 정리했습니다.',
    faqs: [
      ['당일 예약이 가능한가요?', '네, 빈 시간에 따라 당일 예약도 가능합니다. 원하시는 연락 채널에서 메시지로 문의해 주세요.'],
      ['짐 보관이 가능한가요?', '네, 이용 당일 짐 보관이 가능합니다. 큰 짐은 예약 시 미리 알려주세요.'],
      ['결제 방법은 무엇인가요?', '현금, GCash, 신용카드 결제가 가능합니다.'],
      ['임산부도 관리받을 수 있나요?', '임산부 전용 프로그램이 있습니다. 안전을 위해 임신 주수와 컨디션을 예약 전에 알려주세요.'],
      ['남성 고객도 이용할 수 있나요?', '네, 남성 고객을 위한 바디 및 페이셜 프로그램도 준비되어 있습니다.'],
      ['예약 변경 및 취소 규정은 어떻게 되나요?', '변경은 최소 12시간 전에 알려주세요. 취소 규정은 예약 확인 시 안내드립니다.'],
      ['커플 또는 단체 관리가 가능한가요?', '네, 인원과 희망 시간을 알려주시면 동시 관리 가능 여부를 확인해 드립니다.'],
      ['한국어·일본어 상담이 가능한가요?', '네, 한국어·일본어·영어 상담이 가능합니다.'],
    ],
    grab: 'Grab에서 “Healing M&A Spa”를 검색해 주세요.', parking: 'One Paseo Ground Floor Unit OP-110입니다. 주차 안내가 필요하면 방문 전 문의해 주세요.',
    privacyTitle: '개인정보 처리 안내', privacyBody: '문의 시 전달하신 정보는 예약 가능 여부 확인, 예약 연락 및 서비스 제공을 위해서만 사용합니다. 예약을 담당하는 직원과 고객이 선택한 연락 채널 외에는 공유하지 않습니다.', fixedBook: '예약하기',
  },
  en: {
    reviewsEyebrow: 'GOOGLE REVIEWS', reviewsTitle: 'Trusted by our guests', reviewsBody: '4.8 on Google · 214 reviews', reviewNote: 'Summarized from a Google review', reviewLink: 'View Google reviews',
    contactTitle: 'Contact us on your preferred channel', kakao: 'KakaoTalk', instagram: 'Instagram', facebook: 'Facebook Messenger',
    faqTitle: 'Frequently asked questions', faqBody: 'Helpful details before you make your reservation.',
    faqs: [
      ['Can I book on the same day?', 'Yes. Same-day bookings are available depending on open time slots. Please message us through your preferred channel.'],
      ['Can you store my luggage?', 'Yes, luggage storage is available on the day of your treatment. Please tell us in advance about large items.'],
      ['What payment methods do you accept?', 'We accept cash, GCash, and credit cards.'],
      ['Can pregnant guests receive treatment?', 'A dedicated maternity program is available. Please share your pregnancy stage and condition before booking.'],
      ['Do you accept male guests?', 'Yes. We offer both body and facial programs for male guests.'],
      ['What is the change and cancellation policy?', 'Please request changes at least 12 hours in advance. Cancellation details are shared during confirmation.'],
      ['Can couples or groups book together?', 'Yes. Tell us your group size and preferred time, and we will check simultaneous availability.'],
      ['Is Korean or Japanese consultation available?', 'Yes. Consultation is available in English, Korean, and Japanese.'],
    ],
    grab: 'Search “Healing M&A Spa” in Grab.', parking: 'Find us at One Paseo, Ground Floor Unit OP-110. Contact us before arrival if you need parking guidance.',
    privacyTitle: 'Privacy notice', privacyBody: 'Information shared when contacting us is used only to check availability, contact you about your reservation, and provide the requested service. It is not shared beyond the staff and contact channel needed to handle your booking.', fixedBook: 'Book now',
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>('ja');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const t = copy[lang];
  const x = extraCopy[lang];

  useEffect(() => {
    const saved = window.localStorage.getItem('healing-spa-language') as Lang | null;
    if (saved && saved in copy) setLang(saved);
    else {
      const browserLanguage = navigator.language.toLowerCase();
      if (browserLanguage.startsWith('ko')) setLang('ko');
      else if (browserLanguage.startsWith('en')) setLang('en');
    }
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentSlide(current => (current + 1) % interiorSlides.length), 4500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setReviewIndex(current => (current + 1) % reviews.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  function changeLanguage(next: Lang) {
    setLang(next);
    window.localStorage.setItem('healing-spa-language', next);
    document.documentElement.lang = next;
  }

  return <main className="min-h-screen overflow-hidden bg-background text-foreground">
    <header className="absolute inset-x-0 top-0 z-30 border-b border-white/15 text-white"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 lg:px-10">
      <a href="#top" className="shrink-0" aria-label="Healing M&A Spa home">
        <img
          src="/healing-ma-spa-logo.png"
          alt="Healing M&A Spa Medical Aesthetic"
          className="h-12 w-auto object-contain sm:h-14"
        />
      </a>
      <nav className="hidden items-center gap-6 text-sm text-white/78 lg:flex" aria-label="Main navigation"><a href="#programs">{t.nav[0]}</a><a href="#full-menu">{t.nav[1]}</a><a href="#about">{t.nav[2]}</a><a href="#access">{t.nav[3]}</a></nav>
      <div className="flex items-center gap-2"><div className="flex rounded-full border border-white/25 bg-black/10 p-1 backdrop-blur" aria-label="Language selection">{(Object.keys(languageLabels) as Lang[]).map(option => <button key={option} type="button" aria-pressed={lang === option} onClick={() => changeLanguage(option)} className={`rounded-full px-2.5 py-1.5 text-[10px] font-semibold transition sm:px-3 ${lang === option ? 'bg-white text-[#2b2520]' : 'text-white/70 hover:text-white'}`}>{languageLabels[option]}</button>)}</div><a href="#contact" className="hidden items-center rounded-full border border-white/35 px-4 py-2 text-sm font-medium hover:bg-white hover:text-[#2d2925] sm:inline-flex">{t.reserve}<ArrowRight className="ml-2 size-4" /></a></div>
    </div></header>

    <section id="top" className="relative min-h-[820px] bg-[#2b2520] text-white">
      <div className="absolute inset-0 overflow-hidden"><div className="flex h-full transition-transform duration-[1200ms] ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>{interiorSlides.map((slide, index) => <img key={slide.src} src={slide.src} alt={slide.alt} loading={index === 0 ? 'eager' : 'lazy'} className="h-full w-full shrink-0 object-cover object-center opacity-65" />)}</div><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,25,21,.94)_0%,rgba(31,25,21,.72)_46%,rgba(31,25,21,.16)_100%)]" /><div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,#2b2520_0%,transparent_100%)]" /></div>
      <div className="relative mx-auto grid min-h-[820px] max-w-7xl items-center gap-12 px-5 pb-20 pt-32 lg:grid-cols-[1.08fr_.92fr] lg:px-10"><div className="max-w-2xl"><p className="mb-5 text-[11px] font-semibold tracking-[0.28em] text-[#e2c38d] sm:text-xs">PREMIUM BODY &amp; AESTHETIC SPA · CEBU</p><h1 className="font-heading text-[clamp(2.8rem,7vw,5.4rem)] font-semibold leading-[1.06] tracking-[-0.045em]">{t.hero}</h1><p className="mt-7 max-w-xl text-base leading-8 text-white/78 sm:text-lg">{t.intro}</p><div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/84">{t.benefits.map(item => <span key={item} className="flex items-center gap-2"><Check className="size-4 text-[#e2c38d]" />{item}</span>)}</div><div className="mt-10 flex flex-col gap-3 sm:flex-row"><Button render={<a href="#contact" />} className="h-12 rounded-full bg-[#e2c38d] px-7 text-[#2b2520] hover:bg-[#f0d5a5]">{t.inquiry}<ArrowRight className="ml-2 size-4" /></Button><Button render={<a href="#promotion" />} variant="outline" className="h-12 rounded-full border-white/35 bg-transparent px-7 text-white hover:bg-white hover:text-[#2b2520]">{t.viewMenu}</Button></div></div>
        </div>
      <div className="absolute inset-x-0 bottom-7 z-10 flex justify-center gap-2" aria-label="Interior photo selection">{interiorSlides.map((slide, index) => <button key={slide.src} type="button" onClick={() => setCurrentSlide(index)} aria-label={`Show interior photo ${index + 1}`} aria-current={index === currentSlide} className={`h-1.5 rounded-full transition-all ${index === currentSlide ? 'w-8 bg-[#e2c38d]' : 'w-3 bg-white/45 hover:bg-white/75'}`} />)}</div>
    </section>

    <section className="bg-[#2b2520] pb-10 text-white"><div className="mx-auto grid max-w-7xl divide-y divide-white/12 border-y border-white/12 px-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:px-10"><div className="flex items-center gap-4 py-6 sm:px-5"><Clock3 className="size-5 shrink-0 text-[#e2c38d]" /><div><p className="text-xs text-white/50">BODY MASSAGE</p><p className="mt-1 text-sm">{t.bodyHours}</p></div></div><div className="flex items-center gap-4 py-6 sm:px-5"><Sparkles className="size-5 shrink-0 text-[#e2c38d]" /><div><p className="text-xs text-white/50">SOPHIA FACIAL</p><p className="mt-1 text-sm">{t.facialHours}</p></div></div><div className="flex items-center gap-4 py-6 sm:px-5"><MapPin className="size-5 shrink-0 text-[#e2c38d]" /><div><p className="text-xs text-white/50">LOCATION</p><p className="mt-1 text-sm">One Paseo, Cebu City</p></div></div><div className="flex items-center gap-4 py-6 sm:px-5"><Languages className="size-5 shrink-0 text-[#e2c38d]" /><div><p className="text-xs text-white/50">LANGUAGE</p><p className="mt-1 text-sm">{t.languageSupport}</p></div></div></div></section>

    <section id="programs" className="scroll-mt-20 px-5 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-7 border-b border-[#d8cdbd] pb-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div><p className="text-xs font-semibold tracking-[0.22em] text-[#9a7446]">SIGNATURE PROGRAMS</p><h2 className={`mt-4 ${sectionHeadingClass}`}>{t.menuTitle}</h2></div>
          <p className="max-w-2xl text-sm leading-7 text-[#746c63] lg:justify-self-end">{t.menuIntro}</p>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {programs.map((program, index) => {
            const [name, description, tag] = program.copy[lang];
            const programImage = <div className="mt-auto pt-5"><div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-[#ded5c8]">{program.video ? <video src={program.video} poster={program.poster ?? undefined} aria-label={`${name} treatment preview`} autoPlay muted loop playsInline preload="metadata" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" /> : <img src={program.image} alt={name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />}<span className="absolute left-4 top-4 rounded-full bg-[#f7f2e9]/92 px-3 py-1 text-[11px] font-semibold text-[#5c4932]">★ {tag}</span></div></div>;
            const programDetails = <><p className="text-[11px] tracking-[0.18em] text-[#9a7446]">0{index + 1}</p><div className="mt-2 flex items-start justify-between gap-4"><h3 className="font-heading text-2xl font-semibold leading-tight tracking-[-0.015em]">{name}</h3>{program.price && program.time ? <p className="shrink-0 text-right text-sm font-semibold">{program.price}<span className="mt-1 block text-xs font-normal text-[#7a7169]">{program.time}{t.minute}</span></p> : null}</div><p className="mt-4 border-t border-[#ddd3c4] pt-4 text-sm leading-7 text-[#756d65]">{description}</p></>;
            return <article key={program.key} className="group flex h-full flex-col">{programDetails}{programImage}</article>;
          })}
        </div>
      </div>
    </section>

    <section className="bg-[#efe6d9] px-5 py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 border-b border-[#cfc1ae] pb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#9a7446]">INSTAGRAM REELS</p>
            <h2 className={`mt-4 ${sectionHeadingClass}`}>{reelsCopy[lang].title}</h2>
            <p className="mt-4 text-sm leading-7 text-[#746c63]">{reelsCopy[lang].body}</p>
          </div>
          <a href="https://www.instagram.com/healing.spa_ph/reels/" target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-medium text-[#7e5d37]">
            <InstagramIcon /><span className="ml-2">{reelsCopy[lang].more}</span><ArrowUpRight className="ml-2 size-4" />
          </a>
        </div>
        <p className="mt-5 text-xs text-[#8b8177] md:hidden">{reelsCopy[lang].swipe} →</p>
        <div className="mt-7 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:overflow-visible md:pb-0 xl:grid-cols-3">
          {instagramReels.map((reel, index) => (
            <article key={reel} className="w-[82vw] max-w-[390px] shrink-0 snap-center overflow-hidden rounded-[24px] border border-[#d6c9b8] bg-white shadow-[0_18px_50px_rgba(66,50,34,.08)] md:w-auto md:max-w-none">
              <div className="aspect-[9/16] bg-[#211d19]">
                <iframe
                  src={`https://www.instagram.com/reel/${reel}/embed/`}
                  title={`Healing M&A Spa Instagram Reel ${index + 1}`}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section id="promotion" className="scroll-mt-20 overflow-hidden bg-[#2f3d32] px-5 py-24 text-white lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
        <div className="relative mx-auto w-full max-w-[470px] overflow-hidden rounded-[30px] border border-white/15 bg-[#211d19] shadow-[0_24px_70px_rgba(0,0,0,.22)]">
          <video src="/videos/promo_rx_baby_facial.mp4" poster="/videos/promo_rx_baby_facial.jpg" aria-label="Rx Baby Facial promotion preview" autoPlay muted loop playsInline preload="metadata" className="aspect-[4/5] h-full w-full object-cover" />
          <span className="absolute left-5 top-5 rounded-full border border-[#f0d5a5]/55 bg-[#2b2520]/80 px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-[#f0d5a5] backdrop-blur-sm">{promotionCopy[lang].limited}</span>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-[#d9b77c]">{promotionCopy[lang].eyebrow}</p>
          <h2 className={`mt-4 max-w-3xl ${sectionHeadingClass}`}>{promotionCopy[lang].title}</h2>
          <p className="mt-7 font-heading text-3xl font-semibold tracking-[-0.02em] text-[#f3dfbd] sm:text-4xl">Rx Baby Facial</p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/68">{promotionCopy[lang].body}</p>
          <div className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-4 border-y border-white/15 py-6">
            <div><p className="text-[11px] tracking-[0.14em] text-white/42">{promotionCopy[lang].original}</p><p className="mt-2 text-xl text-white/45 line-through decoration-[#d9b77c]">6,000 PHP</p></div>
            <div><p className="text-[11px] tracking-[0.14em] text-[#e5c896]">{promotionCopy[lang].special}</p><p className="mt-1 font-heading text-4xl font-semibold tracking-[-0.03em] text-white">4,800 PHP</p></div>
          </div>
          <Button render={<a href="#contact" />} className="mt-8 h-12 rounded-full bg-[#d9b77c] px-7 text-[#263229] hover:bg-[#ecd2a5]">{promotionCopy[lang].cta}<ArrowRight className="ml-2 size-4" /></Button>
        </div>
      </div>
    </section>

    <section id="full-menu" className="scroll-mt-20 bg-[#2f3d32] px-5 py-24 text-white lg:px-10 lg:py-28"><div className="mx-auto max-w-7xl"><div className="grid gap-6 border-b border-white/15 pb-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><p className="text-xs font-semibold tracking-[0.22em] text-[#d9b77c]">{t.pdfEyebrow}</p><h2 className={`mt-4 ${sectionHeadingClass}`}>{t.pdfTitle}</h2></div><p className="max-w-xl text-sm leading-7 text-white/65 lg:justify-self-end">{t.pdfBody}</p></div><div className="mt-8 grid gap-4 md:grid-cols-3">{menuGuides.map(menu => <a key={menu.code} href={menu.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-2xl border border-white/15 bg-white/[.045] p-6 transition hover:border-[#d9b77c]/70 hover:bg-white/[.08]"><span className="flex items-center gap-4"><span className="grid size-11 place-items-center rounded-full bg-[#d9b77c]/15 text-[#e5c896]"><FileText className="size-5" /></span><span><span className="block text-xs tracking-[0.16em] text-white/45">{menu.code} MENU</span><span className="mt-1 block font-heading text-xl">{menu.lang}</span></span></span><span className="flex items-center text-xs text-[#e5c896]">{t.pdfOpen}<ArrowUpRight className="ml-2 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span></a>)}</div></div></section>

    <section id="about" className="scroll-mt-20 bg-[#e9dfd0] px-5 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-7xl"><div className="max-w-4xl"><p className="text-xs font-semibold tracking-[0.22em] text-[#8f683e]">THE HEALING DIFFERENCE</p><h2 className={`mt-4 ${sectionHeadingClass}`}>{t.differenceTitle}</h2><p className="mt-5 text-base leading-8 text-[#6e655c]">{t.differenceBody}</p></div><div className="mt-14 grid border-y border-[#cbbda9] md:grid-cols-2 xl:grid-cols-4 xl:divide-x xl:divide-[#cbbda9]">{t.features.map(([title, body], index) => { const Icon = featureIcons[index]; return <div key={title} className="border-b border-[#cbbda9] px-0 py-9 md:px-8 xl:border-b-0"><Icon className="size-6 text-[#8f683e]" /><h3 className="mt-6 font-heading text-2xl font-semibold leading-tight tracking-[-0.015em]">{title}</h3><p className="mt-4 text-sm leading-7 text-[#6e655c]">{body}</p></div>; })}</div></div></section>

    <section className="bg-[#fffdf9] px-5 py-24 lg:px-10 lg:py-28"><div className="mx-auto max-w-7xl"><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="text-xs font-semibold tracking-[0.22em] text-[#9a7446]">{x.reviewsEyebrow}</p><h2 className={`mt-4 ${sectionHeadingClass}`}>{x.reviewsTitle}</h2><p className="mt-4 text-sm text-[#746c63]">{x.reviewsBody}</p></div><div className="flex items-center gap-2 lg:justify-end"><button type="button" onClick={() => setReviewIndex(index => (index - 1 + reviews.length) % reviews.length)} aria-label="Previous review" className="grid size-11 place-items-center rounded-full border border-[#d8cdbd] hover:bg-[#f2eadf]"><ChevronLeft className="size-5" /></button><button type="button" onClick={() => setReviewIndex(index => (index + 1) % reviews.length)} aria-label="Next review" className="grid size-11 place-items-center rounded-full border border-[#d8cdbd] hover:bg-[#f2eadf]"><ChevronRight className="size-5" /></button></div></div><div className="mt-10 overflow-hidden rounded-[28px] border border-[#ded4c5] bg-[#f7f2e9]"><div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${reviewIndex * 100}%)` }}>{reviews.map(review => <article key={review.name} className="w-full shrink-0 p-7 sm:p-11" aria-hidden={reviews[reviewIndex].name !== review.name}><div className="flex gap-1 text-[#c89339]">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-5 fill-current" />)}</div><p className="mt-7 max-w-3xl font-heading text-2xl font-semibold leading-relaxed tracking-[-0.015em] sm:text-3xl">“{review.text[lang]}”</p><div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-[#d8cdbd] pt-6"><div><p className="font-semibold">{review.name}</p><p className="mt-1 text-xs text-[#746c63]">{review.treatment[lang]} · {x.reviewNote}</p></div><a href="https://www.google.com/maps/search/?api=1&query=Healing%20M%26A%20Spa%20One%20Paseo%20Cebu" target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-medium text-[#7e5d37]">{x.reviewLink}<ArrowUpRight className="ml-2 size-4" /></a></div></article>)}</div></div><div className="mt-5 flex justify-center gap-2">{reviews.map((review, index) => <button key={review.name} type="button" onClick={() => setReviewIndex(index)} aria-label={`Show review ${index + 1}`} className={`h-2 rounded-full transition-all ${index === reviewIndex ? 'w-8 bg-[#9a7446]' : 'w-2 bg-[#cfc3b2]'}`} />)}</div></div></section>

    <section id="contact" className="scroll-mt-20 bg-[#e9dfd0] px-5 py-16 lg:px-10"><div className="mx-auto max-w-7xl"><h2 className="text-center font-heading text-3xl font-semibold leading-tight tracking-[-0.025em]">{x.contactTitle}</h2><div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3"><a href="https://pf.kakao.com/_fJxoFn" target="_blank" rel="noreferrer" className="flex h-14 items-center justify-center rounded-full bg-[#f9df30] px-5 text-sm font-semibold text-[#2b2520] shadow-sm"><MessageCircle className="mr-2 size-5" />{x.kakao}</a><a href="https://www.instagram.com/healing.spa_ph/" target="_blank" rel="noreferrer" className="flex h-14 items-center justify-center rounded-full bg-[#9d4668] px-5 text-sm font-semibold text-white shadow-sm"><InstagramIcon /> <span className="ml-2">{x.instagram}</span></a><a href="https://m.me/HealingMedicalandAestheticsSpa" target="_blank" rel="noreferrer" className="flex h-14 items-center justify-center rounded-full bg-[#0866ff] px-5 text-sm font-semibold text-white shadow-sm"><FacebookIcon /> <span className="ml-2">{x.facebook}</span></a></div></div></section>

    <section className="bg-[#fffdf9] px-5 py-24 lg:px-10"><div className="mx-auto max-w-4xl"><div className="text-center"><p className="text-xs font-semibold tracking-[0.22em] text-[#9a7446]">FAQ</p><h2 className={`mt-4 ${sectionHeadingClass}`}>{x.faqTitle}</h2><p className="mt-4 text-sm leading-7 text-[#746c63]">{x.faqBody}</p></div><div className="mt-10 divide-y divide-[#ddd3c4] border-y border-[#ddd3c4]">{x.faqs.map(([question, answer]) => <details key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-medium"><span>{question}</span><span className="text-xl text-[#9a7446] transition-transform group-open:rotate-45">+</span></summary><p className="mt-4 pr-10 text-sm leading-7 text-[#6e655c]">{answer}</p></details>)}</div></div></section>
    <section id="privacy" className="scroll-mt-20 bg-[#f7f2e9] px-5 py-14 lg:px-10"><div className="mx-auto max-w-4xl rounded-2xl border border-[#d8cdbd] bg-white/55 p-6 sm:p-8"><h2 className="font-heading text-2xl">{x.privacyTitle}</h2><p className="mt-3 text-sm leading-7 text-[#6e655c]">{x.privacyBody}</p></div></section>

    <section id="access" className="scroll-mt-20 bg-[#2f3d32] px-5 py-24 text-white lg:px-10 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_.9fr] lg:items-end"><div><p className="text-xs font-semibold tracking-[0.22em] text-[#d9b77c]">LOCATION &amp; HOURS</p><h2 className={`mt-4 ${sectionHeadingClass}`}>{t.locationTitle}</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-white/68">Ground Floor Unit OP-110, One Paseo, Paseo Saturnino, Cebu City, 6000 Cebu</p><p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">{x.grab}<br />{x.parking}</p><a href="https://www.google.com/maps/search/?api=1&query=Healing%20M%26A%20Spa%20One%20Paseo%20Cebu" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center border-b border-[#d9b77c] pb-2 text-sm font-medium text-[#ecd2a5]">{t.map}<ArrowUpRight className="ml-2 size-4" /></a></div><div className="grid gap-7 border-t border-white/15 pt-8 sm:grid-cols-2 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"><div><p className="text-xs tracking-[0.15em] text-white/45">BODY MASSAGE</p><p className="mt-3 text-sm leading-7">{t.daysBody}<br /><span className="text-lg">10:00–23:00</span></p></div><div><p className="text-xs tracking-[0.15em] text-white/45">SOPHIA FACIAL</p><p className="mt-3 text-sm leading-7">{t.daysFacial}<br /><span className="text-lg">09:30–20:00</span></p></div></div></div></section>

    <footer className="bg-[#211d19] px-5 py-10 text-white lg:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-heading text-xl tracking-[0.08em]">HEALING <span className="text-[#d9b77c]">M&amp;A</span> SPA</p><p className="mt-2 text-xs text-white/45">Cebu Premium Body &amp; Facial Spa</p></div><div className="flex items-center gap-3"><a aria-label="Instagram" href="https://www.instagram.com/healing.spa_ph/" target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-[#d9b77c] hover:text-[#d9b77c]"><InstagramIcon /></a><a aria-label="Facebook" href="https://www.facebook.com/HealingMedicalandAestheticsSpa" target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-[#d9b77c] hover:text-[#d9b77c]"><FacebookIcon /></a></div></div><div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Healing M&amp;A Spa. All rights reserved. · <a href="#privacy" className="underline underline-offset-2">Privacy</a></p><p className="flex items-center gap-2"><MessageCircle className="size-3.5" />{t.support}</p></div></footer>

    <a href="#contact" className="fixed bottom-5 right-5 z-50 inline-flex h-12 items-center rounded-full border border-[#f0d5a5] bg-[#b8863f] px-5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(218,174,98,.62)] transition hover:-translate-y-0.5 hover:bg-[#c99a55] focus:outline-none focus:ring-4 focus:ring-[#d9b77c]/35">{x.fixedBook}<ArrowRight className="ml-2 size-4" /></a>
  </main>;
}
