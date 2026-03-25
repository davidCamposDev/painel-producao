export function isHoraAtual(horaString, inicioTurno) {
  const horaLinha = parseInt(horaString.split(":")[0]);
  const horaAtual = new Date().getHours();
  const HoraAjustada = horaLinha < inicioTurno ? horaLinha + 24 : horaLinha;
  const horaAtualAjustada =
    horaAtual < inicioTurno ? horaAtual + 24 : horaAtual;
  return HoraAjustada === horaAtualAjustada;
}

export function ordenarPorTurno(dados, inicioTurno) {
  const ordemTurno = [];

  for (let i = 0; i < 10; i++) {
    ordemTurno.push((inicioTurno + i) % 24);
  }

  return [...dados].sort((a, b) => {
    const horaA = parseInt(a.hora.split(":")[0]);
    const horaB = parseInt(b.hora.split(":")[0]);

    return ordemTurno.indexOf(horaA) - ordemTurno.indexOf(horaB);
  });
}
