"use client";

import { useState,useEffect } from "react";
import Foto1 from "../../public/padre1.jpeg"
import Foto2 from "../../public/padre.jpg"
export default function Home(){
  const erguei_as_maos = {
    0.1:"Quem se lembra?",
    0.4:"Não ainda, né?",
    1.2:"Faz tempo, hein!",
    3.4:"Ninguém descobriu ainda?",
    5.4:"Opa! Esse descobriu",
    0.5:"Erguei as mãos e dai glória a Deus",
    0.5:"Erguei as mãos e dai glória a Deus",
    0.5:"Erguei as mãos",
    0.5:"E cantai como os filhos do Senhor",
    0.5:"Os animaizinhos subiram de dois em dois",
    0.5:"Os animaizinhos subiram de dois em dois",
    0.5:"O elefante",
    0.5:"E os passarinhos, como os filhos do Senhor",
    0.5:"(Para não!)",
    0.5:"Os animaizinhos subiram de dois em dois",
    0.3:"Os animaizinhos subiram de dois em dois",
    0.3:"A minhoquinha",
    0.3:"E os pinguins, como os filhos do Senhor",
    0.3:"Os animaizinhos subiram de dois em dois",
    0.3:"Os animaizinhos subiram de dois em dois",
    0.3:"O canguru",
    0.3:"E o sapinho, como os filhos do Senhor",
    0.3:"Deus disse a Noé: constrói uma arca",
    0.3:"Deus disse a Noé: constrói uma arca",
    0.3:"Que seja feita",
    0.3:"De madeira para os filhos do Senhor",
    0.3:"Por isso...!",
    0.3:"Erguei as mãos e dai glória a Deus",
    0.3:"Erguei as mãos e dai glória a Deus",
    0.3:"Erguei as mãos",
    0.3:"E cantai como os filhos do Senhor",
    0.3:"Erguei as mãos e dai glória a Deus",
    0.3:"Erguei as mãos e dai glória a Deus",
    0.3:"Erguei as mãos",
    0.3:"E cantai como os filhos do Senhor(De Novo)",
    0.3:"Erguei as mãos e dai glória a Deus",
    0.3:"Erguei as mãos e dai glória a Deus",
    0.3:"Erguei as mãos",
    0.3:"E cantai como os filhos do Senhor",
    0.3:"E atenção agora, porque...",
    0.3:"O senhor tem muitos filhos",
    0.3:"Todos filhos ele tem",
    0.3:"Eu sou um deles, você também",
    0.3:"Louvemos ao senhor (braço direito!)",
    0.3:"O senhor tem muitos filhos",
    0.3:"Muitos filhos ele tem",
    0.3:"Eu sou um deles, você também",
    0.3:"Louvemos ao senhor",
    0.3:"Braço direito, braço esquerdo",
    0.3:"O senhor tem muitos filhos",
    0.3:"Muitos filhos ele tem (Até que eu tô em forma)",
    0.3:"Eu sou um deles, você também",
    0.3:"Louvemos ao senhor",
    0.3:"Braço direito, braço esquerdo, ",
    0.3:"Perna direita",
    0.3:"Muitos filhos ele tem",
    0.3:"Eu sou um deles, você também",
    0.3:"Louvemos ao senhor",
    0.3:"Braço direito, braço esquerdo",
    0.3:"Perna direita, perna esquerda",
    0.3:"O senhor tem muitos filhos (muitos filhos)",
    0.3:"Muitos filhos ele tem",
    0.3:"Eu sou um deles, você também (Que saudade dessa música)",
    0.3:"Louvemos ao senhor",
    0.3:"Braço direito, braço esquerdo",
    0.3:"Perna direita, perna esquerda",
    0.3:"Balança a cabeça",
    0.3:"O senhor tem muitos filhos",
    0.3:"Muitos filhos ele tem",
    0.3:"Eu sou um deles, você também",
    0.3:"Louvemos ao senhor",
    0.3:"Braço direito, braço esquerdo",
    0.3:"Perna direita, perna esquerda",
    0.3:"Balança a cabeça, dá uma voltinha",
    0.3:"O senhor tem muitos filhos",
    0.3:"Muitos filhos ele tem(Bonita Cruz)",
    0.3:"Eu sou um deles, você também",
    0.3:"Louvemos ao senhor",
    0.3:"Braço direito, braço esquerdo",
    0.3:"Perna direita, perna esquerda",
    0.3:"Balança a cabeça, dá uma voltinha",
    0.3:"Dá um pulinho",
    0.3:"O senhor tem muitos filhos(Para não)",
    0.3:"Muitos filhos ele tem",
    0.3:"Eu sou um deles, você também",
    0.3:"Louvemos ao senhor",
    0.3:"Braço direito, braço esquerdo",
    0.3:"Perna direita, perna esquerda",
    0.3:"Balança a cabeça, dá uma voltinha",
    0.3:"Dá um pulinho e abraça o irmão",
    0.3:"Uôh, que saudade dessa música!",
  }
  const musica1 = "/j.mp3"
  var cores = ["#f9b04c", "#43bf40", "#4087bf"] 
  const fotos = [Foto1, Foto2]
  const [foto, setfoto] = useState(fotos[0])
  const [cor, setcor] = useState(cores[0]) 
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [Play, setPlay] = useState(false);

  useEffect(() => {
    const audio = document.getElementById('audio');
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);
  const eventoPlayPausar = () => {
    const audio = document.getElementById('audio');
    if (Play) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlay(!Play);
  };
  const atualizarBarra = (e) => {
    const audio = document.getElementById('audio');
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    // Verifica se o clique está dentro dos limites da barra de progresso
    if (x >= 0 && x <= width) {
      const percentage = x / width;
      const newTime = duration * percentage;
      console.log(audio.currentTime/60)
      audio.currentTime = newTime;
    }
  };

  const progressPercent = (currentTime / duration) * 100;
  return (
    <body style={{background:cor}}>

      <h1>Desafio Acelera ZG</h1>
      <div className="center">
        <div className="display">
          <div className={Play?"image esconder":"image"} style={{background:{foto}}}></div>
          <div className={Play?"letra mostrar":"letra"}></div>
        </div>
        <div className="musica" style={{background:cor}}>
          <div className="reprodutor">
            <button onClick={eventoPlayPausar}>{Play? "❚❚":"►"}</button>
            <div id="progress-bar" style={{ width: '300px', height: '5px', backgroundColor: 'rgb(220,220,220)'  }} onClick={atualizarBarra}>
              <div id="progress" style={{ height: '100%', backgroundColor: 'white', width: `${progressPercent}%` }}></div>
            </div>
          </div>
          <audio controls className="audio" id="audio">
              <source src={musica1} type="audio/mpeg" />
              Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </body>
  );
}
