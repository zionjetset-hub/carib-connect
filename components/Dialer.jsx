import { useState, useEffect } from 'react';
import { Device } from '@twilio/voice-sdk';

export default function Dialer() {
  const [number, setNumber] = useState('');
  const [calling, setCalling] = useState(false);
  const [device, setDevice] = useState(null);

  const keypad = ['1','2','3','4','5','6','7','8','9','*','0','#'];

  useEffect(() => {
    setupDevice();
  }, []);

  async function setupDevice() {
    const res = await fetch('/api/voice/token');
    const { token } = await res.json();
    const dev = new Device(token, { codecPreferences: ['opus', 'pcmu'] });
    dev.on('ready', () => console.log('Twilio ready'));
    setDevice(dev);
  }

  async function makeCall() {
    if (!number) return;
    setCalling(true);
    const call = await device.connect({ params: { To: `+1${number}` } });
    call.on('disconnect', () => setCalling(false));
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#FED100]">Carib Connect</h1>
          <p className="text-white/60">Call USA Unlimited - $15/mo</p>
        </div>

        <input 
          value={number}
          readOnly
          className="w-full text-4xl text-center bg-black text-white mb-6 outline-none tracking-widest"
          placeholder="876 123 4567"
        />

        <div className="grid grid-cols-3 gap-4 mb-6">
          {keypad.map((key) => (
            <button
              key={key}
              onClick={() => setNumber(number + key)}
              className="h-20 rounded-full bg-zinc-800 text-white text-3xl font-light active:bg-[#FED100] active:text-black transition"
            >
              {key}
            </button>
          ))}
        </div>

        <button
          onClick={makeCall}
          disabled={number.length < 10 || calling}
          className="w-full h-16 rounded-full bg-[#FED100] text-black text-xl font-bold disabled:opacity-30"
        >
          {calling ? 'Calling...' : 'Call'}
        </button>

        {number && (
          <button 
            onClick={() => setNumber(number.slice(0,-1))}
            className="w-full text-white/60 mt-4"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}