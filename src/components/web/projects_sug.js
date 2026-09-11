
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
// import { NavLink } from 'react-router-dom';
import { API_URL } from '../../utils/auth';

import WebLoader from '../common/WebLoader';
import { ArrowRight } from 'iconsax-reactjs';
import ProjectCard from '../common/ProjectCard';

import '../../assets/css/project.css';

const fetchProjectsFromServer = async ({ all = false }) => {
    const res = await fetch(`${API_URL}/projects${all === false ? '?limit=4' : ''}`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const responseData = await res.json();
    return responseData.data;
};

export default function ProjectsSuggestion({all = false}) {
    const { data: projects = [], isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: () => fetchProjectsFromServer({ all }),
        staleTime: 5 * 60 * 1000,
    });

    const { t } = useTranslation();
    
    return (
        <div className="wpj02">
        <div className="wpj02-bx">
            {/* <!-- this is header  --> */}
            <div className="wpj02-h crop-style df-c">
                <span className="cpsl cp1"></span>
                <span className="cpsl cp2"></span>
                <span className="cpsl cp3"></span>
                <span className="cpsl cp4"></span>
                <div className="text">
                    <h2>{t('projectPage.hero.title')}</h2>
                    <p>{t('projectPage.hero.desc')}</p>
                </div>
            </div>

            {/* <!-- this is item  --> */}
            <div className="wpj02-im">
                {
                    isLoading ? (
                        <WebLoader>
                            {t('common.loading')}
                        </WebLoader>
                    ) : projects.length === 0 ? (
                        <li style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                            {t('homePage.services.loading')}...
                        </li>
                    ) : (
                        projects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                item={project}
                                index={index}
                            />
                        ))
                    )
                }
            </div>

            {/* <!-- this is action for see more item --> */}
            <div className="wpj02-action df-c">
                <a href={all === false ? '/projects' : '/'} className="btn btn-style">
                    {all === false ? t('projectPage.seeMore') : t('blogPage.homePage')}
                    <ArrowRight />
                </a>
            </div>
        </div>
    </div>
    )
}