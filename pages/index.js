import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ip, setIp] = useState('');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  // CHANGE THIS URL TO CHANGE THE SONG ANYTIME
  const MUSIC_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIp(data.ip))
      .catch(() => setIp('unknown'));
  }, []);

  const addDigit = (digit) => setNumber(number + digit);
  const deleteDigit = () => setNumber(number.slice(0, -1));
  
  const callNumber = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setMusicPlaying(false);
    }
    if (number) window.location.href = `tel:+1${number.replace(/\D/g,'')}`;
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play();
      setMusicPlaying(true);
    }
  };

  const handleLead = async (e) => {
  e.preventDefault();
  if (email && phone) {
    const lead = {
      email, 
      phone, 
      timestamp: new Date().toISOString(),
      ip_address: ip, 
      source: 'carib-connect.vercel.app', 
      consent: true
    };
    
    await fetch('https://formspree.io/f/meenrvop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    });
    
    setSubmitted(true);
  }
};

  const Button = ({ children, onClick, style = {} }) => (
    <button onClick={onClick} style={{
      background:'#1a1a1a', border:'2px solid #333', color:'#fff',
      fontSize:'28px', fontWeight:'700', height:'70px', borderRadius:'16px',
      cursor:'pointer', ...style
    }}>{children}</button>
  );

  return (
    <main style={{
      background:'#000', minHeight:'100vh', color:'#fff', fontFamily:'system-ui',
      display:'flex', alignItems:'center', justifyContent:'center', padding:'20px'
    }}>
      <audio ref={audioRef} src={MUSIC_URL} loop />

      <div style={{maxWidth:'360px', width:'100%', textAlign:'center'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px'}}>
          <h1 style={{color:'#FED100', fontSize:'40px', margin:0, fontWeight:'900'}}>
            CARIB CONNECT 🇯🇲
          </h1>
          <button onClick={toggleMusic} style={{
            background:'none', border:'2px solid #FED100', color:'#FED100',
            borderRadius:'50%', width:'40px', height:'40px', fontSize:'18px', cursor:'pointer'
          }}>
            {musicPlaying ? '⏸️' : '▶️'}
          </button>
        </div>
        
        <p style={{fontSize:'18px', marginBottom:'16px', opacity:0.8}}>
          Call USA from Jamaica
        </p>

        {!submitted ? (
          <form onSubmit={handleLead} style={{
            background:'#111', border:'2px solid #25D366', borderRadius:'12px',
            padding:'16px', marginBottom:'20px'
          }}>
            <p style={{margin:'0 0 12px', fontSize:'16px', fontWeight:'700', color:'#25D366'}}>
              Call Any US Number - No WhatsApp Needed*
            </p>
            <input 
              type="email" placeholder="Your Email" value={email}
              onChange={(e) => setEmail(e.target.value)} required
              style={{width:'100%', padding:'12px', marginBottom:'8px', borderRadius:'8px',
                border:'1px solid #333', background:'#000', color:'#fff', fontSize:'16px'}}
            />
            <input 
              type="tel" placeholder="Your JA Phone: 876..." value={phone}
              onChange={(e) => setPhone(e.target.value)} required
              style={{width:'100%', padding:'12px', marginBottom:'12px', borderRadius:'8px',
                border:'1px solid #333', background:'#000', color:'#fff', fontSize:'16px'}}
            />
            <button type="submit" style={{
              width:'100%', background:'#FED100', color:'#000', fontWeight:'900',
              padding:'14px', borderRadius:'8px', border:'none', fontSize:'16px', cursor:'pointer'
            }}>
              GET ACCESS
            </button>
            <p style={{fontSize:'10px', opacity:0.6, margin:'8px 0 0', lineHeight:'1.3'}}>
              *By submitting, you agree to be contacted by Carib Connect and select partners regarding calling services. 
              Access subject to availability. Msg & data rates may apply.
            </p>
          </form>
        ) : (
          <div style={{
            background:'#111', border:'2px solid #FED100', borderRadius:'12px',
            padding:'16px', marginBottom:'20px', color:'#FED100'
          }}>
            <p style={{margin:0, fontWeight:'700'}}>Success! Use the dialer below to call the US now.</p>
          </div>
        )}

        <div style={{
          background:'#111', border:'2px solid #FED100', borderRadius:'12px',
          padding:'16px', fontSize:'32px', fontWeight:'700', marginBottom:'20px',
          minHeight:'70px', display:'flex', alignItems:'center', justifyContent:'center', color:'#FED100'
        }}>
          +1 {number}
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'12px', marginBottom:'12px'}}>
          {['1','2','3','4','5','6','7','8','9','*','0','#'].map(d => (
            <Button key={d} onClick={() => addDigit(d)}>{d}</Button>
          ))}
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
          <Button onClick={deleteDigit} style={{background:'#333', fontSize:'18px'}}>DELETE</Button>
          <Button onClick={callNumber} style={{background:'#FED100', color:'#000', fontSize:'18px', fontWeight:'900'}}>
            JET CALL
          </Button>
        </div>

        <p style={{fontSize:'10px', opacity:0.4, marginTop:'20px'}}>
          © 2026 Carib Connect. Calls use your carrier minutes. 
          <a href="/privacy" style={{color:'#FED100', textDecoration:'none'}}> Privacy</a> | 
          <a href="/terms" style={{color:'#FED100', textDecoration:'none'}}> Terms</a>
        </p>
      </div>
    </main>
  )
}
