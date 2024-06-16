"use client";

import { useState,useEffect } from "react";
import { musicas } from "./musicas";
export default function Home(){
  const dados = musicas[0]
  const musica1 = dados.musica
  const [Tempo, setTempo] = useState("0.00")
  const [intervalosTempo, setintervalosTempo] = useState(armazenar_intervalos())
  const [manterLetra, setmanterLetra] = useState("0.00")
  const foto = dados.foto
  const cor = dados.cor
  const cor2 = dados.cor2
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [Play, setPlay] = useState(false);

  useEffect(() => {
    const audio = document.getElementById('audio');
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if(String(Math.trunc(audio.currentTime)).length<3){
        if((Math.trunc(audio.currentTime)<60)){
          checkar_tempo(String(Math.trunc(audio.currentTime)/100))  
        }
        else{
          if(Math.trunc(audio.currentTime)%60<10){
            checkar_tempo("1.0"+Math.trunc(audio.currentTime)%60)
          }
          else{
            checkar_tempo("1."+Math.trunc(audio.currentTime)%60)
          }
        }
      }
      else{
        if(Math.trunc(audio.currentTime)%60<10){
          checkar_tempo(Math.trunc(Math.trunc(audio.currentTime)/60)+".0"+Math.trunc(audio.currentTime)%60)
        }
        else{
          checkar_tempo(Math.trunc(Math.trunc(audio.currentTime)/60)+"."+Math.trunc(audio.currentTime)%60)
        }
      }
      setDuration(audio.duration);
    };
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);
  function armazenar_intervalos(){
    var intervalos_de_tempo = []
    dados.letras.forEach(lyric => {
      intervalos_de_tempo.push((String(lyric[0])))
    });
    return intervalos_de_tempo
  }
  function checkar_tempo(t){
    setTempo(t);
    if(intervalosTempo.includes(t)){
      setmanterLetra(t)
    }
  }
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

    <div className="container" id="container" style={{background:"linear-gradient(180deg, "+cor+" 0%, "+cor2+" 100%)"}}>
      <div className="change" id="voltar">
        <p className="seta">&lt;</p>
        <div className="linha"></div>
        <div className="circulo"></div>
        <p>Voltar</p>
      </div>
      <div className="change" id="proxima">
        <p>Próxima</p>
        <div className="circulo"></div>
        <div className="linha"></div>
        <p className="seta">&gt;</p>
      </div>
      <div className={Play==true || Tempo !== "0.00"?"banner show":"banner"}>
        <p className="primeiro">{dados.nome[0]}</p>
        <p className="segundo">{dados.nome[1]}</p>
      </div>
      
      <div className="circle">
        <svg width={200} height={200}>
          <defs>
            <pattern id="dots" x={0} y={0} width={10} height={10} patternUnits="useSpaceOneUse">
            <circle cx={5} cy={5} r={1} fill="white"></circle>
            </pattern>
          </defs>
          <circle cx={100} cy={100} r={50} fill="url(#dots" stroke="black" strokeWidth={2}></circle>
        </svg>
      </div>
      <div className="center">
        <div className="display">
          <div className={Play==true || Tempo !== "0.00" ?"image esconder":"image"} style={estilo}></div>
          <div className={Play==true || Tempo !== "0.00"? "letra mostrar":"letra"}>
            {dados.letras.map((index, key) => (
              <h3 key={key} className={manterLetra == (index[0])?"frase show":"frase"} id={index[0]}>{index[1]}</h3>
            ))}
          </div>
        </div>
        <div className="musica" style={{background:cor}}>
          <div className="capa" style={estilo}></div>
          <div className="descri">
            <h4>{dados.nome[0]+" "+dados.nome[1]+"("+dados.artista+")"}</h4>
            <p className="album">{dados.album} </p>
            <div className="reprodutor">
              <div id="progress-bar" style={{ width: '80%', height: '5px', backgroundColor: 'rgb(220,220,220)'  }} onClick={atualizarBarra}>
                <div id="progress" style={{ 
                  height: '100%', 
                  backgroundColor: 
                  'white', width: 
                  `${progressPercent}%` }}>
                </div>
              </div>
              <p className="timer">{Tempo}</p>
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
