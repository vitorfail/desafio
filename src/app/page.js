"use client";

import { useState,useEffect } from "react";
import { musicas } from "./musicas";
export default function Home(){
  const dados = musicas[0]
  const musica1 = dados.musica

  const foto = dados.foto
  const cor = dados.cor
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [Play, setPlay] = useState(false);

  useEffect(() => {
    const audio = document.getElementById('audio');
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      var element = document.getElementById(String((audio.currentTime/60).toFixed(2)))
      if(element){
        element.className = "mostrar-letra"
      }
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
  const estilo = {
    background:"url("+foto+")",
    backgroundSize:"cover", 
    backgroundRepeat:"no-repeat"}
  return (
    <body style={{background:cor}}>

      <h2>Desafio Acelera ZG</h2>
      <div className="center">
        <div className="display">
          <div className={Play?"image esconder":"image"} style={estilo}></div>
          <div className={Play?"letra mostrar":"letra"}>
            {dados.letras.map((index, key) => (
              <h3 key={key} id={index[0]}>{index[1]}</h3>
            ))}
          </div>
        </div>
        <div className="musica" style={{background:cor}}>
          <div className="capa" style={estilo}></div>
          <div className="descri">
            <h3>{dados.nome}</h3>
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
      </div>
    </body>
  );
}
