class Recibo {
  constructor(veiculo) {
      this.veiculo = veiculo;
  }

  gerar() {
      return `
          Recibo de Estacionamento\n
          Placa: ${this.veiculo.placa}
          Entrada: ${this.veiculo.horarioEntrada}
          Saída: ${this.veiculo.horarioSaida}
          Tempo: ${this.veiculo.tempoEstacionado}
          Valor a Pagar: R$ ${this.veiculo.valorPagar.toFixed(2)}
      `;
  }
}
