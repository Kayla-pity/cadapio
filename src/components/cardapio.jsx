import { useState, useEffect } from 'react'
import styles from './Cardapio.module.css'


function Cardapio() {
  const [pratos, setPratos] = useState([])  
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=vegetarian')
      .then(response => response.json())
      .then(dados => {
        setPratos(dados.meals)
        setCarregando(false)
      })
      .catch(erro => {
        console.error('Deu ruim na busca', erro)
        setCarregando(false)
      })
  }, [])


  if (carregando) {
    return <h2 className={styles.loading}>Buscando os melhores pratos...</h2>
  }

  return (
    <div className={styles.container}>
      <h1>Cardápio de Frutos do Mar</h1>
      
      <div className={styles.grid}>
        {pratos.map(item => (
          <div key={item.idMeal} className={styles.card}>
            <img src={item.strMealThumb} alt={item.strMeal} />
            <h3>{item.strMeal}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cardapio