# Aqeelah's Surprise Birthday Website Plan

> **Status:** Plan Locked | **Countdown Launch:** 18 November 2026 | **Midnight Unlock:** 23 November 2026 at 00:00:00 SAST (UTC+2)
> **Hosting:** Cloudflare Pages (static build)

---

## 1. Visual Identity & Design Tokens ("Warm Luxury Dusty Rose & Cream")

### Aesthetic Direction
Warm Luxury Editorial: intimate, tactile, refined, and playful. Designed like modern keepsake stationery with soft serif headings, clean controls, and thoughtful interactive moments tailored to a long-distance relationship.

### Colour Palette
| Role | Token Name | Hex / Value |
| :--- | :--- | :--- |
| Page Background (Alabaster Cream) | `--bg-cream` | `#FAF6F5` |
| Card Surface (Pure White) | `--surface-white` | `#FFFFFF` |
| Soft Blush Highlight / Badges | `--surface-blush-soft` | `#F5E6E8` |
| Deep Blush (Hover / Accent Fills) | `--surface-blush-deep` | `#EED4D8` |
| Deep Espresso (Dark Contrast / Hero) | `--bg-espresso` | `#2B2123` |
| Primary Dusty Rose | `--accent-rose` | `#C87D87` |
| Deep Rose (Active / Hover) | `--accent-rose-deep` | `#A65E68` |
| Light Rose | `--accent-rose-light` | `#E4B5BC` |
| Warm Champagne / Rose Gold | `--accent-champagne` | `#B89278` |
| Light Champagne | `--accent-champagne-light` | `#EFE5DE` |
| Main Espresso Text | `--text-main` | `#2B2123` |
| Muted Text | `--text-muted` | `#6E5A5D` |
| Soft Caption Text | `--text-soft` | `#9A8488` |
| Warm Hairline Border | `--border-warm` | `#EADCD9` |
| Rose Border | `--border-rose` | `#DFBFC4` |

### Typography (Google Fonts)
- **Editorial Headings:** `Cormorant Garamond` (semi-bold / bold, tight tracking)
- **Body, Buttons & Labels:** `Plus Jakarta Sans`

### Shape, Elevation & Feel
- **Large card radius:** `22px`
- **Medium radius:** `14px`
- **Small radius:** `10px`
- **Soft espresso shadow:** `0 10px 30px rgba(43, 33, 35, 0.05)`
- **Hover rose shadow:** `0 16px 40px rgba(200, 125, 135, 0.14)`

---

## 2. Copy & Tone Rules

- **Spelling:** South African / UK English throughout (e.g., *colour*, *favourite*, *memories*, *personalise*, *organise*, *humour*, *realise*, *kilometres*).
- **Punctuation:** Never use em-dashes anywhere in headings, body copy, captions, or code comments.
- **Voice:** Warm, personal, witty, and genuinely human. Written specifically from you to Aqeelah, avoiding generic clichés.

---

## 3. Architecture, Hosting & Auto-Unlock Behaviour

- **Hosting:** Cloudflare Pages (static deployment directly from this project).
- **Time-Gate Target:** `2026-11-23T00:00:00+02:00` (SAST / UTC+2).
- **Seamless Midnight Transition:** While on the countdown page, the timer checks UTC+2 every second. The instant it hits `00:00:00`, it triggers an automatic celebratory transition (floating Dusty Rose petals / reveal animation) and unlocks the full site in place with zero page refresh or manual deploy required.
- **Two-Stage Rollout Plan:**
  - **Stage 1 (Ready for 18 Nov):** Live countdown, 5 daily drop slots (18 to 22 Nov) including the interactive Boarding Pass, and the full site skeleton/placeholders behind the timer.
  - **Stage 2 (18 to 22 Nov):** Populate and polish final copy, photos, Wordle secret word, "About You" card deck, and Mood Jar messages before the midnight unlock.
- **Private Testing Mode:** Secret query parameters (e.g. `?preview=unlocked` and `?day=20`) so you can inspect every daily drop and the unlocked site before sharing the clean link with her.

---

## 4. Phase 1: The Countdown & 5 Daily Drops (18 Nov to 22 Nov)

Sent to Aqeelah on **18 November**. Features a sleek Dusty Rose, Cream, and Deep Espresso countdown clock plus 5 daily drop cards that unlock one by one each day in UTC+2:

1. **18 Nov (Day 1): The Opening Note**
   - Warm welcome card introducing the countdown and letting her know to check back daily for a small unlock.
2. **19 Nov (Day 2): Warm-Up Clue / Mini Riddle**
   - A playful short clue hinting at what is waiting behind the timer.
