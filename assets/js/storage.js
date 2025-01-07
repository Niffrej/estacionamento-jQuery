class Storage {
  static salvarVeiculos(veiculos) {
      localStorage.setItem("veiculos", JSON.stringify(veiculos));
  }

  static carregarVeiculos() {
      return JSON.parse(localStorage.getItem("veiculos")) || [];
  }
}
