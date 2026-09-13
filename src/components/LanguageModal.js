import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

function LanguageModal({ isOpenEl = false, onClose }) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const hasChosen = localStorage.getItem('hasChosenLanguage');
    if (!hasChosen && onClose) {
      onClose(true);
    }
  }, [onClose]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpenEl && onClose) {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpenEl, onClose]);


  const currentLang = (i18n.resolvedLanguage || i18n.language || '').substring(0, 2);

  const selectLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('hasChosenLanguage', 'true');
    if (onClose) onClose(false);
  };

  const handleCloseModal = () => {
    localStorage.setItem('hasChosenLanguage', 'true');
    if (onClose) onClose(false);
  };

  if (!isOpenEl) return null;

  return ReactDOM.createPortal(
    <div className="m08-modal-overlay" onClick={handleCloseModal}>

      <div 
        className="m08-modal-card btn-style" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="m08-modal-header">
          <h2 data-i18n="selectLang">{t('selectLang')}</h2>
          
          <button 
            className="m08-close-btn" 
            aria-label="Close"
            onClick={handleCloseModal} 
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>

        <div className="m08-language-options">
          {/* Khmer Option */}
          <label 
            className={`m08-option-card ${currentLang === 'kh' ? 'active' : ''}`} 
            onClick={() => selectLanguage('kh')} 
          >
            <div className="m08-flag-wrapper">
              <img 
                className="m08-flag-icon" 
                src="https://flagcdn.com/w40/kh.png" 
                alt="Cambodia flag" 
                loading="lazy" 
              />
            </div>
            <div className="m08-details">
              <span className="m08-title">{t('khmer')}</span>
              <span className="m08-subtitle">Khmer</span>
            </div>
            <span className="m08-radio-custom"></span>
          </label>

          {/* English Option */}
          <label 
            className={`m08-option-card ${currentLang === 'en' ? 'active' : ''}`}
            onClick={() => selectLanguage('en')}
          >
            <div className="m08-flag-wrapper">
              <img 
                className="m08-flag-icon" 
                src="https://flagcdn.com/w40/gb.png" 
                alt="English flag" 
                loading="lazy" 
              />
            </div>
            <div className="m08-details">
              <span className="m08-title">{t('english')}</span>
              <span className="m08-subtitle">English</span>
            </div>
            <span className="m08-radio-custom"></span>
          </label>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default LanguageModal;