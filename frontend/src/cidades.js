const cidades = [
    {
        cidade: "Lisboa",
        distrito: "Lisboa"
    },
    {
        cidade: "Vila Nova de Gaia",
        distrito: "Porto"
    },
    {
        cidade: "Porto",
        distrito: "Porto"
    },
    {
        cidade: "Braga",
        distrito: "Braga"
    },
    {
        cidade: "Matosinhos",
        distrito: "Porto"
    },
    {
        cidade: "Amadora",
        distrito: "Lisboa"
    },
    {
        cidade: "Almada",
        distrito: "Setúbal"
    },
    {
        cidade: "Oeiras",
        distrito: "Lisboa"
    },
    {
        cidade: "Gondomar",
        distrito: "Porto"
    },
    {
        cidade: "Guimarães",
        distrito: "Braga"
    },
    {
        cidade: "Odivelas",
        distrito: "Lisboa"
    },
    {
        cidade: "Coimbra",
        distrito: "Coimbra"
    },
    {
        cidade: "Vila Franca de Xira",
        distrito: "Lisboa"
    },
    {
        cidade: "Maia",
        distrito: "Porto"
    },
    {
        cidade: "Leiria",
        distrito: "Leiria"
    },
    {
        cidade: "Setúbal",
        distrito: "Setúbal"
    },
    {
        cidade: "Funchal",
        distrito: "Madeira"
    },
    {
        cidade: "Viseu",
        distrito: "Viseu"
    },
    {
        cidade: "Valongo",
        distrito: "Porto"
    },
    {
        cidade: "Viana do Castelo",
        distrito: "Viana do Castelo"
    },
    {
        cidade: "Paredes",
        distrito: "Porto"
    },
    {
        cidade: "Vila do Conde",
        distrito: "Porto"
    },
    {
        cidade: "Torres Vedras",
        distrito: "Lisboa"
    },
    {
        cidade: "Barreiro",
        distrito: "Setúbal"
    },
    {
        cidade: "Aveiro",
        distrito: "Aveiro"
    },
    {
        cidade: "Queluz",
        distrito: "Lisboa"
    },
    {
        cidade: "Mafra",
        distrito: "Lisboa"
    },
    {
        cidade: "Penafiel",
        distrito: "Porto"
    },
    {
        cidade: "Loulé",
        distrito: "Faro"
    },
    {
        cidade: "Ponta Delgada",
        distrito: "Açores"
    },
    {
        cidade: "Moita",
        distrito: "Setúbal"
    },
    {
        cidade: "Faro",
        distrito: "Faro"
    },
    {
        cidade: "Póvoa de Varzim",
        distrito: "Porto"
    },
    {
        cidade: "Palmela",
        distrito: "Setúbal"
    },
    {
        cidade: "Santarém",
        distrito: "Santarém"
    },
    {
        cidade: "Figueira da Foz",
        distrito: "Coimbra"
    },
    {
        cidade: "Felgueiras",
        distrito: "Porto"
    },
    {
        cidade: "Paços de Ferreira",
        distrito: "Porto"
    },
    {
        cidade: "Amarante",
        distrito: "Porto"
    },
    {
        cidade: "Castelo Branco",
        distrito: "Castelo Branco"
    },
    {
        cidade: "Évora",
        distrito: "Évora"
    },
    {
        cidade: "Portimão",
        distrito: "Faro"
    },
    {
        cidade: "Pombal",
        distrito: "Leiria"
    },
    {
        cidade: "Marco de Canavezes",
        distrito: "Porto"
    },
    {
        cidade: "Vila Real",
        distrito: "Vila Real"
    },
    {
        cidade: "Covilhã",
        distrito: "Castelo Branco"
    },
    {
        cidade: "Caldas da Rainha",
        distrito: "Leiria"
    },
    {
        cidade: "Montijo",
        distrito: "Setúbal"
    },
    {
        cidade: "Rio Tinto",
        distrito: "Porto"
    },
    {
        cidade: "Fafe",
        distrito: "Braga"
    },
    {
        cidade: "Sesimbra",
        distrito: "Setúbal"
    },
    {
        cidade: "Amora",
        distrito: "Setúbal"
    },
    {
        cidade: "Vila Verde",
        distrito: "Braga"
    },
    {
        cidade: "Lousada",
        distrito: "Porto"
    },
    {
        cidade: "Ourém",
        distrito: "Santarém"
    },
    {
        cidade: "Olhão",
        distrito: "Faro"
    },
    {
        cidade: "Ponte de Lima",
        distrito: "Viana do Castelo"
    },
    {
        cidade: "Santa Cruz",
        distrito: "Madeira"
    },
    {
        cidade: "Guarda",
        distrito: "Guarda"
    },
    {
        cidade: "Chaves",
        distrito: "Vila Real"
    },
    {
        cidade: "Tomar",
        distrito: "Santarém"
    },
    {
        cidade: "Ílhavo",
        distrito: "Aveiro"
    },
    {
        cidade: "Trofa",
        distrito: "Porto"
    },
    {
        cidade: "Ermezinde",
        distrito: "Porto"
    },
    {
        cidade: "Marinha Grande",
        distrito: "Leiria"
    },
    {
        cidade: "Silves",
        distrito: "Faro"
    },
    {
        cidade: "Torres Novas",
        distrito: "Santarém"
    },
    {
        cidade: "Beja",
        distrito: "Beja"
    },
    {
        cidade: "Agualva",
        distrito: "Lisboa"
    },
    {
        cidade: "Cãmara de Lobos",
        distrito: "Madeira"
    },
    {
        cidade: "Angra do Heroísmo",
        distrito: "Açores"
    },
    {
        cidade: "Bragança",
        distrito: "Bragança"
    },
    {
        cidade: "Esposende",
        distrito: "Braga"
    },
    {
        cidade: "Ribeira Grande",
        distrito: "Açores"
    },
    {
        cidade: "Espinho",
        distrito: "Aveiro"
    },
    {
        cidade: "Lagos",
        distrito: "Faro"
    },
    {
        cidade: "Anadia",
        distrito: "Aveiro"
    },
    {
        cidade: "Benavente",
        distrito: "Santarém"
    },
    {
        cidade: "Massamá",
        distrito: "Lisboa"
    },
    {
        cidade: "Estarreja",
        distrito: "Aveiro"
    },
    {
        cidade: "Lamego",
        distrito: "Viseu"
    },
    {
        cidade: "Estoril",
        distrito: "Lisboa"
    },
    {
        cidade: "Montemor-o-Velho",
        distrito: "Coimbra"
    },
    {
        cidade: "Tavira",
        distrito: "Faro"
    },
    {
        cidade: "Odemira",
        distrito: "Beja"
    },
    {
        cidade: "Albergaria-a-Velha",
        distrito: "Aveiro"
    },
    {
        cidade: "Portalegre",
        distrito: "Portalegre"
    },
    {
        cidade: "Porto de Mós",
        distrito: "Leiria"
    },
    {
        cidade: "Mirandela",
        distrito: "Bragança"
    },
    {
        cidade: "Vizela",
        distrito: "Porto"
    },
    {
        cidade: "Almeirim",
        distrito: "Santarém"
    },
    {
        cidade: "Caniço",
        distrito: "Madeira"
    },
    {
        cidade: "Oliveira do Bairro",
        distrito: "Aveiro"
    },
    {
        cidade: "Vale de Cambra",
        distrito: "Aveiro"
    },
    {
        cidade: "Póvoa de Lanhoso",
        distrito: "Braga"
    },
    {
        cidade: "Azambuja",
        distrito: "Lisboa"
    },
    {
        cidade: "São João da Madeira",
        distrito: "Aveiro"
    },
    {
        cidade: "Cacém",
        distrito: "Lisboa"
    },
    {
        cidade: "Rio Maior",
        distrito: "Santarém"
    },
    {
        cidade: "Praia da Vitória",
        distrito: "Açores"
    },
    {
        cidade: "Elvas",
        distrito: "Portalegre"
    },
    {
        cidade: "Baião",
        distrito: "Porto"
    },
    {
        cidade: "Cinfães",
        distrito: "Viseu"
    },
    {
        cidade: "Entroncamento",
        distrito: "Santarém"
    },
    {
        cidade: "Celorico de Basto",
        distrito: "Braga"
    },
    {
        cidade: "Alfena",
        distrito: "Porto"
    },
    {
        cidade: "Soure",
        distrito: "Coimbra"
    },
    {
        cidade: "Monção",
        distrito: "Viana do Castelo"
    },
    {
        cidade: "Vila Real de Santo António",
        distrito: "Faro"
    },
    {
        cidade: "Sacavém",
        distrito: "Lisboa"
    },
    {
        cidade: "Lousã",
        distrito: "Coimbra"
    },
    {
        cidade: "Alcochete",
        distrito: "Setúbal"
    },
    {
        cidade: "Montemor-o-Novo",
        distrito: "Évora"
    },
    {
        cidade: "Peso da Régua",
        distrito: "Vila Real"
    },
    {
        cidade: "Condeixa-a-Nova",
        distrito: "Coimbra"
    },
    {
        cidade: "Ponte de Sôr",
        distrito: "Portalegre"
    },
    {
        cidade: "Cabeceiras de Basto",
        distrito: "Braga"
    },
    {
        cidade: "Quarteira",
        distrito: "Faro"
    },
    {
        cidade: "Sertã",
        distrito: "Castelo Branco"
    },
    {
        cidade: "Batalha",
        distrito: "Leiria"
    },
    {
        cidade: "Macedo de Cavaleiros",
        distrito: "Bragança"
    },
    {
        cidade: "Serpa",
        distrito: "Beja"
    },
    {
        cidade: "Castro Daire",
        distrito: "Viseu"
    },
    {
        cidade: "Penacova",
        distrito: "Coimbra"
    },
    {
        cidade: "Moura",
        distrito: "Beja"
    },
    {
        cidade: "Nazaré",
        distrito: "Leiria"
    },
    {
        cidade: "Horta",
        distrito: "Açores"
    },
    {
        cidade: "Falagueira",
        distrito: "Lisboa"
    },
    {
        cidade: "Cadaval",
        distrito: "Lisboa"
    },
    {
        cidade: "Estremoz",
        distrito: "Évora"
    },
    {
        cidade: "Sines",
        distrito: "Setúbal"
    },
    {
        cidade: "Gouveia",
        distrito: "Guarda"
    },
    {
        cidade: "Nelas",
        distrito: "Viseu"
    },
    {
        cidade: "Arruda dos Vinhos",
        distrito: "Lisboa"
    },
    {
        cidade: "Ribeira Brava",
        distrito: "Madeira"
    },
    {
        cidade: "Bombarral",
        distrito: "Leiria"
    },
    {
        cidade: "Vila Pouca de Aguiar",
        distrito: "Vila Real"
    },
    {
        cidade: "Ansião",
        distrito: "Leiria"
    },
    {
        cidade: "Miranda do Corvo",
        distrito: "Coimbra"
    },
    {
        cidade: "Alcácer do Sal",
        distrito: "Setúbal"
    },
    {
        cidade: "Vieira do Minho",
        distrito: "Braga"
    },
    {
        cidade: "Sabugal",
        distrito: "Guarda"
    },
    {
        cidade: "Mira",
        distrito: "Coimbra"
    },
    {
        cidade: "Sátão",
        distrito: "Viseu"
    },
    {
        cidade: "Arcozelo",
        distrito: "Porto"
    },
    {
        cidade: "Sever do Vouga",
        distrito: "Aveiro"
    },
    {
        cidade: "Arganil",
        distrito: "Coimbra"
    },
    {
        cidade: "Tábua",
        distrito: "Coimbra"
    },
    {
        cidade: "Vendas Novas",
        distrito: "Évora"
    },
    {
        cidade: "\u00d3bidos",
        distrito: "Leiria"
    },
    {
        cidade: "Calheta",
        distrito: "Madeira"
    },
    {
        cidade: "Resende",
        distrito: "Viseu"
    },
    {
        cidade: "Reguengos de Monsaraz",
        distrito: "Évora"
    },
    {
        cidade: "Valadares",
        distrito: "Porto"
    },
    {
        cidade: "São Brás de Alportel",
        distrito: "Faro"
    },
    {
        cidade: "Murtosa",
        distrito: "Aveiro"
    },
    {
        cidade: "Moimenta da Beira",
        distrito: "Viseu"
    },
    {
        cidade: "Sobral de Monte Agraço",
        distrito: "Lisboa"
    },
    {
        cidade: "Trancoso",
        distrito: "Guarda"
    },
    {
        cidade: "Carregal do Sal",
        distrito: "Viseu"
    },
    {
        cidade: "Idanha-a-Nova",
        distrito: "Castelo Branco"
    },
    {
        cidade: "Pinhel",
        distrito: "Guarda"
    },
    {
        cidade: "Aljustrel",
        distrito: "Beja"
    },
    {
        cidade: "Melgaço",
        distrito: "Viana do Castelo"
    },
    {
        cidade: "Vinhais",
        distrito: "Bragança"
    },
    {
        cidade: "Almargem",
        distrito: "Lisboa"
    },
    {
        cidade: "Aver-o-Mar",
        distrito: "Porto"
    },
    {
        cidade: "Ponta do Sol",
        distrito: "Madeira"
    },
    {
        cidade: "Ferreira do Zêzere",
        distrito: "Santarém"
    },
    {
        cidade: "Torre de Moncorvo",
        distrito: "Bragança"
    },
    {
        cidade: "Campo Maior",
        distrito: "Portalegre"
    },
    {
        cidade: "Argoncilhe",
        distrito: "Aveiro"
    },
    {
        cidade: "Vila Viçosa",
        distrito: "Évora"
    },
    {
        cidade: "Proença-a-Nova",
        distrito: "Castelo Branco"
    },
    {
        cidade: "Tarouca",
        distrito: "Viseu"
    },
    {
        cidade: "Penalva do Castelo",
        distrito: "Viseu"
    },
    {
        cidade: "São João da Pesqueira",
        distrito: "Viseu"
    },
    {
        cidade: "Santana",
        distrito: "Madeira"
    },
    {
        cidade: "Alpiarça",
        distrito: "Santarém"
    },
    {
        cidade: "Celorico da Beira",
        distrito: "Guarda"
    },
    {
        cidade: "Joane",
        distrito: "Braga"
    },
    {
        cidade: "Mondim de Basto",
        distrito: "Vila Real"
    },
    {
        cidade: "Miranda do Douro",
        distrito: "Bragança"
    },
    {
        cidade: "Nisa",
        distrito: "Portalegre"
    },
    {
        cidade: "Arraiolos",
        distrito: "Évora"
    },
    {
        cidade: "Santa Marta de Penaguião",
        distrito: "Vila Real"
    },
    {
        cidade: "Borba",
        distrito: "Évora"
    },
    {
        cidade: "Vila Nova da Barquinha",
        distrito: "Santarém"
    },
    {
        cidade: "Vila Nova de Foz Côa",
        distrito: "Guarda"
    },
    {
        cidade: "Castelões de Cepeda",
        distrito: "Porto"
    },
    {
        cidade: "Poiares",
        distrito: "Coimbra"
    },
    {
        cidade: "Castro Verde",
        distrito: "Beja"
    },
    {
        cidade: "Mértola",
        distrito: "Beja"
    },
    {
        cidade: "Terras de Bouro",
        distrito: "Braga"
    },
    {
        cidade: "Redondo",
        distrito: "Évora"
    },
    {
        cidade: "Castro Marim",
        distrito: "Faro"
    },
    {
        cidade: "Ribeira de Pena",
        distrito: "Vila Real"
    },
    {
        cidade: "Portel",
        distrito: "Évora"
    },
    {
        cidade: "Carrazeda de Anciães",
        distrito: "Bragança"
    },
    {
        cidade: "Sabrosa",
        distrito: "Vila Real"
    },
    {
        cidade: "Tabuaço",
        distrito: "Viseu"
    },
    {
        cidade: "Povoação",
        distrito: "Açores"
    },
    {
        cidade: "Armamar",
        distrito: "Viseu"
    },
    {
        cidade: "Figueira de Castelo Rodrigo",
        distrito: "Guarda"
    },
    {
        cidade: "São Martinho",
        distrito: "Lisboa"
    },
    {
        cidade: "Figueiró dos Vinhos",
        distrito: "Leiria"
    },
    {
        cidade: "Madalena",
        distrito: "Açores"
    },
    {
        cidade: "Monchique",
        distrito: "Faro"
    },
    {
        cidade: "Penela",
        distrito: "Coimbra"
    },
    {
        cidade: "Murça",
        distrito: "Vila Real"
    },
    {
        cidade: "Vidigueira",
        distrito: "Beja"
    },
    {
        cidade: "Olival",
        distrito: "Porto"
    },
    {
        cidade: "Viana do Alentejo",
        distrito: "Évora"
    },
    {
        cidade: "Oleiros",
        distrito: "Castelo Branco"
    },
    {
        cidade: "Penamacor",
        distrito: "Castelo Branco"
    },
    {
        cidade: "Vila do Porto",
        distrito: "Açores"
    },
    {
        cidade: "Aguiar da Beira",
        distrito: "Guarda"
    },
    {
        cidade: "Golegã",
        distrito: "Santarém"
    },
    {
        cidade: "Riachos",
        distrito: "Santarém"
    },
    {
        cidade: "Velas",
        distrito: "Açores"
    },
    {
        cidade: "Ourique",
        distrito: "Beja"
    },
    {
        cidade: "Vila do Bispo",
        distrito: "Faro"
    },
    {
        cidade: "Vila Nova de Paiva",
        distrito: "Viseu"
    },
    {
        cidade: "Terrujem",
        distrito: "Lisboa"
    },
    {
        cidade: "Sousel",
        distrito: "Portalegre"
    },
    {
        cidade: "Fornos de Algodres",
        distrito: "Guarda"
    },
    {
        cidade: "Mora",
        distrito: "Évora"
    },
    {
        cidade: "Caranguejeira",
        distrito: "Leiria"
    },
    {
        cidade: "Nordeste",
        distrito: "Açores"
    },
    {
        cidade: "Cuba",
        distrito: "Beja"
    },
    {
        cidade: "Pampilhosa da Serra",
        distrito: "Coimbra"
    },
    {
        cidade: "Lajes",
        distrito: "Açores"
    },
    {
        cidade: "Vimioso",
        distrito: "Bragança"
    },
    {
        cidade: "Avis",
        distrito: "Portalegre"
    },
    {
        cidade: "Mesão Frio",
        distrito: "Vila Real"
    },
    {
        cidade: "Valpaços",
        distrito: "Vila Real"
    },
    {
        cidade: "Góis",
        distrito: "Coimbra"
    },
    {
        cidade: "Vila Nova de Milfontes",
        distrito: "Beja"
    },
    {
        cidade: "Constãncia",
        distrito: "Santarém"
    },
    {
        cidade: "Sardoal",
        distrito: "Santarém"
    },
    {
        cidade: "Arcozelo",
        distrito: "Viana do Castelo"
    },
    {
        cidade: "Lorvão",
        distrito: "Coimbra"
    },
    {
        cidade: "Pedrógão Grande",
        distrito: "Leiria"
    },
    {
        cidade: "Freixo de Espada À Cinta",
        distrito: "Bragança"
    },
    {
        cidade: "Calheta",
        distrito: "Açores"
    },
    {
        cidade: "Armação de Pêra",
        distrito: "Faro"
    },
    {
        cidade: "Vila Velha de Ródão",
        distrito: "Castelo Branco"
    },
    {
        cidade: "Marvão",
        distrito: "Portalegre"
    },
    {
        cidade: "Vila de Rei",
        distrito: "Castelo Branco"
    },
    {
        cidade: "Manteigas",
        distrito: "Guarda"
    },
    {
        cidade: "Riba de Ave",
        distrito: "Braga"
    },
    {
        cidade: "Fronteira",
        distrito: "Portalegre"
    },
    {
        cidade: "Castelo de Vide",
        distrito: "Portalegre"
    },
    {
        cidade: "São Roque do Pico",
        distrito: "Açores"
    },
    {
        cidade: "Monforte",
        distrito: "Portalegre"
    },
    {
        cidade: "Valado de Frades",
        distrito: "Leiria"
    },
    {
        cidade: "Castanheira de Pêra",
        distrito: "Leiria"
    },
    {
        cidade: "Arronches",
        distrito: "Portalegre"
    },
    {
        cidade: "São Vicente",
        distrito: "Madeira"
    },
    {
        cidade: "Trouxemil",
        distrito: "Coimbra"
    },
    {
        cidade: "Ferreiros",
        distrito: "Braga"
    },
    {
        cidade: "Carvoeiro",
        distrito: "Faro"
    },
    {
        cidade: "Porto Moniz",
        distrito: "Madeira"
    },
    {
        cidade: "Mourão",
        distrito: "Évora"
    },
    {
        cidade: "Barrancos",
        distrito: "Beja"
    },
    {
        cidade: "Caminha",
        distrito: "Viana do Castelo"
    },
    {
        cidade: "Boticas",
        distrito: "Vila Real"
    },
    {
        cidade: "Barcelos",
        distrito: "Braga"
    },
    {
        cidade: "Loures",
        distrito: "Lisboa"
    },
    {
        cidade: "Santo Tirso",
        distrito: "Porto"
    },
    {
        cidade: "Famalicão",
        distrito: "Braga"
    },
    {
        cidade: "Cartaxo",
        distrito: "Santarém"
    },
    {
        cidade: "Fundão",
        distrito: "Castelo Branco"
    },
    {
        cidade: "Oliveira de Azemeis",
        distrito: "Aveiro"
    },
    {
        cidade: "Ovar",
        distrito: "Aveiro"
    },
    {
        cidade: "Lagoa",
        distrito: "Faro"
    },
    {
        cidade: "Albufeira",
        distrito: "Faro"
    },
    {
        cidade: "Sintra",
        distrito: "Lisboa"
    },
    {
        cidade: "\u00c1gueda",
        distrito: "Aveiro"
    },
    {
        cidade: "Peniche",
        distrito: "Leiria"
    },
    {
        cidade: "Salvaterra de Magos",
        distrito: "Santarém"
    },
    {
        cidade: "Cascais",
        distrito: "Lisboa"
    },
    {
        cidade: "Ponte da Barca",
        distrito: "Viana do Castelo"
    },
    {
        cidade: "Almodôvar",
        distrito: "Beja"
    },
    {
        cidade: "Alcobaça",
        distrito: "Leiria"
    },
    {
        cidade: "Oliveira do Hospital",
        distrito: "Coimbra"
    },
    {
        cidade: "Abrantes",
        distrito: "Santarém"
    },
    {
        cidade: "Santiago do Cacém",
        distrito: "Setúbal"
    },
    {
        cidade: "Cantanhede",
        distrito: "Coimbra"
    },
    {
        cidade: "Grãndola",
        distrito: "Setúbal"
    },
    {
        cidade: "Mangualde",
        distrito: "Viseu"
    },
    {
        cidade: "Arouca",
        distrito: "Aveiro"
    },
    {
        cidade: "Feira",
        distrito: "Aveiro"
    },
    {
        cidade: "Seia",
        distrito: "Guarda"
    },
    {
        cidade: "Coruche",
        distrito: "Santarém"
    },
    {
        cidade: "Chamusca",
        distrito: "Santarém"
    },
    {
        cidade: "Crato",
        distrito: "Portalegre"
    },
    {
        cidade: "Belmonte",
        distrito: "Castelo Branco"
    },
    {
        cidade: "Vagos",
        distrito: "Aveiro"
    },
    {
        cidade: "Tondela",
        distrito: "Viseu"
    },
    {
        cidade: "Gavião",
        distrito: "Portalegre"
    },
    {
        cidade: "Santa Comba Dão",
        distrito: "Viseu"
    },
    {
        cidade: "Alandroal",
        distrito: "Évora"
    },
    {
        cidade: "Mogadouro",
        distrito: "Bragança"
    },
    {
        cidade: "Paredes de Coura",
        distrito: "Viana do Castelo"
    },
    {
        cidade: "Seixal",
        distrito: "Setúbal"
    },
    {
        cidade: "Amares",
        distrito: "Braga"
    },
    {
        cidade: "Alenquer",
        distrito: "Lisboa"
    },
    {
        cidade: "Mêda",
        distrito: "Guarda"
    },
    {
        cidade: "Vouzela",
        distrito: "Viseu"
    },
    {
        cidade: "Mação",
        distrito: "Santarém"
    },
    {
        cidade: "Alfãndega da Fé",
        distrito: "Bragança"
    },
    {
        cidade: "São Pedro do Sul",
        distrito: "Viseu"
    },
    {
        cidade: "Trofa",
        distrito: "Braga"
    },
    {
        cidade: "Alter do Chão",
        distrito: "Portalegre"
    },
    {
        cidade: "Mortágua",
        distrito: "Viseu"
    },
    {
        cidade: "Vila Nova de Cerveira",
        distrito: "Viana do Castelo"
    },
    {
        cidade: "Arcos de Valdevez",
        distrito: "Viana do Castelo"
    },
    {
        cidade: "Alcanena",
        distrito: "Santarém"
    },
    {
        cidade: "Mealhada",
        distrito: "Aveiro"
    },
    {
        cidade: "Valença",
        distrito: "Viana do Castelo"
    },
    {
        cidade: "Sernancelhe",
        distrito: "Viseu"
    },
    {
        cidade: "Vila Flor",
        distrito: "Bragança"
    },
    {
        cidade: "Castelo de Paiva",
        distrito: "Aveiro"
    },
    {
        cidade: "Penedono",
        distrito: "Viseu"
    },
    {
        cidade: "Alijó",
        distrito: "Vila Real"
    },
    {
        cidade: "Oliveira de Frades",
        distrito: "Viseu"
    },
    {
        cidade: "Vizela",
        distrito: "Braga"
    },
    {
        cidade: "Alvaiázere",
        distrito: "Leiria"
    },
    {
        cidade: "Montalegre",
        distrito: "Vila Real"
    },
    {
        cidade: "Alvito",
        distrito: "Beja"
    },
    {
        cidade: "Alcoutim",
        distrito: "Faro"
    },
    {
        cidade: "Almeida",
        distrito: "Guarda"
    },
    {
        cidade: "Aljezur",
        distrito: "Faro"
    },
    {
        cidade: "Lourinhã",
        distrito: "Lisboa"
    },
    {
        cidade: "Ferreira do Alentejo",
        distrito: "Beja"
    }
]

export default cidades;