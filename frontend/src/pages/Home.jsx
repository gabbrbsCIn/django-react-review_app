import { useContext, useEffect, useState } from 'react';
import { LoaderIcon } from 'lucide-react';

import UserContext from '../contexts/userContext';

import Card from '../components/Card';
import ButtonCard from '../components/ButtonCard';
import MainLayout from '../components/MainLayout';
import api from '../services/api';



function Home() {
  const { user } = useContext(UserContext);
  const [lastQuiz, setlastQuiz] = useState(null);
  const [loading, setLoading] = useState(true); // Variável de estado para controlar o carregamento

  if (!user) {
    return <div className='p-36'><LoaderIcon /></div>;
  }

  const title = 'Olá, ' + user.username + '!';


  useEffect(() => {
    api.get('last-quiz-result')
      .then(response => {
        setlastQuiz(response.data);
        setLoading(false); // Atualiza a variável de estado para indicar que o carregamento foi concluído
        console.log(response.data)
      })
      .catch(error => {
        console.error("Não foi possível carregar o último resultado do quiz", error);
        setLoading(false); // Atualiza a variável de estado mesmo em caso de erro
      });
  }, []);

  return (

    <MainLayout title={title}>

      <div className="ml-36">
        {loading ? ( // Renderiza o LoaderIcon enquanto o carregamento estiver em andamento
          <div className='p-36'><LoaderIcon /></div>
        ) : (
          lastQuiz ? (
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Último Resultado do Quiz</h2>
              <p>Quiz: {lastQuiz.title}</p>
              {lastQuiz.last_result ? (
                <>
                  <p>Pontuação: {lastQuiz.last_result.score}</p>
                  <p>Data: {new Date(lastQuiz.last_result.date_taken).toLocaleString()}</p>
                </>
              ) : (
                <p>Você ainda não respondeu este quiz.</p>
              )}
            </div>
          ) : (
            <p>Você ainda não respondeu nenhum quiz.</p>
          )
        )}
      </div>

    </MainLayout>
  )
}

export default Home;
