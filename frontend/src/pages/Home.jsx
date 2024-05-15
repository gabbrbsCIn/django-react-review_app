import { useContext } from 'react';
import { LoaderIcon } from 'lucide-react';

import UserContext from '../contexts/userContext';

import Card from '../components/Card';
import ButtonCard from '../components/ButtonCard';

function Home() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <div className='p-36'><LoaderIcon /></div>;
  }

  return (
    <div className='flex flex-col'>
      <div className='flex px-36 pt-20 text-2xl'>
        <h1 className='py-5 font-semibold mr-5'>Olá, {user.username}!</h1>
      </div>
      <div className='flex flex-row flex-wrap'>
        <Card text={"Fichamento de Matemática"}>
          <ButtonCard />
        </Card>
        <Card text={"Fichamento de Matemática"}>
          <ButtonCard />
        </Card>
      </div>
    </div>
  );
}

export default Home;
