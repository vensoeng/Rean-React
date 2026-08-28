
// import React from 'react';
import { useTranslation } from 'react-i18next';
// import { NavLink } from 'react-router-dom';
import { API_URL} from '../../utils/auth';
import '../../assets/css/footer.css';
// import imgFoot from '../../assets/img/footer_website.webp';
export default function Footer()
{
    const { t , i18n } = useTranslation();

    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };
    
    return (
    <footer className="footer-container">
      {/* <div className='footc-top'>
        <img 
          className='img-c'
          src={imgFoot}
          alt='images footer'
          loading='lazy'
        />
      </div> */}
      {/* 2. Main Footer Links Section */}
      <div className="wft09-box">
        <div className="footer-links-grid">
          {/* Newsletter Column */}
          <div className="footer-column newsletter-col">
            <h3>{t('footer.purpose.title')}</h3>
            <p>
            {t('footer.purpose.desc')}
            </p>
            <a href="http://facebook.com/vensoeng" className="newsletter-btn">{t('homePage.hero.contact')}</a>
          </div>

          {/* Help Column */}
          <div className="footer-column">
            <h3>{t('footer.menu')}</h3>
            <ul>
              <li><a href="/">{t('home')}</a></li>
              {/* <li><a href="/shopping">ហាងបងស្រី</a></li> */}
              <li><a href="/storys">{t('service')}</a></li>
              <li><a href="/storys">{t('pricing')}</a></li>
              <li><a href="/storys">{t('blog')}</a></li>
              <li><a href="/designs">{t('design')}</a></li>
            </ul>
          </div>

          {/* Explore Column */}
          <div className="footer-column">
            <h3>{t('footer.services')}</h3>
            <ul>
              <li><a href="/services?category=web">{t('footer.web')}</a></li>
              <li><a href="/services?category=design">{t('footer.design')}</a></li>
              {/* <li><a href="/services?category=video">Video editing</a></li> */}
              {/* <li><a href="/services?category=photo">Photographer</a></li> */}
            </ul>
          </div>

          {/* Other Possibilities & App Badges Column */}
          <div className="footer-column apps-col">
            <h3>{t('footer.responsibility')}</h3>
            <ul>
              <li><a href="/about">{t('aboutUs')}</a></li>
              <li><a href="https://t.me/vensoeng">{t('footer.support')}</a></li>
            </ul>
            
            <div className="app-badges">
              <a href="https://facebook.com/vensoeng" className="app-badge">
                <img src={API_URL + '/storage/data/url/1787909952206.webp'} alt="Get it on Facebook page." />
              </a>
              <a href="https://facebook.com/vensoeng" className="app-badge">
                <img src={API_URL + '/storage/data/url/1787910092758.webp'}  alt="Get it on Facebook Telegram." />
              </a>
            </div>

          </div>
        </div>
      </div>
      <hr className="footer-divider" />
      {/* 3. Bottom Legal & Socials Section */}
      <div className="footer-bottom">
        <p className="copyright">© 2024 VenSoeng</p>
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
          <span className='slac05'></span>
          <button 
            onClick={() => changeLanguage('kh')}
            className={i18n.language === 'kh' ? 'active-lang btn btnlng' : 'btn btnlng'}
          >
           {t('khmer')}
          </button>
          <button 
            onClick={() => changeLanguage('en')}
            className={i18n.language === 'en' ? 'active-lang btn btnlng' : 'btn btnlng'}
          >
            {t('english')}
          </button>
        </div>
      </div>
      
    </footer>
  );

}