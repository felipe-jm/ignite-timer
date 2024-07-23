import { useContext } from "react";
import { HandPalm, Play } from "phosphor-react";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

import { CyclesContext } from "../../contexts/CyclesContext";

import * as S from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch /*reset*/ } = newCycleForm;

  const task = watch("task");
  const isSubmitButtonDisabled = !task;

  return (
    <S.HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <S.StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </S.StopCountdownButton>
        ) : (
          <S.StartCountdownButton
            disabled={isSubmitButtonDisabled}
            type="submit"
          >
            <Play size={24} />
            Começar
          </S.StartCountdownButton>
        )}
      </form>
    </S.HomeContainer>
  );
}
