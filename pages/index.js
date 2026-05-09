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
  const MUSIC_URL = 'https://raw.githubusercontent.com/zionjetset-hub/carib-connect/main/DA20%PROFESSOR-EVERY20%JAMAICAN-BOUNCE.mp3';

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

  const handleLead = (e) => {
    e.preventDefault();
    if (email && phone) {
      const lead = {
        email, phone, timestamp: new Date().toISOString(),
        ip_address: ip, source: 'carib-connect.vercel.app', consent: true
      };
      console.log('LEAD CAPTURED:', lead);
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
                border:'1
