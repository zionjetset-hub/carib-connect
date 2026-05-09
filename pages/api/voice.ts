import type { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const VoiceResponse = twilio.twiml.VoiceResponse
  const response = new VoiceResponse()
  
  const to = req.body.To || req.query.To
  
  if (to) {
    const dial = response.dial({ callerId: process.env.TWILIO_PHONE_NUMBER })
    dial.number(to)
  } else {
    response.say('Thanks for calling Carib Connect')
  }
  
  res.setHeader('Content-Type', 'text/xml')
  res.status(200).send(response.toString())
}