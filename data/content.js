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
  eyebrow: '23 November 2026 | For Aqeelah',
  heroTitle: 'Happy Birthday, My Love',
  heroSubtitle:
    'A quiet corner of the internet built just for you, from Cape Town to Johannesburg and every kilometre in between.',
  letterHeading: 'A Note For Your Birthday',
  // Replace or expand these paragraphs with your real birthday letter before 23 Nov.
  letterParagraphs: [
    'Happy birthday, Aqeelah. Building this for you was my favourite way to bridge the 1,400 km between us until you are finally here in a couple of days.',
    'You spend so much of your life caring for everyone else, staying steady under pressure, and still somehow bringing warmth into every conversation we have. Today is about slowing down and letting yourself be celebrated properly.',
    'Take your time exploring the rest of the site: there is a puzzle made for us, a stack of my favourite photos and reasons I adore you, and a Daily Jar you can keep coming back to whenever you need a smile or a pick-me-up.',
  ],
  letterSignOff: 'With love, Rio',

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
    heading: 'Daily 5-Letter Wordle',
    subheading: "Six tries to guess today's 5-letter word. A fresh word unlocks every day at midnight.",
    startDate: '2026-11-23',
    winTitle: 'You got it!',
    words: [
      {
        word: 'HEART',
        message:
          'Sharp as ever. Consider this your official reminder that you have my whole heart, and I cannot wait to see you around the 25th.',
      },
      {
        word: 'SMILE',
        message:
          'Your smile still ruins my focus every single time. Come back tomorrow for a new word.',
      },
      {
        word: 'LATTE',
        message:
          'Caffeine first, conquering the rest of the day second. Hope today treats you gently, love.',
      },
      {
        word: 'PLANE',
        message:
          'CPT to JNB cannot come fast enough. Counting down every hour until you land.',
      },
      {
        word: 'LAUGH',
        message:
          'If you have not laughed properly today, go open the comedy jar after this.',
      },
      {
        word: 'BLUSH',
        message:
          'Your signature colour palette in one word, and still somehow softer than your smile.',
      },
      {
        word: 'TRUST',
        message:
          'Long distance only works because of how steady and real we are together.',
      },
      {
        word: 'LOVED',
        message:
          'Just in case you needed a quick reminder today: you are deeply, completely loved.',
      },
      {
        word: 'SWEET',
        message:
          'Half sweet, half trouble, 100% my favourite person.',
      },
      {
        word: 'PEACE',
        message:
          'Wishing you a calm, unhurried day with zero chaos and plenty of rest.',
      },
    ],
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
    tag: '01 / 10',
    title: 'Aqeelah Khalifa',
    photo: 'images/120f4692-1d41-4c31-9989-93276ee4ed7c.jpg',
    alt: 'One of the first photos of Aqeelah',
    note: 'One of the very first pictures I ever saw of you, and I immediately nicknamed you Aqeelah Khalifa because that was the exact look you were going for here. Safe to say you had my attention straight away.',
  },
  {
    id: 2,
    tag: '02 / 10',
    title: 'Gym Motivation',
    photo: 'images/34c720b5-bc4f-4019-b184-3f7ceeeff2c0.jpg',
    alt: 'Photo of Aqeelah looking incredible',
    note: 'Honestly, this was the exact picture that made me realise I needed to stay in shape if I was going to walk next to you. Cracking body, zero effort.',
  },
  {
    id: 3,
    tag: '03 / 10',
    title: 'Saving Lives',
    photo: 'images/67421039-6d54-4ecf-aadf-d3b688e22037.jpg',
    alt: 'Aqeelah in her scrubs',
    note: 'Only you could look this sexy in scrubs right before heading out to save lives. Somehow pulling off brilliant and gorgeous at the exact same time.',
  },
  {
    id: 4,
    tag: '04 / 10',
    title: 'Pretty In Pink',
    photo: 'images/74702eaf-93fc-4751-9666-b2722e31ba77.jpg',
    alt: 'Aqeelah in a pink dress',
    note: 'One of my absolute favourite dresses on you. You look ridiculously pretty in pink here, and your hair was doing everything right on this day.',
  },
  {
    id: 5,
    tag: '05 / 10',
    title: 'Michael Kors',
    photo: 'images/7494611f-e303-4273-96b8-2fdc5007801e.jpg',
    alt: 'Anime-style portrait of Aqeelah wearing a Michael Kors jersey',
    note: 'My favourite anime-style version of you wearing the Michael Kors jersey I sent for Valentine\'s Day. Or as Nicki Minaj put it: "Couldn\'t get Michael Kors if you was fuckin\' Michael Kors."',
  },
  {
    id: 6,
    tag: '06 / 10',
    title: 'Those Pants',
    photo: 'images/abe3d437-3ce6-47ac-a769-0d2805859b5c.jpg',
    alt: 'Aqeelah wearing her signature pants',
    note: 'You wearing my favourite pants of yours. Your figure, your style, the way you carry yourself: I genuinely love everything about you.',
  },
  {
    id: 7,
    tag: '07 / 10',
    title: 'My All-Time Favourite',
    photo: 'images/b109163c-bb59-42d2-bcde-b3bdd9c15128.jpg',
    alt: 'Favourite photo of Aqeelah from her Caltex days',
    note: 'Hands down my favourite photo of you, even though it came from those early Caltex days you hated so much. Proof that even during your worst days, you still shine.',
  },
  {
    id: 8,
    tag: '08 / 10',
    title: 'Golden Hour',
    photo: 'images/b182edf3-1be5-4fd8-9636-db164d867835.jpg',
    alt: 'Photo of Aqeelah showing off her style effortlessly',
    note: 'One of my favourite shots of you showing off your style and figure like it is nothing at all. Effortlessly amazing, every single time.',
  },
  {
    id: 9,
    tag: '09 / 10',
    title: 'Sitting Pretty',
    photo: 'images/f4df0e73-850a-4383-a282-c10a8fcf52d3.jpg',
    alt: 'Photo of Aqeelah sitting down',
    note: 'Same effortless energy as the last one, just sitting down and somehow looking even more stunning. You really do not know how to take a bad picture.',
  },
  {
    id: 10,
    tag: '10 / 10',
    title: 'Next Up: Us',
    photo: 'images/f9f1790d-401b-49b0-b083-7c6ede9fff0f.jpg',
    alt: 'Selfie of Aqeelah',
    note: 'Just you in this selfie for now, since we have not had our turn in front of the camera yet. Soon I will be right next to you in these pictures, and our own photos are going straight onto this website.',
  },
];

const DAILY_QUOTES = [
  'You do not have to hold everything together for everyone today. Let yourself be looked after too.',
  'Across 1,400 km or sitting right next to me, you are still my favourite part of the day.',
  'A quick reminder: you are doing brilliantly, even on the days that feel endless.',
  'Some people make ordinary Tuesdays feel like something worth waiting for. You are one of them.',
  'Take a deep breath, drink some water, and remember somebody in Joburg is very proud of you.',
  'Good things take patience, and the best things arrive in a couple of days.',
  'No matter how heavy today felt, it does not get to follow you into tomorrow.',
  'You are softer, funnier, and stronger than you give yourself credit for.',
  'Little reminder from Rio: I like you an unreasonable amount.',
  'One day at a time, one smile at a time, and always in your corner.',
];

const MOOD_JARS = {
  pickMeUp: {
    id: 'pickMeUp',
    name: 'Pick Me Up',
    subtitle: 'For sad days, quiet nights, or when you just need a little warmth.',
    badge: 'Comfort Jar',
    notes: [
      'If today felt heavy, let me take some of that weight off your shoulders. You did enough today. Rest properly tonight.',
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
      'Prescription note: if anyone annoys you today, mentally prescribe them 400 mg of minding their own business.',
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
