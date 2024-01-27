# language: pt
Funcionalidade: Pagamentos

    Cenario: Processar um pagamento em dinheiro
        Dado um pagamento em dinheiro <body>
        Quando envio uma solicitação POST para /pagamentos
        Entao recebo o código de resposta 201
        Exemplos:
            | body                                                                                                                                                                                                                      |
            | {"id":"df8613ed-0c69-4d71-93cf-b77b4c9856da","preco":1,"itens":[{"id":"a8aea3c1-2c99-4797-be4e-2ba5bb1d3148","quantidade":1,"observacoes":"","produto":{"nome":"bolo","preco":1,"id":"c55e16db-d992-4533-aed8-e9edd24d8384"}}],"metodoPagamento":"DINHEIRO"} |
   
    Cenario: Buscar os pagamentos
        Quando requisitar a busca dos pagamentos na url: /pagamentos
        Entao deve ser apresentado total de 1 pagamento
        E recebo o código de resposta 200

    Cenario: Buscar o pagamento por id do pedido
        Quando requisitar a busca do pagamento por pedidoId: df8613ed-0c69-4d71-93cf-b77b4c9856da
        Entao recebo o código de resposta 200

    
    
