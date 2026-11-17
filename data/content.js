/**
 * Aqeelah's Surprise Birthday Website Content & Configuration
 *
 * Edit this file anytime between 18 and 22 November to personalise
 * your letter, photo captions, Wordle word, daily quotes, and Mood Jar notes.
 * Rule reminder: South African / UK English spelling, and no em-dashes.
 */

const SITE_CONFIG = {
  recipientName: 'Aqeelah',
  recipientTitle: 'Aqeelah',
  senderName: 'Rio',
  timezone: 'Africa/Johannesburg',
  unlockIso: '2026-11-23T00:00:00+02:00',
  trip: {
    fromCode: 'CPT',
    fromCity: 'Cape Town',
    toCode: 'JNB',
    toCity: 'Johannesburg',
    distanceKm: 1400,
    arrivalLabel: '~25 Nov 2026',
    flightCode: 'RQ-2311',
    seat: '1A (Window)',
    gate: 'HEART',
  },
};

const DAILY_DROPS = [
  {
    date: '2026-11-18',
    dayNumber: 1,
    badge: '18 Nov',
    title: 'The Opening Note',
    teaser: 'Day one of the countdown.',
    type: 'note',
    body:
      "I know things have been a little hectic for you, but don't worry love, things will get better soon and I can promise you that when you see me, you'll realise how all of this will be worth it.",
  },
  {
    date: '2026-11-19',
    dayNumber: 2,
    badge: '19 Nov',
    title: 'Patience Check',
    teaser: 'Four days to go.',
    type: 'note',
    body:
      'Four days left. Quick reminder that patience is a virtue, love, so no trying to guess what is waiting behind the timer.',
  },
  {
    date: '2026-11-20',
    dayNumber: 3,
    badge: '20 Nov',
    title: 'Your Boarding Pass',
    teaser: 'Cleared for approach. Tap to check in.',
    type: 'boarding-pass',
    body:
      'Just in case the 1,400 km has felt long lately: your seat is reserved, my bags of patience are officially out of stock, and I cannot wait to see you walk through arrivals around the 25th.',
    signOff: 'Rio',
  },
  {
    date: '2026-11-21',
    dayNumber: 4,
    badge: '21 Nov',
    title: 'Two Sleeps Left',
    teaser: 'Your turn to be spoiled.',
    type: 'note',
    body:
      'Two sleeps left. You spend so much of your energy looking after everyone else, so consider this your official notice that it is your turn to be spoiled.',
  },
  {
    date: '2026-11-22',
    dayNumber: 5,
    badge: '22 Nov',
    title: 'Birthday Eve',
    teaser: 'One last sleep.',
    type: 'note',
    body:
      'Almost midnight. Whether you are staying up to watch the clock hit zero or opening this first thing in the morning, happy early birthday, love. Tomorrow is all yours.',
  },
];

