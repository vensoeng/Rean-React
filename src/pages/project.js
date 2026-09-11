
import { Helmet } from 'react-helmet-async';
import ProjectsSuggestion from '../components/web/projects_sug';
import '../assets/css/story.css';

export default function ProjectPage()
{    

    return (
        <main>
            {/* update priview card share  */}
            <Helmet>
                <title>SOENG DigitalCore | Project </title>
                <meta name="description" content="ស្វែងរក និងអានព្រឹត្តិការណ៍ផ្សេងៗដែលមានការបង្កើតជាប្រចាំ!" />
                <meta property="og:title" content="VenSoeng - Business Blog" />
                <meta property="og:description" content="ស្វែងរក និងអានព្រឹត្តិការណ៍ផ្សេងៗដែលមានការបង្កើតជាប្រចាំ!" />
                <meta property="og:url" content="https://vensoeng.vercel.app/storys" />
            </Helmet>
            <ProjectsSuggestion all={true} />
        </main>
    );
}