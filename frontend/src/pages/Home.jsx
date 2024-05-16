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

      <div className='flex flex-wrap ml-36'>
        <Card text={"Fichamento de Matemática"}>
          <ButtonCard type={"abrir"} />
        </Card>
        <Card text={"Fichamento de Matemática"}>
          <ButtonCard type={"abrir"} />
        </Card>
      </div>

    </MainLayout>
  )
}

export default Home;