const BIRTHDAY_HOME = {
  eyebrow: '23 November 2026 | Happy Birthday',
  heroTitle: 'Happy Birthday, Aqeelah',
  heroSubtitle:
    'A quiet corner of the internet built just for you, from Cape Town to Johannesburg and every kilometre in between.',
  letterHeading: 'A Note For Your Birthday',
  // Replace or expand these paragraphs with your real birthday letter before 23 Nov.
  letterParagraphs: [
    'Happy birthday, Aqeelah. Building this for you was my favourite way to bridge the 1,400 km between us until you are finally here in a couple of days.',
    'You spend so much of your life caring for everyone else, staying steady under pressure, and still somehow bringing warmth into every conversation we have. Today is about slowing down and letting yourself be celebrated properly.',
    'Take your time exploring the rest of the site: there is a puzzle made for us, a stack of my favourite photos and reasons I adore you, and a Daily Jar you can keep coming back to whenever you need a smile or a pick-me-up.',
  ],
  letterSignOff: 'Always yours, Rio',

  chart: {
    heading: "Aqeelah's Birthday Chart",
    fileCode: 'CHART NO. 23-11 | CONFIDENTIAL',
    rows: [
      { label: 'Patient', value: 'Aqeelah (Birthday Edition)' },
      { label: 'Chief Complaint', value: 'Currently 1,400 km too far away' },
      { label: 'Vitals', value: 'Heart full, smile undefeated, coffee levels variable' },
      { label: 'Prescription', value: '1 Daily Jar pull every 24 hours, plus mandatory spoiling' },
      { label: 'Prognosis', value: 'Touching down CPT -> JNB around 25 Nov (full recovery expected)' },
    ],
  },

  wordle: {
    heading: 'The 5-Letter Puzzle',
    subheading:
      'Six tries to guess a 5-letter word that fits us. Hint: change this in data/content.js to any personal 5-letter word.',
    // Must be exactly 5 uppercase letters A-Z.
    secretWord: 'HEART',
    winTitle: 'You got it!',
    winMessage:
      'Sharp as ever, Doctor. Consider this your official reminder that you have my whole heart, and I cannot wait to see you in person around the 25th.',
  },

  distance: {
    heading: 'Closing the Distance',
    subheading: 'Drag the slider from Cape Town to Johannesburg to close the 1,400 km gap.',
    milestones: [
      {
        minKm: 1100,
        badge: 'Long Distance Mode',
        title: '1,400 km apart, still my first thought',
        text: 'Even across provinces, somehow a quick call with you fixes my entire day.',
      },
      {
        minKm: 600,
        badge: 'Halfway There',
        title: 'Somewhere over the Karoo',
        text: 'Counting down the hours until texts turn into actual hugs.',
      },
      {
        minKm: 100,
        badge: 'Final Approach',
        title: 'Descending into Joburg',
        text: 'The best part of any trip is the last hour before seeing your face.',
      },
      {
        minKm: 0,
        badge: 'Arrived (~25 Nov)',
        title: '0 km. Finally in the same room.',
        text: 'No screen, no distance, just us. Safe flight soon, Aqeelah.',
      },
    ],
  },
};

const ABOUT_DECK = [
  {
    id: 1,
    tag: 'Memory 01',
    title: 'My Favourite Smile',
    photo: 'images/120f4692-1d41-4c31-9989-93276ee4ed7c.jpg',
    alt: 'Favourite photo of Aqeelah smiling',
    note: 'Add your favourite memory or reason behind this photo right here in data/content.js.',
  },
  {
    id: 2,
    tag: 'Reason 02',
    title: 'How You Care For People',
    photo: null,
    note: 'Even after exhausting days as a doctor, you still show up with so much gentleness and patience for the people you love.',
  },
  {
    id: 3,
    tag: 'Memory 03',
    title: 'Effortlessly You',
    photo: 'images/34c720b5-bc4f-4019-b184-3f7ceeeff2c0.jpg',
    alt: 'Candid photo of Aqeelah',
    note: 'Write a quick note about what you love in this picture or the day it was taken.',
  },
  {
    id: 4,
    tag: 'Memory 04',
    title: 'Golden Hour',
    photo: 'images/67421039-6d54-4ecf-aadf-d3b688e22037.jpg',
    alt: 'Warm portrait of Aqeelah',
    note: 'Another spot for a personal story, an inside joke, or why this photo stays saved in your favourites.',
  },
  {
    id: 5,
    tag: 'Reason 05',
    title: 'Your Laugh',
    photo: null,
    note: 'Your laugh makes distance disappear in two seconds flat. Making you laugh is genuinely my favourite sport.',
  },
  {
    id: 6,
    tag: 'Memory 06',
    title: 'One To Keep',
    photo: 'images/74702eaf-93fc-4751-9666-b2722e31ba77.jpg',
    alt: 'Special photo of Aqeelah',
    note: 'Personalise this caption with a detail only the two of you remember.',
  },
  {
    id: 7,
    tag: 'Memory 07',
    title: 'Unmatched Energy',
    photo: 'images/7494611f-e303-4273-96b8-2fdc5007801e.jpg',
    alt: 'Photo of Aqeelah out and about',
    note: 'Drop a line here about what makes this moment unforgettable.',
  },
  {
    id: 8,
    tag: 'Reason 08',
    title: 'Your Strength',
    photo: null,
    note: 'I admire how hard you work and how quietly capable you are, even when things get hectic.',
  },
  {
    id: 9,
    tag: 'Memory 09',
    title: 'Always Stunning',
    photo: 'images/abe3d437-3ce6-47ac-a769-0d2805859b5c.jpg',
    alt: 'Portrait of Aqeelah dressed up',
    note: 'Add a short note telling her what went through your head the first time you saw this photo.',
  },
  {
    id: 10,
    tag: 'Memory 10',
    title: 'Soft Moments',
    photo: 'images/b109163c-bb59-42d2-bcde-b3bdd9c15128.jpg',
    alt: 'Warm photograph of Aqeelah',
    note: 'A cosy memory or small quirk you adore about her goes right here.',
  },
  {
    id: 11,
    tag: 'Memory 11',
    title: 'My Person',
    photo: 'images/b182edf3-1be5-4fd8-9636-db164d867835.jpg',
    alt: 'Photo of Aqeelah',
    note: 'Write something honest and personal about why she feels like home.',
  },
  {
    id: 12,
    tag: 'Reason 12',
    title: 'Making Distance Worth It',
    photo: null,
    note: 'Long distance is never easy, yet with you it has never once felt uncertain. You make every kilometre worthwhile.',
  },
  {
    id: 13,
    tag: 'Memory 13',
    title: 'Pure Joy',
    photo: 'images/f4df0e73-850a-4383-a282-c10a8fcf52d3.jpg',
    alt: 'Happy photo of Aqeelah',
    note: 'Add your own caption or inside joke for this snapshot.',
  },
  {
    id: 14,
    tag: 'Memory 14',
    title: 'To Many More',
    photo: 'images/f9f1790d-401b-49b0-b083-7c6ede9fff0f.jpg',
    alt: 'Favourite keepsake photo of Aqeelah',
    note: 'Here is to this new year of your life, more flights together, and plenty more photos to add.',
  },
];

