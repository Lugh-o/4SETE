import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Circle } from "react-native-svg";
import SimpleButton from "./SimpleButton";
import TextButton from "./TextButton";

export default function StopWatch({ nome, duracao, onCountdownEnd }) {
  const [time, setTime] = useState(duracao);
  const [nomeEtapa, setNomeEtapa] = useState(nome);

  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const radius = 50;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const progress = (time / duracao) * circumference;

  useEffect(() => {
    setTime(duracao);
    setNomeEtapa(nome);
  }, [duracao]);

  const startCountdown = () => {
    if (time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            if (onCountdownEnd) {
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
  };

  const pularEtapa = () => {
    pauseCountdown();
    setTimeout(() => onCountdownEnd(), 0);
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
        {running ? (
          <>
            <SimpleButton title="Pausar" onPress={pauseCountdown} />
            <TextButton title="Pular Etapa" onPress={pularEtapa} />
          </>
        ) : (
          <>
            <SimpleButton title="Iniciar" onPress={startCountdown} />
            <TextButton title="Pular Etapa" onPress={pularEtapa} />
          </>
        )}
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
});
