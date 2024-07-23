import { useContext, useEffect } from "react";
import { differenceInSeconds } from "date-fns";

import { CyclesContext } from "../../../../contexts/CyclesContext";

import * as S from "./styles";

export function Countdown() {
  const {
    activeCycle,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifferente = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifferente >= totalSeconds) {
          markCurrentCycleAsFinished();

          setSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDifferente);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [activeCycle, markCurrentCycleAsFinished, setSecondsPassed, totalSeconds]);

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [activeCycle, minutes, seconds]);

  return (
    <S.CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <S.Separator>:</S.Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </S.CountdownContainer>
  );
}