const DAILY_QUOTES = [
  'You do not have to hold everything together for everyone today. Let yourself be looked after too.',
  'Across 1,400 km or sitting right next to me, you are still my favourite part of the day.',
  'A quick reminder: you are doing brilliantly, even on the days that feel endless.',
  'Some people make ordinary Tuesdays feel like something worth waiting for. You are one of them.',
  'Take a deep breath, drink some water, and remember somebody in Joburg is very proud of you.',
  'Good things take patience, and the best things arrive in a couple of days.',
  'No matter how heavy the shift was, it does not get to follow you home tonight.',
  'You are softer, funnier, and stronger than you give yourself credit for.',
  'Little reminder from Rio: I like you an unreasonable amount.',
  'One day at a time, one smile at a time, and always in your corner.',
];

const MOOD_JARS = {
  pickMeUp: {
    id: 'pickMeUp',
    name: 'Pick Me Up',
    subtitle: 'For tough shifts, tired days, or when you just need a little warmth.',
    badge: 'Comfort Jar',
    notes: [
      'If today felt heavy, let me take some of that weight off your shoulders. You did enough today, Doctor. Rest properly tonight.',
      'Whenever you doubt yourself for even a second, remember how many people leave a room calmer and better just because you were in it.',
      'Close your eyes for ten seconds and picture the next time I get to hug you properly. You do not have to carry everything alone.',
      'Bad days expire at midnight. My affection for you does not. Drink some tea, put your phone down after this, and let yourself breathe.',
      'You are allowed to have quiet, slow days where your only job is taking care of Aqeelah for a change.',
    ],
  },
  laughter: {
    id: 'laughter',
    name: "Doctor's Orders: Laughter",
    subtitle: 'Because laughter really is the best medicine (even if you disagree).',
    badge: 'Comedy Jar',
    notes: [
      'Official medical update: missing me is currently classified as an acute condition, treatable only by flying CPT to JNB immediately.',
      'Fun fact: I spent way too long trying to make sure this website looks fancy enough for someone who still asks me how to find a downloaded file.',
      'I promise to act completely normal when you land at the airport. (Note: this promise is legally non-binding.)',
      'Prescription note: if anyone annoys you at work today, mentally prescribe them 400 mg of minding their own business.',
      'Reminder that no matter how smart and accomplished you are, you are still stuck with my terrible jokes.',
    ],
  },
};

window.AWEB_CONTENT = {
  SITE_CONFIG,
  DAILY_DROPS,
  BIRTHDAY_HOME,
  ABOUT_DECK,
  DAILY_QUOTES,
  MOOD_JARS,
};
