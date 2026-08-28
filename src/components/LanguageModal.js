import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageModal() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasChosen = localStorage.getItem('hasChosenLanguage');
    if (!hasChosen) {
      setIsOpen(true);
    }
  }, []);

  const currentLang = i18n.resolvedLanguage || i18n.language;

  const selectLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('hasChosenLanguage', 'true');
    setIsOpen(false);
  };

  const handleCloseModal = () => {
    const targetLang = currentLang === 'en' ? 'en' : 'kh';
    
    i18n.changeLanguage(targetLang);
    localStorage.setItem('hasChosenLanguage', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="m08-modal-overlay">
      <div className="m08-modal-card btn-style">
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
          {/* Khmer */}
          <label 
            className={currentLang === 'kh' ? 'm08-option-card active' : 'm08-option-card'} 
            onClick={() => selectLanguage('kh')} 
          >
            <div className="m08-flag-wrapper">
              <img className="m08-flag-icon" src="https://flagcdn.com/w40/kh.png" alt='cambodia flag' loading="lazy" />
            </div>
            <div className="m08-details">
              <span className="m08-title">{t('khmer')}</span>
              <span className="m08-subtitle">Khmer</span>
            </div>
            <span className="m08-radio-custom"></span>
          </label>

          {/* English */}
          <label 
            className={currentLang === 'en' ? 'm08-option-card active' : 'm08-option-card'}
            onClick={() => selectLanguage('en')}
          >
            <div className="m08-flag-wrapper">
              <img className="m08-flag-icon" src="https://flagcdn.com/w40/gb.png" alt='English flag' loading="lazy" />
            </div>
            <div className="m08-details">
              <span className="m08-title">{t('english')}</span>
              <span className="m08-subtitle">English</span>
            </div>
            <span className="m08-radio-custom"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default LanguageModal;