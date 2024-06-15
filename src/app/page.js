"use client";

import { useState,useEffect } from "react";
import { musicas } from "./musicas";
export default function Home(){
  const dados = musicas[0]
  const musica1 = dados.musica
  const [Tempo, setTempo] = useState("0.00")
  const foto = dados.foto
  const cor = dados.cor
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [Play, setPlay] = useState(false);

  useEffect(() => {
    const audio = document.getElementById('audio');
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if(String(Math.trunc(audio.currentTime)).length<3){
        if((Math.trunc(audio.currentTime)<60)){
          setTempo(String(Math.trunc(audio.currentTime)/100))  
        }
        else{
          console.log("1."+Math.trunc(audio.currentTime)%60)
          if(Math.trunc(audio.currentTime)%60<10){
            setTempo("1.0"+Math.trunc(audio.currentTime)%60)
          }
          else{
            setTempo("1."+Math.trunc(audio.currentTime)%60)
          }
        }
      }
      else{
        if(Math.trunc(audio.currentTime)%60<10){
          setTempo(Math.trunc(Math.trunc(audio.currentTime)/60)+".0"+Math.trunc(audio.currentTime)%60)
        }
        else{
          setTempo(Math.trunc(Math.trunc(audio.currentTime)/60)+"."+Math.trunc(audio.currentTime)%60)
        }
      }
      setDuration(audio.duration);
      //console.log(String((audio.currentTime/60).toFixed(2)))
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
      audio.currentTime = newTime;
    }
  };

  const progressPercent = (currentTime / duration) * 100;
  const estilo = {
    background:"url("+foto+")",
    backgroundSize:"cover", 
    backgroundRepeat:"no-repeat"}
  return (

    <div className="container" style={{background:cor}}>

      <h2>Desafio Acelera ZG</h2>
      <div className="center">
        <div className="display">
          <div className={Play==true && currentTime>0?"image esconder":"image"} style={estilo}></div>
          <div className={Play?"letra mostrar":"letra"}>
            {dados.letras.map((index, key) => (
              <h3 key={key} className={Tempo == (index[0])?"frase show":"frase"} id={index[0]}>{index[1]}</h3>
            ))}
          </div>
        </div>
        <div className="musica" style={{background:cor}}>
          <div className="capa" style={estilo}></div>
          <div className="descri">
            <h4>{dados.nome+"("+dados.artista+")"}</h4>
            <p className="album">{dados.album} </p>
            <div className="reprodutor">
              <div id="progress-bar" style={{ width: '300px', height: '5px', backgroundColor: 'rgb(220,220,220)'  }} onClick={atualizarBarra}>
                <div id="progress" style={{ height: '100%', backgroundColor: 'white', width: `${progressPercent}%` }}></div>
              </div>
              <p>{Tempo}</p>
              <button onClick={eventoPlayPausar}>{Play? "❚❚":"►"}</button>
            </div>
            <audio controls className="audio" id="audio">
                <source src={musica1} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
    </div>
  );
}
