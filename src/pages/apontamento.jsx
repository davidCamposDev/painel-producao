import { useEffect, useState } from "react";
import api from "../services/api";
import { ordenarPorTurno } from "../utils/timeUtils";

export default function Apontamento() {
  const [linhas, setLinhas] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [turnoSelecionado, setTurnoSelecionado] = useState(2);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    api
      .get(`/apontamentos/grafico/${dataSelecionada}/turno/${turnoSelecionado}`)
      .then((res) => {
        const inicioTurno = turnoSelecionado === 1 ? 7 : 17;
        const dadosOrdenados = ordenarPorTurno(res.data, inicioTurno);
        setLinhas(
          dadosOrdenados.map((item) => ({
            id: item.id,
            hora: item.hora,
            meta: Math.round(item.meta),
            producao: item.producao ?? "",
            observacao: item.observacao ?? "",
          })),
        );
      });
  }, [dataSelecionada, turnoSelecionado]);

  function atualizar(index, campo, valor) {
    const nova = [...linhas];
    nova[index][campo] = valor;
    setLinhas(nova);
  }

  async function salvarTudo() {
    setSalvando(true);
    try {
      const payloads = linhas
        .filter((l) => l.producao !== "" && Number(l.producao) > 0)
        .map((l) => ({
          data: dataSelecionada,
          turno: { id: turnoSelecionado },
          gradeHorario: { id: l.id },
          quantidadeProduzida: Number(l.producao),
          observacao: l.observacao,
        }));

      for (const p of payloads) {
        await api.post("/apontamentos", p);
      }
      alert("Apontamentos salvos com sucesso!");
    } catch (e) {
      console.error(e);
      alert("Erro ao salvar apontamentos.");
    } finally {
      setSalvando(false);
    }
  }

  const metade = Math.ceil(linhas.length / 2);
  const colunas = [linhas.slice(0, metade), linhas.slice(metade)];

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

      {/* Tabelas lado a lado */}
      <div className="grid grid-cols-2 gap-6">
        {colunas.map((coluna, colIndex) => (
          <div
            key={colIndex}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs font-semibold uppercase tracking-wide">
                  <th className="px-4 py-3 text-left">Hora</th>
                  <th className="px-4 py-3 text-right">Meta</th>
                  <th className="px-4 py-3 text-center">Produção</th>
                  <th className="px-4 py-3 text-left">Observação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {coluna.map((linha, index) => {
                  const idxReal = colIndex === 0 ? index : index + metade;
                  const preenchido =
                    linha.producao !== "" && Number(linha.producao) > 0;

                  return (
                    <tr
                      key={linha.hora}
                      className={`transition-colors ${preenchido ? "bg-blue-50/40" : "hover:bg-gray-50"}`}
                    >
                      <td className="px-4 py-2.5 font-mono text-gray-800 font-medium">
                        {linha.hora}
                      </td>
                      <td className="px-4 py-2.5 text-right text-gray-500">
                        {linha.meta}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <input
                          type="number"
                          min="0"
                          className="w-20 border border-gray-300 rounded-md px-2 py-1 text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={linha.producao}
                          onChange={(e) =>
                            atualizar(idxReal, "producao", e.target.value)
                          }
                        />
                      </td>
                      <td className="px-4 py-2.5">
                        <input
                          type="text"
                          placeholder="—"
                          className="w-full border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-600 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={linha.observacao}
                          onChange={(e) =>
                            atualizar(idxReal, "observacao", e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Rodapé */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-sm text-gray-400">
          {
            linhas.filter((l) => l.producao !== "" && Number(l.producao) > 0)
              .length
          }{" "}
          de {linhas.length} horas preenchidas
        </p>
        <button
          onClick={salvarTudo}
          disabled={salvando}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium px-5 py-2 rounded-md transition-colors"
        >
          {salvando ? "Salvando..." : "Salvar apontamentos"}
        </button>
      </div>
    </div>
  );
}
