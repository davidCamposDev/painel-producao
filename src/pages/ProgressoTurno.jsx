import { useEffect, useState } from "react";
import api from "../services/api";
import { isHoraAtual, ordenarPorTurno } from "../utils/timeUtils";

export default function ProgressoTurno() {
  const [dados, setDados] = useState(null);
  const [progresso, setProgresso] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [turnoSelecionado, setTurnoSelecionado] = useState(2);

  useEffect(() => {
    Promise.all([
      api.get(
        `/apontamentos/grafico/${dataSelecionada}/turno/${turnoSelecionado}`,
      ),
      api.get(
        `/apontamentos/progresso/${dataSelecionada}/turno/${turnoSelecionado}`,
      ),
    ]).then(([resGrafico, resProgresso]) => {
      setDados(resGrafico.data);
      setProgresso(resProgresso.data);
    });
  }, [dataSelecionada, turnoSelecionado]);

  if (!dados || !progresso) {
    return (
      <div className="p-6 text-center text-gray-400 text-sm">
        Carregando dados do turno...
      </div>
    );
  }

  const inicioTurno = turnoSelecionado === 1 ? 7 : 17;
  const dadosOrdenados = ordenarPorTurno(dados, inicioTurno);
  const pct = Math.min(100, progresso.percentual);
  const diff = progresso.producaoAtual - Math.round(progresso.metaTurno);

  return (
    <div className="p-6 space-y-6">
      {/* Filtros */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">Data</label>
          <input
            type="date"
            value={dataSelecionada}
            onChange={(e) => setDataSelecionada(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">Turno</label>
          <select
            value={turnoSelecionado}
            onChange={(e) => setTurnoSelecionado(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>1º Turno</option>
            <option value={2}>2º Turno</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
            Produção
          </p>
          <p className="text-2xl font-bold text-gray-800">
            {progresso.producaoAtual.toLocaleString("pt-BR")}
            <span className="text-base font-normal text-gray-400 ml-1">
              / {Math.round(progresso.metaTurno).toLocaleString("pt-BR")}
            </span>
          </p>
          <p className="text-xs text-gray-400 mt-0.5">peças</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
            % da Meta
          </p>
          <p
            className={`text-2xl font-bold ${pct >= 80 ? "text-green-600" : pct >= 50 ? "text-yellow-500" : "text-red-500"}`}
          >
            {progresso.percentual.toFixed(1)}%
          </p>
          <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${pct >= 80 ? "bg-green-500" : pct >= 50 ? "bg-yellow-400" : "bg-red-400"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
            Diferença
          </p>
          <p
            className={`text-2xl font-bold ${diff >= 0 ? "text-green-600" : "text-red-500"}`}
          >
            {diff >= 0 ? "+" : ""}
            {diff.toLocaleString("pt-BR")}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            peças {diff >= 0 ? "acima" : "abaixo"} da meta
          </p>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs font-semibold uppercase tracking-wide">
              <th className="px-4 py-3 text-left">Hora</th>
              <th className="px-4 py-3 text-right">Meta</th>
              <th className="px-4 py-3 text-right">Produção</th>
              <th className="px-4 py-3 text-right">Diferença</th>
              <th className="px-4 py-3 text-left">Observação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dadosOrdenados.map((linha) => {
              const ehAtual = isHoraAtual(linha.hora, inicioTurno);
              const diferenca = Math.round(linha.diferenca);

              return (
                <tr
                  key={linha.hora}
                  className={`transition-colors ${
                    ehAtual
                      ? "bg-yellow-50 border-l-2 border-l-yellow-400"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-2.5 font-mono text-gray-800 font-medium flex items-center gap-2">
                    {ehAtual && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-400" />
                    )}
                    {linha.hora}
                  </td>
                  <td className="px-4 py-2.5 text-right text-gray-500">
                    {Math.round(linha.meta).toLocaleString("pt-BR")}
                  </td>
                  <td className="px-4 py-2.5 text-right text-gray-800 font-medium">
                    {linha.producao ?? 0}
                  </td>
                  <td
                    className={`px-4 py-2.5 text-right font-semibold ${diferenca >= 0 ? "text-green-600" : "text-red-500"}`}
                  >
                    {diferenca >= 0 ? "+" : ""}
                    {diferenca}
                  </td>
                  <td className="px-4 py-2.5 text-gray-400">
                    {linha.observacao || "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
