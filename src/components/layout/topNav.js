import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageModal from '../LanguageModal';

export default function TopNav() {
  const [openLang, setOpenLang] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLangModal = () => {
    setOpenLang((prev) => !prev);
  };

  const currentLang = (i18n.resolvedLanguage || i18n.language || '').substring(0, 2);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      left: '0',
    })
  }

  return (
    <>
    <div className="wbth">
      <LanguageModal 
        isOpenEl={openLang} 
        onClose={(desiredState = false) => setOpenLang(desiredState)} 
      />

      <div className="wbth-bx df-s">
        <a href="http://m.me/105919675870254" className="wbtrw btn btn-customer">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="48" height="48" fill="white" fill-opacity="0.01"></rect> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.60917 36.9866C5.3218 33.3783 3.32191 28.6146 3.32191 23.3914C3.32191 12.1271 12.6184 2.99568 24.0861 2.99568C35.5539 2.99568 44.8504 12.1271 44.8504 23.3914C44.8504 31.3561 40.2009 38.2516 33.4239 41.6092C29.2775 43.771 24.5472 44.9957 19.5258 44.9957C13.3731 44.9957 7.65739 43.157 2.91748 40.0088C2.91748 40.0088 6.09606 39.6621 8.60835 36.9874L8.60917 36.9866ZM33.8397 33.4855C39.2117 28.1137 39.2117 19.4042 33.8397 14.0322C31.3487 11.5414 28.1401 10.2063 24.8794 10.0256V10.0248C24.781 7.57835 26.0979 5.92616 26.1043 5.91811L26.1036 5.91824L26.1045 5.9171C22.3569 6.64104 18.7783 8.45409 15.8764 11.356C13.6509 13.5814 12.0663 16.205 11.1216 18.9972C11.2591 18.6329 11.4124 18.2733 11.5814 17.9193C11.3865 18.4167 11.2103 18.925 11.051 19.445C9.47775 24.2209 10.5882 29.6873 14.3864 33.4855C19.7584 38.8575 28.4679 38.8575 33.8397 33.4855Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1299 22.345V24.0539V25.1922C17.1299 26.3283 18.0509 27.2494 19.1872 27.2494C20.3234 27.2494 21.2443 26.3283 21.2443 25.1922V24.0522V22.345C21.2443 21.2089 20.3234 20.2877 19.1872 20.2877C18.0509 20.2877 17.1299 21.2089 17.1299 22.345Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M27.313 22.345V24.0539V25.1922C27.313 26.3283 28.2341 27.2494 29.3702 27.2494C30.5064 27.2494 31.4275 26.3283 31.4275 25.1922V24.0522V22.345C31.4275 21.2089 30.5064 20.2877 29.3702 20.2877C28.2341 20.2877 27.313 21.2089 27.313 22.345Z" fill="#000000"></path> </g></svg>
            <span>សេវ៉ាកម្មអតិថិជន</span>
        </a>

        <div className="wbtrw df-c">
          <a href="tel:0973194462" className="btn btn-ms">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.05 6C15.0268 6.19057 15.9244 6.66826 16.6281 7.37194C17.3318 8.07561 17.8095 8.97326 18 9.95M14.05 2C16.0793 2.22544 17.9716 3.13417 19.4163 4.57701C20.8609 6.01984 21.7721 7.91101 22 9.94M18.5 21C9.93959 21 3 14.0604 3 5.5C3 5.11378 3.01413 4.73086 3.04189 4.35173C3.07375 3.91662 3.08968 3.69907 3.2037 3.50103C3.29814 3.33701 3.4655 3.18146 3.63598 3.09925C3.84181 3 4.08188 3 4.56201 3H7.37932C7.78308 3 7.98496 3 8.15802 3.06645C8.31089 3.12515 8.44701 3.22049 8.55442 3.3441C8.67601 3.48403 8.745 3.67376 8.88299 4.05321L10.0491 7.26005C10.2096 7.70153 10.2899 7.92227 10.2763 8.1317C10.2643 8.31637 10.2012 8.49408 10.0942 8.64506C9.97286 8.81628 9.77145 8.93713 9.36863 9.17882L8 10C9.2019 12.6489 11.3501 14.7999 14 16L14.8212 14.6314C15.0629 14.2285 15.1837 14.0271 15.3549 13.9058C15.5059 13.7988 15.6836 13.7357 15.8683 13.7237C16.0777 13.7101 16.2985 13.7904 16.74 13.9509L19.9468 15.117C20.3262 15.255 20.516 15.324 20.6559 15.4456C20.7795 15.553 20.8749 15.6891 20.9335 15.842C21 16.015 21 16.2169 21 16.6207V19.438C21 19.9181 21 20.1582 20.9007 20.364C20.8185 20.5345 20.663 20.7019 20.499 20.7963C20.3009 20.9103 20.0834 20.9262 19.6483 20.9581C19.2691 20.9859 18.8862 21 18.5 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                <span>+855 0973194462</span>
          </a>
          <a href="https://t.me/vensoeng" className="btn btn-telegram">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z" fill="#0F0F0F"></path> </g></svg>
                <span>{t('telegram')}</span>
          </a>

          <div className="mlang df-c">
            <div className="btn btn-lang" onClick={toggleLangModal}>
              <div className="icon icon-ra icon-sm">
                <img
                  className="img-c"
                  src={currentLang === 'kh' ? 'https://flagcdn.com/w40/kh.png' : 'https://flagcdn.com/w40/gb.png'}
                  alt="language flag"
                />
              </div>
              <span>{currentLang === 'kh' ? t('khmer') : t('english')}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path d="M300.3 440.8C312.9 451 331.4 450.3 343.1 438.6L471.1 310.6C480.3 301.4 483 287.7 478 275.7C473 263.7 461.4 256 448.5 256L192.5 256C179.6 256 167.9 263.8 162.9 275.8C157.9 287.8 160.7 301.5 169.9 310.6L297.9 438.6L300.3 440.8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wb-main-action wb-show">
        <div class="wbma-box">
            <div onClick={scrollToTop} class="icon icon-ra icon-sm btn-action-wb-scroll-top" data-action="scroll-top">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path stroke="#FF8A65" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M18.07 9.57L12 3.5 5.93 9.57M12 20.5V3.67"></path></svg>
            </div>
            <a href='https://m.me/105919675870254' class="icon icon-ra icon-sm btn-action-customer-service" data-action="customer-service">
              <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0 15.521c0-8.922 6.984-15.521 16-15.521s16 6.599 16 15.521c0 8.917-6.984 15.521-16 15.521-1.615 0-3.172-0.214-4.625-0.615-0.286-0.078-0.589-0.052-0.854 0.068l-3.188 1.401c-0.833 0.37-1.776-0.224-1.802-1.135l-0.094-2.854c-0.010-0.349-0.167-0.672-0.422-0.906-3.245-2.927-5.073-7.109-5.016-11.479zM11.094 12.599l-4.693 7.469c-0.469 0.703 0.427 1.521 1.094 1l5.052-3.828c0.349-0.266 0.802-0.266 1.161 0l3.729 2.802c1.125 0.839 2.724 0.531 3.469-0.641l4.693-7.469c0.469-0.703-0.427-1.505-1.094-1l-5.052 3.828c-0.333 0.266-0.802 0.266-1.146 0l-3.734-2.802c-1.125-0.849-2.729-0.552-3.479 0.641z"></path> </g></svg>
            </a>
        </div>
    </div>
    </>
  );
}