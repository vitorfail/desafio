"use client";

import { useState,useEffect } from "react";
import { musicas } from "./musicas";
import "./style.scss"
export default function Home(){
  const [Indice, setIndice] = useState(0) 
  const dados = musicas[Indice]
  const [musica1, setmusica1] = useState(dados.musica)
  const [Tempo, setTempo] = useState("0.00")
  const [intervalosTempo, setintervalosTempo] = useState(armazenar_intervalos(dados.letras))
  const [manterLetra, setmanterLetra] = useState("0.00")
  const foto = dados.foto
  const cor = dados.cor
  const cor2 = dados.cor2
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [Play, setPlay] = useState(false);
  const [load, setload] =useState(true)
  const [circulo, setcirculo] = useState(criar_circulo("As Mais Tocadas"))
  const [progressPercent, setprogressPercent] = useState(0)

  useEffect(() => {
    document.documentElement.style.setProperty('--cor', cor2);
    document.documentElement.style.setProperty('--cor2', cor);
    setTimeout(() => {
      setload(false)
    }, 3500);
  }, [Indice, intervalosTempo]);
  const handleTimeUpdate = (event) => {
    if(event.target.currentTime === event.target.duration){
      atualizarBarra2()
      setCurrentTime(0)
      setDuration(0)
      setTempo("0.00")
      setmanterLetra("0.00")
      setPlay(false)
    }
    else{
      atualizarBarra2()
      setCurrentTime(event.target.currentTime);
      converter_tempo(event.target.currentTime)
      setDuration(event.target.duration);  
    }
  };
  function armazenar_intervalos(d){
    var intervalos_de_tempo = []
    d.forEach(lyric => {
      if(lyric){
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
  function atualizarBarra2(){
    const bar = document.getElementById("progress-bar")
    const audio = document.getElementById('audio');
    const duracao = audio.duration
    const currentTime = audio.currentTime
    const percentual = currentTime/duracao
    const x = percentual*bar.getBoundingClientRect().width
    setprogressPercent(x)
  }
  function atualizarBarra(e){
    const audio = document.getElementById('audio');
    const duracao = audio.duration
    console.log(duracao)
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    // Verifica se o clique está dentro dos limites da barra de progresso
    if (x >= 0 && x <= width) {
      const percentage = x / width;
      setprogressPercent(x)
      const newTime = duracao * percentage;
      converter_tempo(newTime)
      audio.currentTime = newTime;
    }
  };

  function criar_circulo(letra, delimitador = "•"){
    const spans = [];
  
    letra = letra.trim().replaceAll(" ", delimitador) + delimitador;
    const numChars = letra.length;
    const degVal = 90 / (numChars / 4);
  
    letra.split("").forEach((char, idx) => {
      
      if (char === delimitador){
        const span = <span key={idx} style={{color:cor, transform:`rotate(${180 - degVal * idx}deg)`}}>{char}</span>
        spans.push(span);
      } 
      else{
        const span = <span key={idx} style={{transform:`rotate(${180 - degVal * idx}deg)`}}>{char}</span>
        spans.push(span);
      }
    });
  
    return spans;
  };
  function proxima(){
    setintervalosTempo([])
    setCurrentTime(0)
    setDuration(0)
    setPlay(false)
    setTempo("0.00")
    setmanterLetra("0.00")
    if(Indice == musicas.length-1){
      setmusica1(musicas[0].musica)
      setIndice(0)
      setintervalosTempo(armazenar_intervalos(musicas[0].letras))
    }
    else{
      setmusica1(musicas[Indice+1].musica)
      setIndice(Indice+1)
      setintervalosTempo(armazenar_intervalos(musicas[Indice+1].letras))
    }
  }
  function voltar(){
    setintervalosTempo([])
    setCurrentTime(0)
    setDuration(0)
    setPlay(false)
    setTempo("0.00")
    setmanterLetra("0.00")
    if(Indice == 0){
      setmusica1(musicas[musicas.length-1].musica)
      setIndice(musicas.length-1)
      setintervalosTempo(armazenar_intervalos(musicas[musicas.length-1].letras))
    }
    else{
      setmusica1(musicas[Indice-1].musica)
      setIndice(Indice-1)
      setintervalosTempo(armazenar_intervalos(musicas[Indice-1].letras))
    }
  }
  const progress = (currentTime / duration) * 100;
  const estilo = {
    backgroundImage: "url("+foto+")",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover'
  };

  return (
    <div className="container" id="container" style={{background:"linear-gradient(180deg, "+cor+" 0%, "+cor2+" 100%)"}}>
      <div className={load?"loading":"loading hide"}>
        <div className="logo">
          <div className="flip_letters">
            <span style={{"--flip":1}}>A</span>
            <span style={{"--flip":2}}>c</span>
            <span style={{"--flip":3}}>e</span>
            <span style={{"--flip":4}}>l</span>
            <span style={{"--flip":5}}>e</span>
            <span style={{"--flip":6}}>r</span>
            <span style={{"--flip":7}}>a</span>
          </div>
          <div className="flip_letters">
            <span style={{"--flip":8}}>Z</span>
            <span style={{"--flip":9}}>G</span>
          </div>
        </div>
        <div className="wave"></div>
      </div>
      <div className="change um" onClick={()=> voltar()} id="voltar">
        <p className="seta">&lt;</p>
        <div className="linha"></div>
        <div className="circulo"></div>
        <p className="valor">Voltar</p>
      </div>
      <div className="change dois" onClick={()=> proxima()} id="proxima">
        <p className="valor">Próxima</p>
        <div className="circulo"></div>
        <div className="linha"></div>
        <p className="seta">&gt;</p>
      </div>
      <div className={Play==true || Tempo !== "0.00"?"banner show":"banner"}>
        <div className="primeiro">
          <p style={{color:cor}}>{(Indice+1)+"."}</p>
          <p >{dados.nome[0]}</p>
        </div>
        
        <p className="segundo">{dados.nome[1]}</p>
      </div>
      <div className={Play==true || Tempo !== "0.00"?"emblem-container esconder": "emblem-container"}>
            <div className="emblem text">
              {circulo}
            </div>
        </div>
      <div className="center">
        <div className="display">
          <div className={Play==true || Tempo !== "0.00" ?"image esconder":"image"} style={estilo}></div>
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
          <div className="capa" style={estilo}></div>
          <div className="descri">
            <h4>{dados.nome[0]+" "+dados.nome[1]+"("+dados.artista+")"}</h4>
            <p className="album">{dados.album} </p>
            <div className="reprodutor">
              <div id="progress-bar" style={{ width: '80%', height: '5px',boxShadow: "inset "+progressPercent+"px 0px 0px white", background: 'rgb(220,220,220)'  }} onClick={(event)=> atualizarBarra(event)}>

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
