export type BookingLang = 'ja' | 'ko' | 'en';
export type ServiceCategory = 'body' | 'facial' | 'medical';

export type BookingService = {
  id: string;
  category: ServiceCategory;
  durations: string[];
  label: Record<BookingLang, string>;
};

const label = (en: string, ko = en, ja = en) => ({ en, ko, ja });

export const bookingServices: BookingService[] = [
  { id: 'swedish', category: 'body', durations: ['60min', '90min', '120min'], label: label('Swedish Massage', '스웨디시 마사지', 'スウェディッシュマッサージ') },
  { id: 'shiatsu', category: 'body', durations: ['60min', '90min', '120min'], label: label('Shiatsu Massage', '시아추 마사지', '指圧マッサージ') },
  { id: 'aroma-swedish', category: 'body', durations: ['60min', '90min', '120min'], label: label('Aroma Swedish', '아로마 스웨디시', 'アロマスウェディッシュ') },
  { id: 'hot-coconut', category: 'body', durations: ['60min', '90min', '120min'], label: label('Hot Coconut Oil Massage', '핫 코코넛 오일 마사지', 'ホットココナッツオイルマッサージ') },
  { id: 'philippine-hilot', category: 'body', durations: ['90min', '120min'], label: label('Philippine Hilot Massage', '필리핀 힐롯 마사지', 'フィリピンヒロットマッサージ') },
  { id: 'healing-special', category: 'body', durations: ['90min', '120min'], label: label('Healing Special · Olive Jade Stone', '힐링 스페셜 · 올리브 제이드 스톤', 'ヒーリングスペシャル・オリーブジェイドストーン') },
  { id: 'combination-foot', category: 'body', durations: ['90min', '120min'], label: label('Combination Swedish & Foot', '스웨디시 & 풋 콤비네이션', 'スウェディッシュ＆フット') },
  { id: 'foot-chair', category: 'body', durations: ['60min', '90min'], label: label('Foot Chair Massage', '풋 체어 마사지', 'フットチェアマッサージ') },
  { id: 'kids-growth', category: 'body', durations: ['60min', '90min'], label: label('Growth Massage for Kids', '키즈 성장 마사지', 'キッズ成長マッサージ') },
  { id: 'maternity', category: 'body', durations: ['100min'], label: label('Maternity Massage', '임산부 마사지', 'マタニティマッサージ') },
  { id: 'after-golf-1', category: 'body', durations: ['120min'], label: label('After Golf Care I', '애프터 골프 케어 I', 'アフターゴルフケア I') },
  { id: 'after-golf-2', category: 'body', durations: ['120min'], label: label('After Golf Care II', '애프터 골프 케어 II', 'アフターゴルフケア II') },
  { id: 'after-sun', category: 'body', durations: ['120min'], label: label('After Sun Healing Care', '애프터 선 힐링 케어', 'アフターサンヒーリングケア') },
  { id: 'like-a-feather', category: 'body', durations: ['120min'], label: label('Like A Feather', '깃털이 되다', '羽のようになる') },
  { id: 'feather-shoulder', category: 'body', durations: ['90min'], label: label('Feather Like Shoulder', '하늘나는 어깨', '空飛ぶ肩') },
  { id: 'feather-legs', category: 'body', durations: ['90min'], label: label('Feather Like Legs', '하늘나는 다리', '空飛ぶ脚') },
  { id: 'beach-scrub', category: 'body', durations: ['120min'], label: label('On The Beach Scrub Massage', '온 더 비치 스크럽 마사지', 'オン・ザ・ビーチ・スクラブ') },
  { id: 'r4u-womb', category: 'body', durations: ['90min'], label: label('R4U Energy Therapy · Womb Care', 'R4U 에너지 테라피 · 자궁 케어', 'R4Uエナジーセラピー・子宮ケア') },
  { id: 'cinderella-pedi', category: 'body', durations: ['90min'], label: label('Cinderella Pedi Planning', '신데렐라 페디 플래닝', 'シンデレラ・ペディプランニング') },
  { id: 'shiny-day', category: 'body', durations: ['180min'], label: label('The Shiny Day', '더 샤이니 데이', 'ザ・シャイニーデイ') },
  { id: 'sophia-signature', category: 'body', durations: ['120min'], label: label("Sophia's Signature", '소피아 시그니처', 'ソフィア・シグネチャー') },

  { id: 'hydra-1', category: 'facial', durations: ['40min'], label: label('Hydra Care I', '하이드라 케어 I', 'ハイドラケア I') },
  { id: 'hydra-2', category: 'facial', durations: ['60min'], label: label('Hydra Care II', '하이드라 케어 II', 'ハイドラケア II') },
  { id: 'hydra-men-1', category: 'facial', durations: ['50min'], label: label("Hydra Men's Care I", '하이드라 맨즈 케어 I', 'ハイドラメンズケア I') },
  { id: 'hydra-men-2', category: 'facial', durations: ['70min'], label: label("Hydra Men's Care II", '하이드라 맨즈 케어 II', 'ハイドラメンズケア II') },
  { id: 'glow-bounce', category: 'facial', durations: ['60min'], label: label('Glow Bounce Care', '글로우 바운스 케어', 'グロウバウンスケア') },
  { id: 'lhalala-peel', category: 'facial', durations: ['90min'], label: label('LHALALA Peel', '라라필', 'ララピール') },
  { id: 'vita-crush', category: 'facial', durations: ['90min'], label: label('Vita Crush', '비타 크러시', 'ビタクラッシュ') },
  { id: 'skin-planning', category: 'facial', durations: ['90min'], label: label('Skin Planning', '스킨 플래닝', 'スキンプランニング') },
  { id: 'hifu', category: 'facial', durations: ['90min'], label: label('HIFU', '하이푸', 'HIFU') },
  { id: 'rejuven', category: 'facial', durations: ['90min'], label: label('Rejuven', '리쥬벤', 'リジュベン') },
  { id: 'fracsono', category: 'facial', durations: ['90min'], label: label('Fracsono', '프락소노', 'フラクソノ') },
  { id: 'royal-aroma', category: 'facial', durations: ['90min'], label: label('Signature Royal Aroma Facial', '시그니처 로열 아로마 페이셜', 'シグネチャーロイヤルアロマフェイシャル') },
  { id: 'o2-derm', category: 'facial', durations: ['90min'], label: label('O2 Derm', 'O2 덤', 'O2ダーム') },
  { id: 'mts-mulkwang', category: 'facial', durations: ['90min'], label: label('MTS Mulkwang', 'MTS 물광', 'MTSムルグァン') },
  { id: 'mts-exosome', category: 'facial', durations: ['90min'], label: label('MTS Exosome', 'MTS 엑소좀', 'MTSエクソソーム') },
  { id: 'puraxel', category: 'facial', durations: ['90min'], label: label('PURAXEL', '퓨라셀', 'ピュラセル') },
  { id: 'hifu-rejuven', category: 'facial', durations: ['90min'], label: label('HIFU + Rejuven', '하이푸 + 리쥬벤', 'HIFU＋リジュベン') },
  { id: 'r4u-lifting', category: 'facial', durations: ['90min'], label: label('R4U Lifting Facial + Ovary Care', 'R4U 리프팅 페이셜 + 난소 케어', 'R4Uリフティングフェイシャル＋卵巣ケア') },
  { id: 'acne-bible', category: 'facial', durations: ['90min'], label: label('Acne Bible', '아크네 바이블', 'アクネバイブル') },

  ...[
    'Botox · Crow’s Feet', 'Botox · Forehead', 'Botox · Masseter', 'Botox · Barbie Arms',
    'Mesobotox · Full Face', 'Sweattox', 'Hilo-Wave', 'Profhilo', 'IV Gluta & Vitamin C',
    'IV Skin & Slim', 'Placenta Injection', 'Beauty Drip', 'Fountain of Youth',
    'Acne Injection', 'Fat Dissolving Injection',
  ].map((name, index) => ({
    id: `medical-${index + 1}`,
    category: 'medical' as const,
    durations: ['consultation'],
    label: label(name),
  })),
  { id: 'consultation', category: 'body', durations: ['consultation'], label: label('Help me choose', '상담 후 결정', '相談して決めたい') },
];

export const bookingServiceMap = new Map(bookingServices.map(service => [service.id, service]));

export function isAllowedDuration(serviceId: string, duration: string) {
  return bookingServiceMap.get(serviceId)?.durations.includes(duration) ?? false;
}
