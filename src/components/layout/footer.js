
import React from 'react';
// import { NavLink } from 'react-router-dom';

import '../../assets/css/footer.css';
import imgFoot from '../../assets/img/footer_website.webp';
export default function Footer()
{
    // return(
    //     <footer className="web-footer">
    //         <div className="footer-box df-s">
    //             <blockquote>
    //                 <p>
    //                     ចាប់ផ្ដើមតាមដានខ្ញុំនៅលើបណ្ដាញសង្គម<br/>
    //                     តោះពេលនេះ !                </p>
    //             </blockquote>
    //             <div className="button">
    //                 <a href="https://vensoeng.free.nf/about/linkme.html" className="btn icon icon-ra">ចាប់ផ្ដើមពេលនេះ !</a>
    //                 <p>© Copyright soeng</p>
    //             </div>
    //         </div>
    //     </footer>
    // );
    return (
    <footer className="footer-container">
      <div className='footc-top'>
        <img 
          className='img-c'
          src={imgFoot}
          alt='images footer'
          loading='lazy'
        />
      </div>
      {/* 2. Main Footer Links Section */}
      <div className="footer-links-grid">
        {/* Newsletter Column */}
        <div className="footer-column newsletter-col">
          <h3>គោលបំណងគេហទំព័រ</h3>
          <p>
            បង្កើតដំណោះស្រាយប្រកបដោយភាពច្នៃប្រឌិត និងមានប្រសិទ្ធភាព គេហទំព័រនិងទូរស័ព្ទ។ រកសេវាកម្មល្អៗបាននៅទីនេះ! រាល់ការគាំទ្ររបស់បងៗ គឺជាកម្លាំងចិត្តឱ្យ ខ្ញុំបន្តស្វែងរកអ្វីដែលថ្មី និងឥតគិតថ្លៃមកចែករំលែកបន្តទៀត។
          </p>
          <a href="mailto:vensoeng.edu.kh@gmail.com" className="newsletter-btn">ទំនាក់ទំនង</a>
        </div>

        {/* Help Column */}
        <div className="footer-column">
          <h3>មុីនូផ្សេងៗ</h3>
          <ul>
            <li><a href="/">ទំព័រដើម</a></li>
            <li><a href="/shopping">ហាងបងស្រី</a></li>
            <li><a href="/storys">ព្រឹត្តិការណ៍</a></li>
            <li><a href="/designs">ការរចនា</a></li>
            <li><a href="/contents">មាតិការ</a></li>
          </ul>
        </div>

        {/* Explore Column */}
        <div className="footer-column">
          <h3>ជម្រើសសេវាកម្ម</h3>
          <ul>
            <li><a href="/services?category=web">Building website</a></li>
            <li><a href="/services?category=design">Desings</a></li>
            {/* <li><a href="/services?category=video">Video editing</a></li> */}
            {/* <li><a href="/services?category=photo">Photographer</a></li> */}
          </ul>
        </div>

        {/* Other Possibilities & App Badges Column */}
        <div className="footer-column apps-col">
          <h3>ទំនួលខុសត្រូវ</h3>
          <ul>
            <li><a href="/about">អំពីយើង</a></li>
            <li><a href="/questions">ជំនួយ</a></li>
          </ul>
          
          <div className="app-badges">
            {/* Replace '#' with actual store links */}
            {/* <a href="#" className="app-badge">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" />
            </a>
            <a href="#" className="app-badge">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" />
            </a> */}
          </div>
        </div>
      </div>

      <hr className="footer-divider" />

      {/* 3. Bottom Legal & Socials Section */}
      <div className="footer-bottom">
        <p className="copyright">© 2026 VenSoeng</p>
        <div className="social-icons">
          {/* github */}
          <a href="https://github.com/vensoeng" aria-label="github">
            <svg width="1em" height="1em" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
            </svg>
          </a>
          {/* linkin */}
          <a href="https://www.linkedin.com/in/vensoeng" aria-label="linkedin">
            <svg width="1em" height="1em" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
            </svg>
          </a>
          {/* telegram */}
          <a href="https://t.me/vensoeng" aria-label="Telegram">
            <svg width="1em" height="1em" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19c-.14.75-.42 1-.68 1.03c-.58.05-1.02-.38-1.58-.75c-.88-.58-1.38-.94-2.23-1.5c-.99-.65-.35-1.01.22-1.59c.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02c-.09.02-1.49.95-4.22 2.79c-.4.27-.76.41-1.08.4c-.36-.01-1.04-.2-1.55-.37c-.63-.2-1.12-.31-1.08-.66c.02-.18.27-.36.74-.55c2.92-1.27 4.86-2.11 5.83-2.51c2.78-1.16 3.35-1.36 3.73-1.36c.08 0 .27.02.39.12c.1.08.13.19.14.27c-.01.06.01.24 0 .38" />
            </svg>
          </a>
          {/* facebook */}
          {/* <a href="http://facebook.com/vensoeng" aria-label="facebook">
            <svg width="1em" height="1em" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95" />
            </svg>
          </a> */}
          {/* mail */}
          <a href="mailto:vensoeng.edu.kh@gmail.com" aria-label="email">
            <svg width="1em" height="1em" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path fill="currentColor" d="M18 3a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-2.586l-2.707 2.707a1 1 0 0 1-1.32.083l-.094-.083L8.585 19H6a4 4 0 0 1-3.995-3.8L2 15V7a4 4 0 0 1 4-4zm-4 9H8a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2m2-4H8a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );

}