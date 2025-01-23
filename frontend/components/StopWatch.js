import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Circle } from "react-native-svg";
import SimpleButton from "./SimpleButton";
import TextButton from "./TextButton";

export default function StopWatch({ nome, duracao, onCountdownEnd }) {
  const [time, setTime] = useState(duracao);
  const [nomeEtapa, setNomeEtapa] = useState(nome);

  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef(null);

  const radius = 50;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const progress = (time / duracao) * circumference;

  const startCountdown = () => {
    setFinished(false);
    if (time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            if (onCountdownEnd) {
              setFinished(true);
              setTimeout(() => onCountdownEnd(), 0);
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      setRunning(true);
    }
  };

  const pauseCountdown = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const resetCountdown = () => {
    clearInterval(intervalRef.current);
    setTime(duracao);
    setRunning(false);
    setNomeEtapa(nome);
    setFinished(false);
  };

  const skipStep = () => {
    setFinished(true);
    setTime(0);
    onCountdownEnd();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.nomeEtapa}>{nomeEtapa}</Text>
      <Svg height="350" width="350" viewBox="0 0 120 120" style={styles.svg}>
        {/* Background Circle */}
        <Circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#DADADA"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <Circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#F9AE66"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          transform="rotate(-90 60 60)" // Rotaciona o círculo para começar no topo
        />
      </Svg>
      <Text style={styles.timeText}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        {!running && !finished && (
          <>
            <SimpleButton title={"Iniciar"} onPress={startCountdown} />
            <TextButton title={"Pular Etapa"} onPress={skipStep} />
          </>
        )}

        {running && !finished && (
          <>
            <SimpleButton title={"Pausar"} onPress={pauseCountdown} />
            <TextButton title={"Pular Etapa"} onPress={skipStep} />
          </>
        )}

        {finished && (
          <SimpleButton title={"Proxima Etapa"} onPress={resetCountdown} />
        )}

        {/* {running ? (
          <>
            <SimpleButton title={"Pausar"} onPress={pauseCountdown} />
            <TextButton title={"Pular Etapa"} onPress={startCountdown} />
          </>
        ) : (
          {finished ? (            
            <SimpleButton title={"Pausar"} onPress={pauseCountdown} />
          ) : (<>
            <SimpleButton title={"Iniciar"} onPress={startCountdown} />
            <TextButton title={"Pular Etapa"} onPress={startCountdown} />
          </>)}
          
        )} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nomeEtapa: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
    color: "#1a1a1a",
    marginTop: 37,
  },
  svg: {
    marginTop: 44,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    fontSize: 64,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
    color: "#1a1a1a",
    position: "absolute",
    top: "240",
  },
  buttonContainer: {
    flexDirection: "column",
    marginTop: 44,
    width: 300,
    gap: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  startButton: {
    backgroundColor: "#2ecc71",
    marginRight: 10,
  },
  resetButton: {
    backgroundColor: "#e74c3c",
    marginRight: 10,
  },
  pauseButton: {
    backgroundColor: "#f39c12",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
