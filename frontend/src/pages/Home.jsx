import { useContext } from 'react';
import { LoaderIcon } from 'lucide-react';

import UserContext from '../contexts/userContext';

import Card from '../components/Card';
import ButtonCard from '../components/ButtonCard';
import MainLayout from '../components/MainLayout';



function Home() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <div className='p-36'><LoaderIcon /></div>;
  }

  const title = 'Olá, ' + user.username + '!';

  return (
    
    <MainLayout title={title}>
      <Card text={"Fichamento de Matemática"}>
        <ButtonCard />
      </Card>
      <Card text={"Fichamento de Matemática"}>
        <ButtonCard />
      </Card>
    </MainLayout>
  )
}

export default Home;
