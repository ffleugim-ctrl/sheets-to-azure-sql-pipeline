import random
import pandas as pd

# Listas de apoio para criar variações realistas
status_list = [
    "Processado",
    "Auditado",
    "Pendente",
    "Devolvido ao Centro",
    "Aguardando Triagem",
]
motivos_list = [
    "Avariado no transporte",
    "Arrependimento de compra",
    "Defeito técnico",
    "Produto divergente",
    "Embalagem violada",
    "Endereço não localizado",
]
operadores_list = ["Miguel Dantas", "Val"]

# Gerando 50 registros usando range
dados = []
for i in range(1, 51):
  codigo = f"MLB{random.randint(100000000, 999999999)}"
  status = random.choice(status_list)
  motivo = random.choice(motivos_list)
  operador = random.choice(operadores_list)

  dados.append({
      "codigo_rastreio": codigo,
      "status_operacao": status,
      "motivo_devolucao": motivo,
      "operador": operador,
  })

# Criando o DataFrame e salvando o CSV
df = pd.DataFrame(dados)
df.to_csv("historico_operacoes_lote.csv", index=False, encoding="utf-8")
print(f"CSV gerado com sucesso contendo {len(df)} registros!")