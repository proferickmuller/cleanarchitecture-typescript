# Clean Architecture na Prática

## Objetivo

Mostrar como usar as ideias da Clean Architecture em um projeto, partindo do zero, com a mentalidade ágil.

## Regras

1. Faça uma coisa de cada vez.
1. Sempre comece pelo use case. Implemente o primeiro use case, implemente as entidades que ele usa, defina tudo o que ele precisa pra funcionar (via interfaces), e depois construa o controller para fazer o use case funcionar, e crie as interfaces necessárias. Depois disso, ajuste os Presenters e Gateways.
1. Não comece pela API ou pelo banco de dados. No máximo tenha um desenho de api para comunicar com o mundo exterior, mas que pode ajudar na definição dos casos de uso. O uso define o contexto, e não o contrário.
1. Esqueça os frameworks nesse momento. foque nas três camadas internas.
1. Use interfaces para todos os lugares onde é necessário a injeção de dependência.
1. Se quiser testar um caso de uso com gateway, use um "fornecedor de dados" falso (mock). Depois você pode implementar o acesso ao banco de dados.

## Heurísticas

Pequenos passos te levam longe. Ciclos curtos e bem definidos.

> Entenda e defina -> Construa -> Teste -> Disponibilize.