3. **20 Nov (Day 3): The Boarding Pass Drop (Combined Flip + Check-In Animation)**
   - A luxury Dusty Rose & Champagne boarding pass for **her trip to you** (`ROUTE: CPT -> JNB | PASSENGER: DR AQEELAH | DISTANCE: ~1,400 KM | ARRIVAL: ~25 NOV | STATUS: GIRLFRIEND EN ROUTE`).
   - **Interaction:** Tapping **"Check In"** stamps the pass with a rose-gold *"Confirmed: Girlfriend En Route"* seal, flips the ticket smoothly in 3D, and animates a small plane flying along the 1,400 km dotted route toward you, revealing a personal note signed by **Rio**.
4. **21 Nov (Day 4): Sneak Peek Teaser**
   - A light teaser hinting at the Daily Jar or one of the birthday surprises waiting inside.
5. **22 Nov (Day 5, Birthday Eve): Almost Midnight**
   - Final countdown note encouraging her to watch the timer hit zero tonight (or open first thing on her birthday morning).

---

## 5. Phase 2: The Unlocked Website (23 Nov Midnight Onward)

Clean top navigation switching smoothly between three dedicated views (mobile-first and desktop-ready):

### View 1: Birthday Home (Celebration & Interactive Corner)
- **Editorial Hero & Birthday Letter:**
  - Deep Espresso contrast header with Champagne & Dusty Rose accents (pure typography, no hero photo), opening into your personal birthday letter to her (signed by **Rio**).
- **Dr Aqeelah's Chart / Birthday Rx:**
  - A witty, tasteful card styled like an upscale clinic chart / prescription (*Patient: Dr Aqeelah*, *Diagnosis: Severely missed*, *Dosage: 1 Mood Jar pull daily*, *Prognosis: Touching down ~25 Nov*).
- **Custom 1-Round 5-Letter Wordle:**
  - Styled in Dusty Rose, Champagne, and Espresso tiles. Six guesses to uncover a personal 5-letter word, revealing a secret celebratory note when solved.
- **Interactive Distance Slider (~1,400 km to 0 km):**
  - A tactile slider spanning `1,400 km` down to `0 km`. As she slides closer to `0 km`, the caption and visuals shift from long-distance truths to *"Finally in the same room (~25 Nov)"*.

### View 2: About You (What I Love About You)
- **Interactive Keepsake Card Deck (With Photos):**
  - A tactile deck of **14 numbered cards** she can tap to flip or swipe/cycle through (with shuffle and previous/next controls).
  - **Photo Balance:** Uses all **10 photos already in `images/`** paired with specific memories or captions, mixed with 4 pure-typography cards sharing heartfelt reasons and funny habits you notice about her.

### View 3: The Daily Jar (Her Everyday Bookmarkable Page)
Designed to stay useful every day after her birthday and your trip:
- **Quote of the Day:**
  - Displayed prominently at the top of the page, rotating automatically every calendar day (UTC+2) from your master list.
- **Mood Jars (2 Focused Categories):**
  1. **Pick Me Up** *(for sad days, tough hospital shifts, or whenever she needs comfort and reassurance)*
  2. **Doctor's Orders: Laughter Is the Best Medicine** *(funny stories, inside jokes, and silly notes to make her smile)*
- **Strict 1 Pull Per Day Rule:**
  - **1 message per day total regardless of jar** (choosing either jar uses her single pull for that calendar day in UTC+2).
  - Today's drawn message remains visible on screen so she can re-read it, while the jars display a warm *"Today's pull is yours. Come back tomorrow for a fresh one"* state until midnight.
  - `localStorage` tracks already-seen notes per jar so she does not get repeats until a jar is finished.

---

## 6. Content Needed From You

### For Stage 1 (Before 18 Nov Launch)
1. **Flight direction check:** Confirm whether she is flying `CPT -> JNB` (Cape Town to Joburg) or `JNB -> CPT`.
2. **Daily drops copy (Days 1 to 5):** Any specific lines you want, or I can write warm starter copy signed `Rio` that you can tweak anytime.

### For Stage 2 (Between 18 and 22 Nov)
3. **Wordle secret word:** One 5-letter word personal to you two (plus the message revealed when she solves it).
4. **Birthday letter & Doctor's Chart lines:** Your main letter and any inside jokes for her Rx card.
5. **Captions for the 10 photos in `images/`:** Short notes or memories for each of your 10 photos, plus any pure-text "About You" cards.
6. **Quote of the Day & 2 Mood Jar lists:** Your messages for the daily quote rotation and both jars (*Pick Me Up* and *Doctor's Orders: Laughter Is the Best Medicine*), stored in a clean, easy-to-edit data file.
