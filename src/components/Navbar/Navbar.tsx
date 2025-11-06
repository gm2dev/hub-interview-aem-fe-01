import React, { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.scss';

interface NavItem {
  id: string;
  label: string;
  options: string[];
}

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const navItems: NavItem[] = [
    {
      id: '1',
      label: 'Inspiration',
      options: ['Inspiration 1', 'Inspiration 2', 'Inspiration 3'],
    },
    {
      id: '2',
      label: 'Find Work',
      options: ['Find Work 1', 'Find Work 2', 'Find Work 3'],
    },
    {
      id: '3',
      label: 'Learn Design',
      options: ['Learn Design 1', 'Learn Design 2', 'Learn Design 3'],
    },
    {
      id: '4',
      label: 'Marketplace',
      options: ['Marketplace 1', 'Marketplace 2', 'Marketplace 3'],
    },
    {
      id: '5',
      label: 'Resource',
      options: ['Resource 1', 'Resource 2', 'Resource 3'],
    },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.classList.toggle(styles.noScroll, mobileMenuOpen);

    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [mobileMenuOpen]);

  // Detect mobile viewport for logo switching
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1400);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsVisible(!(currentScrollY > lastScrollY && currentScrollY > 100));
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close dropdowns/menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }

      if (openDropdown) {
        const dropdownElement = dropdownRefs.current[openDropdown];
        if (
          dropdownElement &&
          !dropdownElement.contains(event.target as Node)
        ) {
          const clickedButton = (event.target as HTMLElement).closest(
            `.${styles.navbar__navButton}`
          );
          if (!clickedButton) {
            setOpenDropdown(null);
          }
        }
      }
    };

    if (mobileMenuOpen || openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen, openDropdown]);

  return (
    <nav
      ref={navbarRef}
      className={`${styles.navbar} ${isVisible ? styles.navbarVisible : styles.navbarHidden}`}
    >
      <div className={styles.navbar__container}>
        <div className={styles.navbar__logo}>
          <img
            src={isMobile ? '/logo-mobile.svg' : '/logo.svg'}
            alt='Logo'
          />
        </div>

        <button
          className={styles.navbar__hamburger}
          onClick={toggleMobileMenu}
          aria-label='Toggle menu'
        >
          <span className={styles.navbar__hamburgerLine}></span>
          <span className={styles.navbar__hamburgerLine}></span>
          <span className={styles.navbar__hamburgerLine}></span>
        </button>

        <div
          className={`${styles.navbar__content} ${mobileMenuOpen ? styles.navbar__contentActive : ''}`}
        >
          <div className={styles.navbar__navList}>
            {navItems.map((item) => (
              <div
                key={item.id}
                className={styles.navbar__navItem}
                ref={(el) => {
                  dropdownRefs.current[item.id] = el;
                }}
              >
                <button
                  className={styles.navbar__navButton}
                  onClick={() => toggleDropdown(item.id)}
                >
                  {item.label}
                  <img
                    src='/icons/chevron.svg'
                    alt=''
                    className={`${styles.navbar__dropdownArrow} ${openDropdown === item.id ? styles.navbar__dropdownArrowOpen : ''}`}
                  />
                </button>
                {openDropdown === item.id && (
                  <div className={styles.navbar__dropdown}>
                    {item.options.map((option, index) => (
                      <a
                        key={index}
                        href='#'
                        className={styles.navbar__dropdownItem}
                      >
                        {option}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.navbar__actions}>
            <div className={styles.navbar__search}>
              <img
                src='/icons/magnifier.svg'
                alt='Search'
                className={styles.navbar__searchIcon}
              />
              <input
                type='text'
                placeholder='Search'
                className={styles.navbar__searchInput}
              />
            </div>
            <div className={styles.navbar__avatar}>
              <img
                src='/avatar.svg'
                alt='User avatar'
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
