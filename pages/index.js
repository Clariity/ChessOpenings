import { HomeContribute } from '../components/home/HomeContribute';
import { HomeLearn } from '../components/home/HomeLearn';
import { HomeSocial } from '../components/home/HomeSocial';
import { HomeSupport } from '../components/home/HomeSupport';
import { HomeTitle } from '../components/home/HomeTitle';
import { HomeTrain } from '../components/home/HomeTrain';
import { HomeTraps } from '../components/home/HomeTraps';
import { SEO } from '../components/utils/SEO';

export default function Index() {
  return (
    <div className="flex flex-col container pb-6">
      <SEO
        description="The free, community driven Chess site for learning and training Chess openings. Use interactive boards to practise Chess openings and test your knowledge by trying the openings with no visual aids. Learn common Chess traps and tactics and contribute your own repertoires for others to learn from."
        title="home"
        path="/"
      />

      <HomeTitle />
      <HomeLearn />
      <HomeSupport />
      <HomeTrain />
      <HomeTraps />
      <HomeSocial />
      <HomeContribute />
    </div>
  );
}
