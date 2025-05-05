import './globals.css';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="page">
      <Image src="/cofre.png" alt="icone" width={50} height={50} />
      <div className="linha-caixas">
        <div className="entradas">
          <p className='paragrafoheaderA'>Entradas</p>
          <strong>R$ 1200</strong>
          <p className='paragrafoheaderB'>Somada todas entradas do período</p>
        </div>
        <div className="saidas">
          <p className='paragrafoheaderA'>Saídas</p>
          <strong>R$ 800</strong>
          <p className='paragrafoheaderB'>Somada todas saídas do período</p>
        </div>
        <div className="balanco">
          <p className='paragrafoheaderA'>Balanço</p>
          <strong>R$ 400</strong>
          <p className='paragrafoheaderB'>Somada todas as entradas e saídas do período</p>
        </div>
      </div>
      <div className="container">
        <div className="bloco">
          <p className="titulos">Análise</p>
          <div className="analise">...</div>
        </div>

        <div className="bloco-categoria">
          <p className="titulos">Categorias</p>
          <div className="categorias">...</div>
        </div>
      </div>
    
    </div>
  );
}
