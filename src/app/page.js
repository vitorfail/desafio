"use client";

import { useState,useEffect } from "react";
import { musicas } from "./musicas";
import "./style.scss"
export default function Home(){
  const [Indice, setIndice] = useState(0) 
  const dados = musicas[Indice]
  const [musica1, setmusica1] = useState(dados.musica)
  const [Tempo, setTempo] = useState("0.00")
  const [intervalosTempo, setintervalosTempo] = useState([])
  const [manterLetra, setmanterLetra] = useState("0.00")
  const foto = dados.foto
  const cor = dados.cor
  const cor2 = dados.cor2
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [Play, setPlay] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--cor', cor2);
    document.documentElement.style.setProperty('--cor2', cor);
    armazenar_intervalos(dados.letras) 
   
  }, [Indice, intervalosTempo]);
  const handleTimeUpdate = (event) => {
    setCurrentTime(event.target.currentTime);
    converter_tempo(event.target.currentTime)
    setDuration(event.target.duration);
  };
  function armazenar_intervalos(d){
    var intervalos_de_tempo = []
    d.forEach(lyric => {
      if(lyric){
        console.log(lyric)
        intervalos_de_tempo.push((String(lyric[0])))
      }
    });
    return intervalos_de_tempo
  }
  function checkar_tempo(t){
    setTempo(t);
    if(intervalosTempo.includes(t)){
      setmanterLetra(t)
    }
  }
  function converter_tempo(tempo){
    if(String(Math.trunc(tempo)).length<3){
      if((Math.trunc(tempo)<60)){
        checkar_tempo(String(Math.trunc(tempo)/100))  
      }
      else{
        if(Math.trunc(tempo)%60<10){
          checkar_tempo("1.0"+Math.trunc(tempo)%60)
        }
        else{
          checkar_tempo("1."+Math.trunc(tempo)%60)
        }
      }
    }
    else{
      if(Math.trunc(tempo)%60<10){
        checkar_tempo(Math.trunc(Math.trunc(tempo)/60)+".0"+Math.trunc(tempo)%60)
      }
      else{
        checkar_tempo(Math.trunc(Math.trunc(tempo)/60)+"."+Math.trunc(tempo)%60)
      }
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
      converter_tempo(newTime)
      audio.currentTime = newTime;
    }
  };

  const progressPercent = (currentTime / duration) * 100;

  function proxima(){
    setintervalosTempo([])
    setCurrentTime(0)
    setDuration(0)
    setPlay(false)
    setTempo("0.00")
    if(Indice == musicas.length-1){
      setmusica1(musicas[0].musica)
      setIndice(0)
      setintervalosTempo(armazenar_intervalos())
    }
    else{
      setmusica1(musicas[Indice+1].musica)
      setIndice(Indice+1)
      setintervalosTempo(armazenar_intervalos())
    }
  }
  function voltar(){
    setintervalosTempo([])
    setCurrentTime(0)
    setDuration(0)
    setPlay(false)
    setTempo("0.00")
    if(Indice == 0){
      setmusica1(musicas[musicas.length-1].musica)
      setIndice(musicas.length-1)
      setintervalosTempo(armazenar_intervalos())
    }
    else{
      setmusica1(musicas[Indice-1].musica)
      setIndice(Indice-1)
      setintervalosTempo(armazenar_intervalos())
    }
  }
  
  return (

    <div className="container" id="container" style={{background:"linear-gradient(180deg, "+cor+" 0%, "+cor2+" 100%)"}}>
      <div className="change" onClick={()=> voltar()} id="voltar">
        <p className="seta">&lt;</p>
        <div className="linha"></div>
        <div className="circulo"></div>
        <p>Voltar</p>
      </div>
      <div className="change" onClick={()=> proxima()} id="proxima">
        <p>Próxima</p>
        <div className="circulo"></div>
        <div className="linha"></div>
        <p className="seta">&gt;</p>
      </div>
      <div className={Play==true || Tempo !== "0.00"?"banner show":"banner"}>
        <p className="primeiro">{dados.nome[0]}</p>
        <p className="segundo">{dados.nome[1]}</p>
      </div>
      
      <div className={Play==true || Tempo !== "0.00"?"circle mostrar":"circle"}>
        <svg width={200} height={200}>

        <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="10" strokeDasharray="1,08" />        </svg>
      </div>
      <div className="center">
        <div className="display">
          <div className={Play==true || Tempo !== "0.00" ?"image esconder":"image"} style={{
    background:"url("+foto+")",
    backgroundSize:"cover", 
    backgroundRepeat:"no-repeat"}}></div>
          <div className={Play==true || Tempo !== "0.00"? "letra mostrar":"letra"}>
          {dados.letras && dados.letras.map((index, key) => (
              // Verifica se index não é undefined antes de prosseguir
              index !== undefined && (
                <h3 key={key} className={manterLetra == index[0] ? "frase show" : "frase"} id={index[0]}>
                  {index[1]}
                </h3>
              )
            ))}
            <div className="spectrograph">
              <div className="spectrograph__bar"></div>
              <div className="spectrograph__bar"></div>
              <div className="spectrograph__bar"></div>
              <div className="spectrograph__bar"></div>
              <div className="spectrograph__bar"></div>
              <div className="spectrograph__bar"></div>
              <div className="spectrograph__bar"></div>
              <div className="spectrograph__bar"></div>
              <div className="spectrograph__bar"></div>
              <div className="spectrograph__bar"></div>
              <div className="spectrograph__bar"></div>
              <div className="spectrograph__bar"></div>
              <div className="spectrograph__bar"></div>
              <div className="spectrograph__bar"></div>
              <div className="spectrograph__bar"></div>
              <div className="spectrograph__bar"></div>
              <div className="spectrograph__bar"></div>
              <div className="spectrograph__bar"></div>
              <div className="spectrograph__bar"></div>
              <div className="spectrograph__bar"></div>
          </div>
          </div>
        </div>
        <div className="musica" style={{background:cor}}>
          <div className="capa" style={{
    background:"url("+foto+")",
    backgroundSize:"cover", 
    backgroundRepeat:"no-repeat"}}></div>
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
            <audio controls key={Indice} className="audio" onTimeUpdate={handleTimeUpdate} id="audio">
              {
                <source src={musica1} type="audio/mpeg" />
              }
            </audio>
          </div>
        </div>
      </div>
    </div>
  );
}
