import { useState } from 'react';

export default function Home() {
  const [number, setNumber] = useState('');

  const addDigit = (digit) => {
    setNumber(number + digit);
  };

  const deleteDigit = () => {
    setNumber(number.slice(0, -1));
  };

  const callNumber = () => {
    if (number) {
      window.location.href = `https://wa.me/${number.replace(/\D/g,'')}`;
    }
  };

  const Button = ({ children, onClick, style = {} }) => (
    <button onClick={onClick} style={{
      background:'#1a1a1a',
      border:'2px solid #333',
      color:'#fff',
      fontSize:'28px',
      fontWeight:'700',
      height:'70px',
      borderRadius:'16px',
      cursor:'pointer',
      ...style
    }}>
      {children}
    </button>
  );

  return (
    <main style={{
      background:'#000', 
      minHeight:'100vh', 
      color:'#fff', 
      fontFamily:'system-ui',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      padding:'20px'
    }}>
      <div style={{maxWidth:'360px', width:'100%', textAlign:'center'}}>
        <h1 style={{color:'#FED100', fontSize:'48px', margin:'0 0 8px', fontWeight:'900'}}>
          CARIB CONNECT 🇯🇲
        </h1>
        <p style={{fontSize:'18px', marginBottom:'24px', opacity:0.8}}>
          Jamaica Gold Launch
        </p>

        <div style={{
          background:'#111',
          border:'2px solid #FED100',
          borderRadius:'12px',
          padding:'16px',
          fontSize:'32px',
          fontWeight:'700',
          marginBottom:'20px',
          minHeight:'70px',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          color:'#25D366'
        }}>
          {number || '+1'}
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'12px', marginBottom:'12px'}}>
          {['1','2','3','4','5','6','7','8','9','*','0','#'].map(d => (
            <Button key={d} onClick={() => addDigit(d)}>{d}</Button>
          ))}
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
          <Button onClick={deleteDigit} style={{background:'#333', fontSize:'18px'}}>
            DELETE
          </Button>
          <Button onClick={callNumber} style={{background:'#25D366', color:'#000', fontSize:'18px'}}>
            WHATSAPP
          </Button>
        </div>
      </div>
    </main>
  )
}
