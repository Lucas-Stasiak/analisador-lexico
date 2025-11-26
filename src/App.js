import React, { useState } from "react";

export default function App() {
  const [alphabet, setAlphabet] = useState([]);
  const [newWord, setNewWord] = useState("");
  const [input, setInput] = useState("");

  const analyzeInput = () => {
    const rows = [];

    let partial = "";
    let globalIndex = 0;

    const words = input.split(/( )/); 

    for (let token of words) {
      if (token === " ") {
        // espaço em branco entre as palavras
        rows.push({
          index: globalIndex,
          symbol: "(espaço)",
          partial: "-",
          matches: true,
          complete: true,
        });
        globalIndex++;
        partial = "";
        continue;
      }

      for (let i = 0; i < token.length; i++) {
        partial += token[i];
        const matches = alphabet.some((w) => w.startsWith(partial));
        const complete = alphabet.includes(partial);

        rows.push({
          index: globalIndex,
          symbol: token[i],
          partial,
          matches,
          complete,
        });
        globalIndex++;
      }

      partial = "";
    }

    return rows;
  };

  const rows = analyzeInput();

  const addWord = () => {
    if (newWord.trim().length > 0 && !alphabet.includes(newWord)) {
      setAlphabet([...alphabet, newWord]);
      setNewWord("");
    }
  };

  const removeWord = (word) => {
    setAlphabet(alphabet.filter((w) => w !== word));
  };

  return (
    <div className="p-6 flex flex-col gap-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Analisador Léxico</h1>

      {/* Controle do Alfabeto */}
      <div className="p-4 rounded-2xl shadow bg-white">
        <h2 className="text-xl font-semibold mb-2">Gerenciar Alfabeto</h2>
        <div className="flex gap-2 mb-4">
          <input
            className="border p-2 rounded w-full"
            placeholder="Adicionar nova palavra"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-xl" onClick={addWord}>
            Adicionar
          </button>
        </div>

        <ul className="flex flex-wrap gap-2">
          {alphabet.map((w) => (
            <li key={w} className="px-3 py-1 bg-gray-200 rounded-xl flex items-center gap-2">
              {w}
              <button className="text-red-600" onClick={() => removeWord(w)}>X</button>
            </li>
          ))}
        </ul>
      </div>

      {/* input do usuário */}
      <div className="p-4 rounded-2xl shadow bg-white">
        <h2 className="text-xl font-semibold mb-2">Entrada do Usuário</h2>
        <input
          className="border p-2 rounded w-full"
          placeholder="Digite símbolos..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {/* tabela atualizada em tempo real */}
      <div className="p-4 rounded-2xl shadow bg-white">
        <h2 className="text-xl font-semibold mb-4">Análise Léxica em Tempo Real</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Posição</th>
              <th className="border p-2">Símbolo</th>
              <th className="border p-2">Parcial</th>
              <th className="border p-2">Caminho Válido?</th>
              <th className="border p-2">Palavra Completa?</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.index}>
                <td className="border p-2 text-center">{r.index}</td>
                <td className="border p-2 text-center">{r.symbol}</td>
                <td className="border p-2 text-center">{r.partial}</td>
                <td className={`border p-2 text-center ${r.matches ? "text-green-600" : "text-red-600"}`}>
                  {r.matches ? "Sim" : "Não"}
                </td>
                <td className={`border p-2 text-center ${r.complete ? "text-green-600" : "text-gray-500"}`}>
                  {r.complete ? "Sim" : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
