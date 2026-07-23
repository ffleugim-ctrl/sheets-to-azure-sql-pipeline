function testarConexaoAzureSQL() {
  // URL limpa sem o ponto e vírgula no final para não criar parâmetro fantasma
  var url = "jdbc:sqlserver://sql-server-miguel-logistica.database.windows.net:1433;databaseName=db_historico_operacao";
  var usuario = PropertiesService.getScriptProperties().getProperty('DB_USUARIO');
  var senha = PropertiesService.getScriptProperties().getProperty('DB_SENHA');

  try {
    Logger.log("Tentando abrir o canal com o SQL Server na nuvem (Azure)...");

    var conn = Jdbc.getConnection(url, usuario, senha);

    Logger.log("CONEXÃO ESTABELECIDA COM SUCESSO! 🖥️🔥 O Google e o Azure estão conversando!");

    conn.close();
    Logger.log("Conexão fechada com segurança.");

  } catch (erro) {
    Logger.log("Ops, deu erro na conexão: " + erro.toString());
  }
}

function inserirDadosNoAzureSQL() {
  var url = "jdbc:sqlserver://sql-server-miguel-logistica.database.windows.net:1433;databaseName=db_historico_operacao";
  var usuario = PropertiesService.getScriptProperties().getProperty('DB_USUARIO');
  var senha = PropertiesService.getScriptProperties().getProperty('DB_SENHA');

  try {
    var conn = Jdbc.getConnection(url, usuario, senha);
    Logger.log("Conectado com sucesso para inserção!");

    // Cole aqui o ID da sua planilha (o trecho que fica na URL entre /d/ e /edit)
    var idPlanilha = "19o6kojneMUyaa8qH4VUdIIQoWttMHao_BMA5AXOU4kY";
    var aba = SpreadsheetApp.openById(idPlanilha).getActiveSheet();
    var dados = aba.getDataRange().getValues();

    var sql = "INSERT INTO historico_operacoes (codigo_rastreio, status_operacao, motivo_devolucao, operador) VALUES (?, ?, ?, ?)";
    var stmt = conn.prepareStatement(sql);

    for (var i = 1; i < dados.length; i++) {
      var linha = dados[i];