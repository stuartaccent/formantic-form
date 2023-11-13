import { AppForm } from '@/components/appform';
import React from 'react';

export default function Home() {
  return (
    <div className="App">
      <AppForm maxWidth="sm"
               api="https://api.formantic.co.uk"
               token="kTEPiNI8ltd4GLYlBaIIJI8KJhNG-rDG-cy0G2J22IJqNRFreMGhJ9d32zuX_RhLWXBa5kqRMs4IgtIzAJKnMQ"/>
    </div>
  )
};
