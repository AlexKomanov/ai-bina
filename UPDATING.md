# הוספת גיליון שבועי — Ai Bina

האתר הוא HTML סטטי פשוט — בלי בנייה, בלי npm. כל גיליון הוא קובץ `.html` נפרד, וכל הנתיבים בקבצים יחסיים (לא מתחילים ב־`/`) כדי שאפשר יהיה גם לפתוח את הקבצים ישירות בדפדפן (לחיצה כפולה) בלי שרת מקומי.

## התהליך (כ־10 דקות)

1. העתיקו את קובץ הגיליון האחרון לשם חדש לפי תאריך הפרסום:

   ```bash
   cp posts/2026-08-09.html posts/YYYY-MM-DD.html
   ```

2. בקובץ החדש `posts/YYYY-MM-DD.html`:
   - עדכנו את `<title>` ל־`גיליון N (DD בחודש YYYY) | Ai Bina` (הגדילו את N ב־1 לעומת הגיליון הקודם), ואת ה־`<meta name="description">`.
   - עדכנו את הכותרת `<h1 class="neon-text">גיליון N <span class="edition-date">(DD בחודש YYYY)</span></h1>`.
   - עדכנו את קישורי ה־`<title id="cat-...">` בתוכן העניינים אם שמות הקטגוריות משתנים.
   - מחקו את תוכן ה־`<article class="post-body">` הישן (בתוך שלושת ה־`<section class="category ...">`) והזינו במקומו את הסיכום החדש. לכל ידיעה:
     ```html
     <details id="item-N">
       <summary><h3>כותרת הידיעה</h3></summary>
       <div class="news-body">
         <p>
           משפט ראשון.<br>
           משפט שני.<br>
           ...
         </p>
         <a class="back-to-toc" href="#toc">↑ חזרה לתוכן העניינים</a>
       </div>
     </details>
     ```
     - בלי מספור בכותרת — רק שם הידיעה.
     - כל קטגוריה (`category-models` / `category-tools` / `category-video`) צובעת אוטומטית את הכותרת ואת הפס הצדדי של הידיעות שבתוכה. אם מתווספת קטגוריה רביעית, אפשר להוסיף מחלקה חדשה ב־`assets/style.css` עם `--accent` משלה.
     - מונחים באנגלית נשארים באנגלית; שמות קבצים/פקודות עטופים ב־`<code>...</code>`

3. הוסיפו כרטיס חדש בראש הרשימה ב־`index.html` (בתוך `<ul class="editions">`):

   ```html
   <li>
     <a class="edition-card" href="posts/YYYY-MM-DD.html">
       <h2 class="edition-title">גיליון N <span class="edition-date">(DD בחודש YYYY)</span></h2>
       <p class="edition-desc">משפט אחד שמסכם את השבוע.</p>
     </a>
   </li>
   ```

4. בדיקה מקומית — פתחו את `index.html` ישירות בדפדפן (לחיצה כפולה על הקובץ).

5. פרסום:

   ```bash
   git add -A
   git commit -m "post: גיליון N — YYYY-MM-DD"
   git push
   ```

   Vercel יפרוס אוטומטית תוך כדקה בזכות החיבור ל־GitHub.

## מבנה קובץ הגיליון

- כל קובץ גיליון עומד בפני עצמו — כולל header, footer וקישור לגיליון הקודם (`../index.html`).
- אין תבנית משותפת מעבר לגיליון האחרון שמעתיקים ממנו — זו הפשרה שנבחרה כדי להימנע מכלי בנייה.
- הידיעות הן `<details>`/`<summary>` מתקפלות (בלי JavaScript) עם תוכן עניינים בראש המאמר שמקשר לשלוש הקטגוריות.
- העיצוב (צבעים, גופנים, אנימציית הקו הניאון) מגיע כולו מ־`assets/style.css` המשותף — לא צריך לגעת בו מדי שבוע.
