import { NavLink } from 'react-router-dom';
import '../../assets/css/header.css';
import favIcon from '../../assets/img/logo192.png';
import { Flash, HamburgerMenu, Add } from 'iconsax-reactjs';
import Pageon from '../common/page';
import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

const ListRoute = ({ onItemClick }) => {
    return(
        <div className="link-box">
            <ul className="df-s">
                <li className='df-c'><NavLink onClick={onItemClick} className={({ isActive }) => isActive ? "df-c active" : "df-c"} to="/">ទំព័រដើម</NavLink></li>
                <li className='df-c'><NavLink onClick={onItemClick} className={({ isActive }) => isActive ? "df-c active" : "df-c"} to="/storys">ព្រឹត្តិការណ៍</NavLink></li>
                <li className='df-c'><NavLink onClick={onItemClick} className={({ isActive }) => isActive ? "df-c active" : "df-c"} to="/designs">ការរចនា</NavLink></li>
                <li className='df-c'><NavLink onClick={onItemClick} className={({ isActive }) => isActive ? "df-c active" : "df-c"} to="/creator">មាតិការ</NavLink></li>
                <li className='df-c'><NavLink onClick={onItemClick} className={({ isActive }) => isActive ? "df-c active" : "df-c"} to="/lession">មេរៀន</NavLink></li>
                <li className='df-c'><NavLink onClick={onItemClick} className={({ isActive }) => isActive ? "df-c active" : "df-c"} to="/about">អំពីខ្ញុំ</NavLink></li>
            </ul>
        </div>
    )
}

export default function Header()
{
    const [loadAside, setLoadAside] = useState(false);
    const handleClose = () => setLoadAside(false);
    
    return(
        <>
        <Pageon />
        <header className="webhead">
            <div className="wh-box df-s scroll-x">
                <NavLink to="/" className="logo icon icon-ra icon-sm" onClick={handleClose}>
                    <img className='img-c' src={favIcon} alt=''/>
                </NavLink>
                
                {/* Desktop Menu: No action required on click */}
                <ListRoute />
                
                {/* Main Button layout row */}
                <div className="btn-main df-r">
                    <NavLink to="/services" className="btn" onClick={handleClose}>
                        <p>សេវាកម្ម</p>
                        <div className="icon icon-ra icon-sm ip">
                            <Flash/>
                        </div>
                    </NavLink>
                    <button className="btn" type='button' onClick={() => setLoadAside(prev => !prev)}>
                        <div className="icon icon-ra icon-sm ip">
                           {loadAside ? <Add style={{ transform: 'rotate(45deg)' }} /> : <HamburgerMenu />}
                        </div>
                    </button>
                </div>
            </div>
        </header>

        {/* Sidebar Panel Drawer */}
        <AnimatePresence>
            {loadAside && (
                <aside className="web-main-aside web-main-aside-active">
                    {/* Animated Dim Dark Background Overlay */}
                    <motion.div 
                        className='web-main-aside-overlay' 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                    />
                    {/* Draggable Drawer Panel Container */}
                    <motion.div 
                        className='webmas-con'
                        initial={{ y: "100%" }}         
                        animate={{ y: 0 }}            
                        exit={{ y: "100%" }}            
                        transition={{ type: "spring", damping: 25, stiffness: 220 }}
                        drag="y"                       
                        dragConstraints={{ top: 0, bottom: 0 }} 
                        dragElastic={{ top: 0.05, bottom: 0.75 }} 
                        
                        onDragEnd={(event, info) => {
                            if (info.offset.y > 150 || info.velocity.y > 600) {
                                handleClose();
                            }
                        }}
                    >
                        <div className="webmas-drag-handle" />

                        <div className='weasc-box scroll-y'>
                            <ListRoute onItemClick={handleClose} />
                        </div>

                    </motion.div>
                </aside>
            )}
        </AnimatePresence>
        </>
    );
}